import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Farmer.css";
import user from "../../images/user.png"
import ListComponent from "./ListComponent";
const Farmer = () => {
    const [model,setModel] = useState({
        price:"30",
        weight:"2",
        duration:"4",

    })
    const [preserver, setPreserver] = useState({});
    const [list, setList] = useState([{
        preserverName:"",
        typeOfPlan:"",
        price:""
    }]);
    const navigate = useNavigate();

    const farmerHome = async () => {
        try{
            const res = await fetch("http://localhost:5000/allPlans", {
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            if(res.status!==201){
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

    // useEffect(()=>{
    //     async function fetchdata(){
    //         const res = await fetch("http://localhost:5000/allPlans");
    //         console.log(res);
    //         const data = await res.json();
    //         console.log(data);
    //         setList(data);
    //     }
    //     fetchdata();
    // },[]);
    



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
                <div className="payment-model">
                    <div className="price"><span>Price: </span> 30$ per kg</div>
                    <div className="weight-box">
                        <div>weight: </div>
                        <input type="text" required name="weigth" ></input>
                    </div>
                    <div className="duration-box">
                        <div>Period: </div>
                        <input type="range" min="1" max={7} name="period"></input>
                    </div>
                    <div className="total-cost">total cost: {model.price?model.weight?model.duration?model.price*model.weight*model.duration:"":"":""}</div>
                    <button>submit order</button>
                </div>
            </div>
            <div className="middle-box">
                <div className="preserver-list-heading">
                    List Of Preservers
                </div>
                {/* <ListComponent selectPreserver={setPreserver} name="harshit"></ListComponent>
                <ListComponent selectPreserver={setPreserver} name="Nirbhay"></ListComponent>
                <ListComponent selectPreserver={setPreserver} name="Raj"></ListComponent>
                <ListComponent selectPreserver={setPreserver} name="something"></ListComponent> */}
                
            </div>
            <div className="right-box">
                {preserver.name?preserver.name:""}
                {preserver.email?preserver.email:""}
            </div>
        </div>
    )
}

export default Farmer;