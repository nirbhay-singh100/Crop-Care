import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

const FarmerHome = () => {

    const navigate = useNavigate();

    const farmerHome = async () => {
        try{
            const res = await fetch("http://localhost:5000/farmerHome", {
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            if(res.status!==200){
                const error = new Error(res.error);
                throw error; 
            }


        } catch (error){
            console.log(error);
            navigate("/login");
        }
    }

    useEffect(()=> {
        farmerHome();
    }, [])
    
    return <h1>Welcome farmer home</h1>
}

export default FarmerHome;