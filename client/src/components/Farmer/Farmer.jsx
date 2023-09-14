import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Farmer.css";
import user from "../../images/user.png"
import ListComponent from "./ListComponent";
const Farmer = () => {

    // const navigate = useNavigate();

    // const farmerHome = async () => {
    //     try{
    //         const res = await fetch("http://localhost:5000/farmerHome", {
    //             method: "GET",
    //             header: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             credentials: "include"
    //         });

    //         const data = await res.json();
    //         console.log(data);

    //         if(res.status!==200){
    //             const error = new Error(res.error);
    //             throw error; 
    //         }


    //     } catch (error){
    //         console.log(error);
    //         navigate("/login");
    //     }
    // }

    // useEffect(()=> {
    //     farmerHome();
    // }, [])
    
    return(
        <div className="farmer">
            <div className="left-box">
                <div className="name-box">
                    <div className="user-image">
                        <img src={user} alt=""></img>
                    </div>
                    <div className="user-info-box">
                        <div className="user-info">
                            <div style={{fontSize:"22px", fontWeight:"900", fontFamily:"calibri"} }>Harshit Bamotra</div>
                            <div style={{fontSize:"16px", fontWeight:"200", fontFamily:"calibri"} }>harshitbamotra.01@gmail.com</div>
                            <div>Farmer</div>
                        </div>
                    </div>
                </div>
                <div className="something">

                </div>
            </div>
            <div className="middle-box">
                <div className="preserver-list-heading">
                    List Of Preservers
                </div>
                <ListComponent></ListComponent>
                <ListComponent></ListComponent>
                <ListComponent></ListComponent>
                <ListComponent></ListComponent>
            </div>
            <div className="right-box">

            </div>
        </div>
    )
}

export default Farmer;