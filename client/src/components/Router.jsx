import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import LandingPage from "./LandingPage";
import UserMasterData from "./User/MasterData";
import MyItems from "./User/MyItems";
import MyRequests from "./User/MyRequests";
import AddRequest from "./User/AddRequest";
import AdminMasterData from "./Admin/MasterData";
import Requests from "./Admin/Requests";
import ClientRequests from "./Admin/ClientRequests";
import Dashboard from "./Dashboard";

export default function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user/masterdata" element={<UserMasterData />} />
            <Route path="/user/myitems" element={<MyItems />} />
            <Route path="/user/requests" element={<MyRequests />} />
            <Route path="/user/requests/add" element={<AddRequest />} />
            <Route path="/admin/masterdata" element={<AdminMasterData />} />
            <Route path="/admin/requests" element={<Requests />} />
            <Route path="/admin/requests/:clientId" element={<ClientRequests />} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        </BrowserRouter>
    );
}

