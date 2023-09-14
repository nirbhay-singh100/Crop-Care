import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import FarmerHome from "./components/FarmerHome";
import PreserverHome from "./components/PreserverHome";
import Registration from "./Auth/Registration";
import Farmer from "./components/Farmer/Farmer";



const App = () => {
    return (
        <>
        {/* <Registration></Registration> */}
        <Farmer></Farmer>
        {/* <Routes>

                <Route path="/home" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/farmerHome" element={<FarmerHome />} />
                <Route path="/preserverHome" element={<PreserverHome />} />

            </Routes> */}

        </>
    )
}

export default App;