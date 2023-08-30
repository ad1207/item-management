import { useState, useEffect } from "react"
import Loader from "../Loader"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function MyRequests() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    async function getData() {
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            if(!user){
                navigate("/login")
                return
            }
            const res = await axios.get("http://localhost:5000/user/requests/"+user._id)
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
        getData()
    }, [])

    if(loading){
        return <Loader />
    }

  return (
    <div className="w-screen h-screen pt-12">
        <div className="w-[90%] flex rounded mx-auto flex-col bg-white h-[90%]">
            <div className="w-[90%] flex justify-center items-center p-6">
                <h1 className="text-3xl text-black font-bold">My Requests</h1>
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
                            <th>Status</th>
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
                                    {item.status === "pending" && (
                                        <span className="text-yellow-500 font-bold">Pending</span>
                                    )}
                                    {item.status === "approved" && (
                                        <span className="text-green-500 font-bold">Approved</span>
                                    )}
                                    {item.status === "rejected" && (
                                        <span className="text-red-500 font-bold">Rejected</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full flex justify-center m-4">
                <button className="btn btn-primary"><a href="/user/requests/add">Add new request</a></button>
            </div>
        </div>
    </div>
  )
}
