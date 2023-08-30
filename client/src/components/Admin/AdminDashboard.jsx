
export default function AdminDashboard() {
  return (
    <div className="w-screen h-screen pt-12">
        <div className="w-[50%] flex rounded mx-auto flex-col bg-white h-[80%]">
            <div className="w-[90%] flex justify-center items-center p-6 mx-auto">
                <h1 className="text-3xl text-black font-bold">Admin Dashboard</h1>
            </div>
            <div className="w-[90%] flex flex-col justify-center items-center p-6 mx-auto">
                <button className="btn btn-accent w-full my-2"><a href="/admin/masterdata">View Master Data</a></button>
                <button className="btn btn-accent w-full my-2"><a href="/admin/requests">View Client Requests</a></button>
                <button className="btn btn-accent w-full my-2"><a href="/login">Signout</a></button>
            </div> 
        </div>
    </div>
  )
}
