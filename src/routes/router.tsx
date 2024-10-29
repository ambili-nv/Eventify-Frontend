import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes here
import {PrivateRoute} from './privateRoute'; // Adjust the path as needed


const Login = lazy(()=>import('../pages/User/login'))
const Register = lazy(()=>import('../pages/User/register'))
const Home = lazy(()=>import('../pages/User/home'))
const AdminLogin = lazy(()=>import('../pages/Admin/adminLogin'))
const CreateService = lazy(()=>import('../pages/Admin/AddService'))
const ListServices = lazy(()=>import('../pages/Admin/servicePage'))
const EditServices = lazy(()=>import('../pages/Admin/EditServicePage'))
const AddSlot = lazy(()=>import('../pages/Admin/AddSlot'))
const ServiceDetails = lazy(()=>import('../pages/User/serviceDetails'))
const PaymentSuccess = lazy(()=>import('../pages/User/paymentSuccess'))
const UserBookings = lazy(()=>import('../pages/User/bookings'))
const AdminBookings = lazy(()=>import('../pages/Admin/bookings'))

export const MainRouter = ()=>{
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/register" element = {<Register/>}/>
                <Route path="/login" element = {<Login/>}/>
                <Route path="/admin/login" element = {<AdminLogin/>}/>
                <Route path="/create-service" element = {<CreateService/>}/>
                <Route path="/services" element = {<ListServices/>}/>
                <Route path="/services/:serviceId/edit" element = {<EditServices/>}/>
                <Route path="/services/:serviceId/add-slot" element={<AddSlot/>} />
                <Route path="/service-detials/:serviceId" element={<ServiceDetails/>} />
                <Route path="/success/:bookingId" element={<PaymentSuccess/>} />
                <Route path="/bookings" element={<UserBookings/>} />
                <Route path="/booking-history" element={<AdminBookings/>} />

                {/* <Route path="/" element={<Home />}/> */}
                <Route path="/" element={<PrivateRoute element={<Home />} />}/>
            </Routes>
        </Suspense>
    )
}