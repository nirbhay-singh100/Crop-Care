import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Preserver.css";
import user from "../../images/user.png"
// import ListComponent from "./ListComponent";
// import PurchaseListComponent from "./PurchaseListComponent";
const Preserver = () => {
    const [plans, setPlans] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();
    const [createPlan, setCreatePlan] = useState({
        typeOfPlan: "",
        price:""
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setCreatePlan(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const showMyPlans = async () => {
        try {
            const res = await fetch("http://localhost:5000/showMyPlans", {
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            
            
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

            //console.log(res.status);
            //console.log(data);
            setPlans(data.myPlans);
            console.log(plans);

        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    }

    const myOrders = async () => {
        try {
            const res = await fetch("http://localhost:5000/myOrders", {
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if(res.status!==200){
                const error = new Error(res.error);
                throw error; 
            }
            
            console.log(res.status);
            console.log(data.myOrders); 
            
            setOrderList(data.myOrders);
            console.log(orderList);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        showMyPlans();
        myOrders();
    }, [orderList.length, plans.length])

    
    async function handleSubmit(event){
        event.preventDefault();
        const typeOfPlan = createPlan.typeOfPlan;
        const price = createPlan.price;

        const res = await fetch("http://localhost:5000/createPlan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                typeOfPlan, price
            })
        });

        const data = await res.json();
        console.log(data);
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
                                <div>Preserver</div>
                            </div>
                        </div>
                    </div>
                    <div className="payment-model">
                        {/* <div className="price"><span>Price: </span> {preserver.price ? preserver.price : ""} rs per kg</div>
                        <div className="weight-box">
                            <div>Weight: </div>
                            <input type="text" required name="weight" onChange={handleChange} value={model.weight}></input>
                        </div>
                        <div className="duration-box">
                            <div>Period: </div>
                            <input type="range" min="1" max={7} name="duration" onChange={handleChange} value={model.duration}></input>
                            <div>{model.duration ? model.duration : ""}</div>
                        </div>
                        <div className="total-cost">Total Cost: {preserver.price ? model.weight ? model.duration ? preserver.price * model.weight * model.duration : "" : "" : ""}</div> */}
                        <div>
                            <div className="preserver-type-of-plan">Type of Plan</div>
                            <input type="radio" name="typeOfPlan" value={"Monthly"} onChange={handleChange} />Monthly
                            <input type="radio" name="typeOfPlan" value={"Weekly"} onChange={handleChange} />Weekly
                        </div>
                        <div>
                            <div>Price per kg: </div>
                            <input type="text" name="price" value={createPlan.price} onChange={handleChange} required></input>
                        </div>
                        <button className="payment-model-button" onClick={handleSubmit}>Submit Plan</button>
                    </div>
                </div>
            </div>
            <div className="middle-box">
                <div className="middle-container">
                    <div className="preserver-list-heading">
                        My Orders
                    </div>
                    {/* <ListComponent selectPreserver={setPreserver} name="harshit"></ListComponent>
                <ListComponent selectPreserver={setPreserver} name="Nirbhay"></ListComponent>
                <ListComponent selectPreserver={setPreserver} name="Raj"></ListComponent>
                <ListComponent selectPreserver={setPreserver} name="something"></ListComponent> */}
                    {/* {list.map((item) => {
                        return <ListComponent preserverName={item.preserverName} price={item.price} typeOfPlan={item.typeOfPlan} selectPreserver={setPreserver} preserverID={item.preserverId}></ListComponent>
                    })} */}

                </div>
            </div>
            <div className="right-box">
                <div className="right-container">
                    {/* {purchaseList.map((it, index) => {

                        // return <ListComponent preserverName={it.preserverName} price={it.pricePerKg} typeOfPlan={it.typeOfPlan}  weight={it.totalWeight} duration={it.duration} startDate={it.startDate} endDate={it.endDate} totalPrice={it.totalPrice} key={it.preserverId}></ListComponent>
                        return <PurchaseListComponent key={index} preserverName={it.preserverName} price={it.pricePerKG} typeOfPlan={it.typeOfPlan} weight={it.totalWeight} duration={it.duration} startDate={it.startDate} endDate={it.endDate} totalPrice={it.totalPrice}></PurchaseListComponent>;
                    })} */}
                    
                </div>

            </div>
        </div>
    )
}

export default Preserver;