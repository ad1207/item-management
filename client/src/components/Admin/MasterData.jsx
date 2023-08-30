import { useState, useEffect } from "react"
import Loader from "../Loader"
import axios from "axios"



export default function AdminMasterData() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get("http://localhost:5000/admin/masterdata")

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
        getData()
    }, [])
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
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.mrp}</td>
                                    <td>{item.gst}</td>
                                    <td><a href={item.image} target="_blank" rel="noreferrer"><img src={item.image} alt="item" className="w-16 h-16"/></a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )
}
