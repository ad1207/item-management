import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Loader from "../Loader"


export default function ClientRequests() {
    const { clientId } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

    async function getData() {
        try {
            const res = await axios.get(`http://localhost:5000/admin/requests/${clientId}`)
            if(res.status === 200) {
                setData(res.data[0])
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
    }, [clientId, refresh])

    if(loading){
        return <Loader />
    }

    const approveRequest = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/admin/approve`,{
                id
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

    const rejectRequest = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/admin/reject`,{
                id
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


  return (
    <div className="w-screen h-screen pt-12">
        <div className="w-[90%] flex rounded mx-auto flex-col bg-white h-[90%]">
            <div className="w-[90%] flex justify-center items-center p-6">
                <h1 className="text-3xl text-black font-bold">{data.user}&apos;s Requests</h1>
            </div>
            <div className="table-container overflow-y-scroll no-scrollbar px-16">
                <table className="table text-black ">
                    <thead>
                        <tr className="text-black font-bold text-xl">
                            <th>Name</th>
                            <th>Category</th>
                            <th>MRP</th>
                            <th>GST</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.pendingRequests.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.mrp}</td>
                                <td>{item.gst}</td>
                                <td><img src={item.image} alt={item.name} className="w-20 h-20 object-contain" /></td>
                                <td className="flex flex-col">
                                    <button className="btn btn-primary btn-sm" onClick={() => window[`${item._id}approve`].showModal()}>Approve</button>
                                    <dialog id={`${item._id}approve`} className="modal text-white">
                                    <form method="dialog" className="modal-box">
                                        <p className="pb-8">Are you sure you want to approve this request. Approving will add this product to masterdata.</p>
                                        <div className="flex justify-end">
                                        <button onClick={()=>approveRequest(item._id)} className="btn btn-primary mr-3">Approve</button>
                                        <button className="btn btn-accent">Close</button>
                                        </div>
                                    </form>
                                    </dialog>
                                    <button className="btn btn-warning btn-sm mt-2" onClick={() => window[`${item._id}reject`].showModal()}>Reject</button>
                                    <dialog id={`${item._id}reject`} className="modal text-white">
                                    <form method="dialog" className="modal-box">
                                        <p className="pb-8">Are you sure you want to reject this request. This action cannot be undone.</p>
                                        <div className="flex justify-end">
                                        <button onClick={()=>rejectRequest(item._id)} className="btn btn-warning mr-3">Reject</button>
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
            
        </div>
    </div>
  )
}
