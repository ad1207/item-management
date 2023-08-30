import {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../Loader'


export default function Requests() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:5000/admin/requests')
            if(res.status === 200) {
                setData(res.data)
                setLoading(false)
            }
            else{
                console.log(res)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if(loading) {
        return <Loader />
    }

  return (
    <div className="w-screen h-screen pt-12">
        <div className="w-[60%] flex rounded mx-auto flex-col bg-white h-[90%]">
            <div className="w-[90%] flex justify-center items-center p-6">
                <h1 className="text-3xl text-black font-bold">Requests</h1>
            </div>
            <div className="table-container overflow-y-scroll no-scrollbar px-16">
                <table className="table text-black ">
                    <thead>
                        <tr className="text-black font-bold text-xl">
                            <th>Client Name</th>
                            <th>Items Pending</th>
                            <th>Approved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.user}</td>
                                <td><button className="btn btn-sm btn-warning"><a href={`/admin/requests/${item._id}`}>View List</a></button></td>
                                <td>{
                                    item.approvedRequests.length > 0 ?
                                    <>
                                    <ol>
                                    {
                                        item.approvedRequests.map((product) => (
                                            <li key={product._id}>{product.name}</li>
                                        ))
                                    }
                                    </ol>
                                    </>
                                    :
                                    <span>No Items</span>
                                    }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
  )
}
