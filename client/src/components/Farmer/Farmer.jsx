import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Farmer.css";
import user from "../../images/user.png"
import ListComponent from "./ListComponent";
import PurchaseListComponent from "./PurchaseListComponent";
const Farmer = () => {
    const [model, setModel] = useState({
        weight: 0,
        duration: 1,

    })
    const [preserver, setPreserver] = useState({
        preserverName: "",
        preserverID: "",
        price: 0,
        typeOfPlan: ""
    });
    const [list, setList] = useState([]);
    const [purchaseList, setPurchaseList] = useState([{}]);
    const navigate = useNavigate();


    function handleChange(e) {
        const { name, value } = e.target;
        setModel(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const farmerHome = async () => {
        try {
            const res = await fetch("http://localhost:5000/allPlans", {
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            //console.log(data);

            if (res.status !== 201) {
                const error = new Error(res.error);
                throw error;
            }

            setList(data.allPlans);
            console.log(list);

        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    }

    const myPurchases = async () => {
        try {
            const res = await fetch("http://localhost:5000/myPurchases", {
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if(res.status!==201){
                const error = new Error(res.error);
                throw error; 
            }
            console.log(res.status);
            console.log(data.myPurchases);
            setPurchaseList(data.myPurchase);
            console.log(purchaseList);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        farmerHome();
        myPurchases();
    }, [])

    // useEffect(()=>{
    //     async function fetchdata(){
    //         const res = await fetch("http://localhost:5000/allPlans");
    //         // console.log(res);
    //         const data = await res.json();
    //         console.log(data);
    //         setList(data.allPlans);
    //         console.log(list);


    //     }
    //     // async function fetchPurchases(){
    //     //     const res = await fetch("http://localhost:5000/myPurchases");
    //     //     const data = await res.json();
    //     //     console.log(data);
    //     // }
    //     // fetchPurchases();
    //     fetchdata();

    // },[list.length]);


    // useEffect(()=>{
    //     async function fetchdata(){
    //         const res = await fetch("http://localhost:5000/myPurchases");
    //         const data = await res.json();
    //         console.log(data);
    //     }
    //     fetchdata();
    // },[])

    async function handleSubmit(e) {
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



        const res = await fetch("http://localhost:5000/buyPlan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                preserverId: submitObject.preserverID, preserverName: submitObject.preserverName, price: submitObject.price, typeOfPlan: submitObject.typeOfPlan, duration: submitObject.duration, weight: submitObject.weight
            })
        });

        const data = await res.json();
        console.log(data);
        // if(res.status===422 || res.status===401 || !data){
        //     window.alert("Invalid Credentials")
        // }else{
        //     window.alert("Login succesfull");
        //     if (data.jobRole === "Farmer") {
        //         navigate("/farmerHome")
        //     }
        //     else if (data.jobRole === "Preserver") {
        //         navigate("/preserverHome");
        //     }
        // }

    }

    return (
        <div className="farmer">
            <div className="left-box">
                <div className="left-container">
                    <div className="name-box">
                        <div className="user-image">
                            <img src={user} alt=""></img>
                        </div>
                        <div className="user-info-box">
                            <div className="user-info">
                                <div style={{ fontSize: "22px", fontWeight: "900", fontFamily: "calibri" }}>Harshit Bamotra</div>
                                <div style={{ fontSize: "16px", fontWeight: "200", fontFamily: "calibri" }}>harshitbamotra.01@gmail.com</div>
                                <div>Farmer</div>
                            </div>
                        </div>
                    </div>
                    <div className="payment-model">
                        <div className="price"><span>Price: </span> {preserver.price ? preserver.price : ""} rs per kg</div>
                        <div className="weight-box">
                            <div>Weight: </div>
                            <input type="text" required name="weight" onChange={handleChange} value={model.weight}></input>
                        </div>
                        <div className="duration-box">
                            <div>Period: </div>
                            <input type="range" min="1" max={7} name="duration" onChange={handleChange} value={model.duration}></input>
                            <div>{model.duration ? model.duration : ""}</div>
                        </div>
                        <div className="total-cost">Total Cost: {preserver.price ? model.weight ? model.duration ? preserver.price * model.weight * model.duration : "" : "" : ""}</div>
                        <button className="payment-model-button" onClick={handleSubmit}>Submit Order</button>
                    </div>
                </div>
            </div>
            <div className="middle-box">
                <div className="middle-container">
                    <div className="preserver-list-heading">
                        List Of Preservers
                    </div>
                    {/* <ListComponent selectPreserver={setPreserver} name="harshit"></ListComponent>
                <ListComponent selectPreserver={setPreserver} name="Nirbhay"></ListComponent>
                <ListComponent selectPreserver={setPreserver} name="Raj"></ListComponent>
                <ListComponent selectPreserver={setPreserver} name="something"></ListComponent> */}
                    {list.map((item) => {
                        return <ListComponent preserverName={item.preserverName} price={item.price} typeOfPlan={item.typeOfPlan} selectPreserver={setPreserver} preserverID={item.preserverId}></ListComponent>
                    })}
                </div>
            </div>
            <div className="right-box">
                <div className="right-container">
                    {purchaseList.map((it, index) => {

                        // return <ListComponent preserverName={it.preserverName} price={it.pricePerKg} typeOfPlan={it.typeOfPlan}  weight={it.totalWeight} duration={it.duration} startDate={it.startDate} endDate={it.endDate} totalPrice={it.totalPrice} key={it.preserverId}></ListComponent>
                        return <PurchaseListComponent key={index} preserverName={it.preserverName} price={it.pricePerKG} typeOfPlan={it.typeOfPlan} weight={it.totalWeight} duration={it.duration} startDate={it.startDate} endDate={it.endDate} totalPrice={it.totalPrice}></PurchaseListComponent>;
                    })}
                </div>

            </div>
        </div>
    )
}

export default Farmer;