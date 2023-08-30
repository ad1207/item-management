import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AddRequest() {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("none")
    const [mrp, setMrp] = useState("")
    const [gst, setGst] = useState("none")
    const [isLoading, setIsLoading] = useState(false)
    const [fileData, setFileData] = useState(null)
    const navigate = useNavigate()
    const uploadFile = async (e) => {
        let formdata = new FormData()
        console.log(e.target.files[0])
        formdata.append("file", e.target.files[0])
        formdata.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
        formdata.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY)
        setFileData(formdata)
    }

    const handleReset = () => {
        setName("")
        setCategory("none")
        setMrp("")
        setGst("none")
        setFileData(null)
    }

    const handleSubmit = async () => {
        if(name === "" || category === "none" || mrp === "" || gst === "none" || fileData === null){
            alert("Please fill all the fields")
            return
        }
        if(isNaN(mrp)){
            alert("MRP should be a number")
            return
        }
        const user = JSON.parse(localStorage.getItem("user"))
        if(!user){
            alert("Please login first")
            navigate("/login")
            return
        }
        setIsLoading(true)
        try {
            const cloudinary = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, fileData)
            console.log(cloudinary.data)
            const res = await axios.post("http://localhost:5000/user/request", {
                name,
                category,
                mrp,
                gst,
                image: cloudinary.data.secure_url,
                requestedBy: user._id
            })
            console.log(res.data)
            if(res.statusText === "OK") {
                alert("Request added successfully")
                handleReset()
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    
  return (
    <div className="w-screen h-screen pt-12">
        <div className="w-[50%] flex rounded mx-auto flex-col bg-white h-[80%]">
            <div className="w-[90%] flex justify-center items-center p-6 mx-auto">
                <h1 className="text-3xl text-black font-bold">Add new Request</h1>
            </div>
            <div className="w-[90%] flex justify-center flex-col items-center p-6 mx-auto border rounded-xl border-accent">
                <div className="w-full flex justify-center items-center p-1">
                    <input value={name} onChange={(e)=>setName(e.target.value)} className="input w-[90%] input-primary input-bordered bg-white text-black" placeholder="Name"></input>
                </div>
                <div className="w-full flex justify-center items-center p-1">
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} className="select w-[90%] select-primary select-bordered bg-white text-black" placeholder="Category">
                        <option value="none" selected disabled hidden>Select Category</option>
                        <option value="meat">Meat</option>
                        <option value='vegetable'>Vegetables</option>
                        <option value='fruit'>Fruits</option>
                        <option value='grain'>Grains</option>
                        <option value='dairy'>Dairy</option>
                        <option value='other'>Others</option>
                    </select>

                </div>
                <div className="w-full flex justify-center items-center p-1">
                    <input value={mrp} onChange={(e)=>setMrp(e.target.value)} className="input w-[90%] input-primary input-bordered bg-white text-black" placeholder="MRP"></input>
                </div>
                <div className="w-full flex justify-center items-center p-1">
                    <select value={gst} onChange={(e)=>setGst(e.target.value)} className="select w-[90%] select-primary select-bordered bg-white text-black" placeholder="GST">
                        <option value="none" selected disabled hidden>Select GST</option>
                        <option value="0%">0%</option>
                        <option value="5%">5%</option>
                        <option value='12%'>12%</option>
                        <option value='18%'>18%</option>
                        <option value='28%'>28%</option>
                    </select>
                </div>
                <div className="w-full flex justify-center items-center p-1">
                    <input onChange={(e)=>uploadFile(e)} className="file-input w-[90%] file-input-primary file-input-bordered bg-white text-black" type="file" accept="image/*" placeholder="Image"></input>
                </div>
                <div className="w-full flex justify-center items-center p-1 pt-2">
                    <button onClick={handleSubmit} className="btn btn-primary w-[43%]">Submit</button>
                    <button onClick={handleReset} className="btn btn-warning w-[43%] ml-4">Reset</button>
                </div>
            </div>
        </div>
    </div>
  )
}
