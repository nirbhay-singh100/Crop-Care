import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Farmer.css";
import user from "../../images/user.png"
import ListComponent from "./ListComponent";
const Farmer = () => {
    const [model,setModel] = useState({
        weight:0,
        duration:1,

    })
    const [preserver, setPreserver] = useState({
        preserverName:"",
        preserverID:"",
        price:0,
        typeOfPlan:""
    });
    const [list, setList] = useState([]);
    const navigate = useNavigate();


    function handleChange(e){
        const {name, value} = e.target;
        setModel(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    // const farmerHome = async () => {
    //     try{
    //         const res = await fetch("http://localhost:5000/allPlans", {
    //             method: "GET",
    //             header: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             credentials: "include"
    //         });

    //         const data = await res.json();
    //         //console.log(data);

    //         if(res.status!==201){
    //             const error = new Error(res.error);
    //             throw error; 
    //         }

    //         setList(data.allPlans);
    //         console.log(list);

    //     } catch (error){
    //         console.log(error);
    //         navigate("/login");
    //     }
    // }

    // useEffect(()=> {
    //     farmerHome();
    // }, [])

    useEffect(()=>{
        async function fetchdata(){
            const res = await fetch("http://localhost:5000/allPlans");
            // console.log(res);
            const data = await res.json();
            console.log(data);
            setList(data.allPlans);
            console.log(list);
        }
        async function fetchPurchases(){
            const res = await fetch("http://localhost:5000/myPurchases");
            const data = await res.json();
            console.log(data);
        }
        fetchPurchases();
        fetchdata();

    },[list.length]);
    

    // useEffect(()=>{
    //     async function fetchdata(){
    //         const res = await fetch("http://localhost:5000/myPurchases");
    //         const data = await res.json();
    //         console.log(data);
    //     }
    //     fetchdata();
    // },[])

    async function handleSubmit(e){
        e.preventDefault();
        const submitObject = {
            preserverName: preserver.preserverName,
            preserverID: preserver.preserverID,
            price: preserver.price,
            typeOfPlan: preserver.typeOfPlan,
            duration: model.duration,
            weight: model.weight
        }
        console.log(submitObject);


    }

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
                    <div className="price"><span>Price: </span> {preserver.price?preserver.price:""} per kg</div>
                    <div className="weight-box">
                        <div>weight: </div>
                        <input type="text" required name="weight" onChange={handleChange} value={model.weight}></input>
                    </div>
                    <div className="duration-box">
                        <div>Period: </div>
                        <input type="range" min="1" max={7} name="duration" onChange={handleChange} value={model.duration}></input>
                        <div>{model.duration?model.duration:""}</div>
                    </div>
                    <div className="total-cost">total cost: {preserver.price?model.weight?model.duration?preserver.price*model.weight*model.duration:"":"":""}</div>
                    <button className="payment-model-button" onClick={handleSubmit}>submit order</button>
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
                {list.map((item)=>{
                    return <ListComponent preserverName={item.preserverName} price={item.price} typeOfPlan={item.typeOfPlan} selectPreserver={setPreserver} preserverID={item._id}></ListComponent>
                })}
            </div>
            <div className="right-box">
                {preserver.name?preserver.name:""}
                {preserver.email?preserver.email:""}
            </div>
        </div>
    )
}

export default Farmer;