import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const userLogin = async () => {
        setIsLoading(true)
        try {
            if (email === "" || password === "") {
                alert("Please fill all the fields")
                setIsLoading(false)
                return
            }
            const res = await axios.post("http://localhost:5000/user/login", {
                email,
                password,
            })
            console.log(res.data)
            if(res.statusText === "OK") {
                localStorage.setItem("user", JSON.stringify(res.data))
            }
            navigate("/dashboard")

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
  return (
    <div className="h-screen">
      <div className="bg-white rounded-lg w-[500px] h-[500px] mx-auto mt-28 flex flex-col justify-center items-center">
        <div className="w-full flex justify-center m-4">
          <h1 className="text-3xl text-black font-bold">Login</h1>
        </div>
        <div className="w-full flex justify-center m-4">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="input w-[90%] input-primary input-bordered bg-white text-black" type="email" placeholder="Email"></input>
        </div>
        <div className="w-full flex justify-center m-4">
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className="input w-[90%] input-primary input-bordered bg-white text-black" type="password" placeholder="Password"></input>
        </div>
        <div className="w-full flex justify-center m-4">
          <button className="btn btn-primary w-[90%]" disabled={isLoading} onClick={()=>userLogin()}>Login</button>
        </div>
        <div className="w-full flex justify-center">
          <button className="btn btn-warning w-[90%]" disabled={isLoading}><a href="/signup">Dont have an account</a></button>
        </div>
      </div>
    </div>
  )
}
