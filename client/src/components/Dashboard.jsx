import AdminDashboard from "./Admin/AdminDashboard"
import { useNavigate } from "react-router-dom"
import UserDashboard from "./User/UserDashboard"

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    if (user?.type === 'admin') {
        return <AdminDashboard />
    } else if (user?.type === 'user') {
        return <UserDashboard />
    }
    else{
        return (
        <button className="btn btn-primary"><a href="/login">Youre not signed it. Please Login</a></button>
        )
    }
}
