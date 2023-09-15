import React from "react";
import { Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Auth/Registration";
// import FarmerHome from "./components/FarmerHome";
// import PreserverHome from "./components/PreserverHome";
import Registration from "./components/Auth/Registration";
import Farmer from "./components/Farmer/Farmer";
import Login from "./components/Auth/Login"
<<<<<<< HEAD
import Preserver from "./components/Preserver/Preserver";
=======
import Split from "./components/Split";

>>>>>>> 500b4c10ab8d7d33e9dc1b0a5e994ebaa7d999b5

const App = () => {
    return (
        <>
        {/* <Registration></Registration> */}
        {/* <Farmer></Farmer> */}
        {/* <Login></Login> */}
        <Routes>
                <Route path="/" element={<Farmer></Farmer>}></Route>
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Registration/>} />

                <Route path="/farmerHome" element={<Farmer></Farmer>} />
                {/* <Route path="/preserverHome" element={<Preserver></Preserver>} /> */}
                <Route path="/preserverHome" element={<Preserver></Preserver>} />
            </Routes>

        </>
    )
}

export default App;