import { useState, useEffect } from "react"
import Loader from "../Loader"
import axios from "axios"
import { useNavigate } from "react-router-dom"



export default function UserMasterData() {
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
            const res = await axios.get("http://localhost:5000/user/masterdata/"+user._id)
            if(res.status === 200) {
                setData(res.data)
                setLoading(false)
            }
            else{
                console.log(res)
                setLoading(false)
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
        getData()
    }, [refresh])

    const addItem = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            if(!user){
                navigate("/login")
                return
            }
            const res = await axios.post("http://localhost:5000/user/items/add",{
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
                <h1 className="text-3xl text-black font-bold">Master Data</h1>
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
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.mrp}</td>
                                <td>{item.gst}</td>
                                <td><a href={item.image} target="_blank" rel="noreferrer"><img src={item.image} alt="item" className="w-10 h-10"/></a></td>
                                <td>
                                    {item.added ? <span className="text-warning font-bold">Added</span> :<>
                                    <button className="btn btn-sm btn-primary" onClick={()=>window[item._id].showModal()}>Add</button>
                                    <dialog id={item._id} className="modal text-white">
                                        <form method="dialog" className="modal-box">
                                            <p className="pb-8">Do you want to add this item to your list</p>
                                            <div className="flex justify-end">
                                            <button onClick={()=>addItem(item._id)} className="btn btn-primary mr-3">Add</button>
                                            <button className="btn btn-accent">Close</button>
                                            </div>
                                        </form>
                                    </dialog>
                                    </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
