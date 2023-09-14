import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";


const PreserverHome = () => {

    const navigate = useNavigate();

    const preserverHome = async () => {
        try{
            const res = await fetch("http://localhost:5000/preserverHome", {
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
        preserverHome();
    }, [])
    return <h1>Welcome preserver home</h1>
}

export default PreserverHome;