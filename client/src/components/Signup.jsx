import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const userSignup = async () => {
    setIsLoading(true)
    try {
      if(name === '' || email === '' || password === '') {
        alert('Please fill all the fields')
        setIsLoading(false)
        return
      }
      const res = await axios.post('http://localhost:5000/user/register', {
        name,
        email,
        password
      })
      console.log(res.data)
      alert('User registered successfully')
      navigate('/login')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const adminSignup = async () => {
    setIsLoading(true)
    try {
      if(name === '' || email === '' || password === '') {
        alert('Please fill all the fields')
        setIsLoading(false)
        return
      }
      const res = await axios.post('http://localhost:5000/admin/register', {
        name,
        email,
        password
      })
      console.log(res.data)
      alert('Admin registered successfully')
      navigate('/login')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }



  return (
    <div className="h-screen">
      <div className="bg-white rounded-lg w-[500px] h-[500px] mx-auto mt-28 flex flex-col justify-center items-center">
        <div className="w-full flex justify-center m-4">
          <h1 className="text-3xl text-black font-bold">Signup</h1>
        </div>
        <div className="w-full flex justify-center m-4">
          <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="input w-[90%] input-primary input-bordered bg-white text-black" ></input>
        </div>
        <div className="w-full flex justify-center m-4">
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="input w-[90%] input-primary input-bordered bg-white text-black"></input>
        </div>
        <div className="w-full flex justify-center m-4">
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input w-[90%] input-primary input-bordered bg-white text-black"></input>
        </div>
        <div className="w-full flex justify-center m-4">
          <button className="btn btn-primary w-[43%]" disabled={isLoading} onClick={()=>userSignup()}>Signup as User</button>
          <button className="btn btn-primary w-[43%] ml-4"  disabled={isLoading} onClick={()=>adminSignup()}>Signup as Admin</button>
        </div>
        <div className="w-full flex justify-center">
          <button className="btn btn-warning w-[90%]"  disabled={isLoading}><a href="/login">Already have an account</a></button>
        </div>
      </div>
    </div>
  )
}
