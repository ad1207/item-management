import { useState, useEffect } from "react"
import Loader from "../Loader"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function MyItems() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()

    async function getData() {
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            if(!user){
                navigate("/login")
                return
            }
            else{
                const res = await axios.get("http://localhost:5000/user/items/"+user._id)
                if(res.status === 200) {
                    setData(res.data)
                    setLoading(false)
                }
                else{
                    console.log(res)
                    setLoading(false)
                }
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(refresh){
            getData()
            setRefresh(false)
        }
        getData();
    }, [refresh])

    const removeItem = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            if(!user){
                navigate("/login")
                return
            }
            const res = await axios.post("http://localhost:5000/user/items/delete",{
                userId: user._id,
                masterDataId: id
            })
            if(res.status === 200) {
                console.log(res)
                setRefresh(true)
            }
            else{
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }



    if(loading){
        return <Loader />
    }

  return (
    <div className="w-screen h-screen pt-12">
        <div className="w-[90%] flex rounded mx-auto flex-col bg-white h-[90%]">
            <div className="w-[90%] flex justify-center items-center p-6">
                <h1 className="text-3xl text-black font-bold">My Items</h1>
            </div>
            <div className="table-container overflow-y-scroll no-scrollbar px-16">
                <table className="table text-black ">
                    <thead>
                        <tr className="text-black font-bold text-xl">
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>MRP</th>
                            <th>GST</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.masterDataId.name}</td>
                                <td>{item.masterDataId.category}</td>
                                <td>{item.masterDataId.mrp}</td>
                                <td>{item.masterDataId.gst}</td>
                                <td><a href={item.masterDataId.image} target="_blank" rel="noreferrer"><img src={item.masterDataId.image} alt="item" className="w-10 h-10"/></a></td>
                                <td>
                                    <button className="btn btn-sm btn-error" onClick={()=>window[item._id].showModal()}>Remove</button>
                                    <dialog id={item._id} className="modal text-white">
                                        <form method="dialog" className="modal-box">
                                            <p className="pb-8">Are you sure you want to remove this item from your list</p>
                                            <div className="flex justify-end">
                                            <button onClick={()=>removeItem(item.masterDataId._id)} className="btn btn-error mr-3">Remove</button>
                                            <button className="btn btn-accent">Close</button>
                                            </div>
                                        </form>
                                    </dialog>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full flex justify-center m-4">
                <button className="btn btn-primary"><a href="/user/masterdata">Add more items</a></button>
            </div>
        </div>
    </div>
  )
}
