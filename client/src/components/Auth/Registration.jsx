import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";


function Registration() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        jobRole: "",
        password: "",
        cpassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => {
            return (
                {
                    ...prev,
                    [name]: value,
                }
            )
        })
        console.log(user)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { fname, lname, email, jobRole, password, cpassword } = user;

        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                fname, lname, email, jobRole, password, cpassword
            })
        });

        const data = await res.json();
        console.log(data);
        if(res.status===422 || !data){
            window.alert("Invalid Registration")
        }else{
            window.alert("Registration succesfull");
            if (data.jobRole === "Farmer") {
                navigate("/farmerHome")
            }
            else if (data.jobRole === "Preserver") {
                navigate("/preserverHome");
            }
        }
    }

    return (
        <div className="registration">
            <div className="backdrop">
                <div className="register-box">
                    <div className="register-box-left">
                    </div>
                    <div className="register-box-form">
                        <div style={{ padding: "0 50px 0 50px" }}>
                            <div className="register-form-title">
                                Crop <span>Care</span>
                            </div>
                            <div className="register-form-heading">
                                Register Here
                            </div>
                            <div className="register-input-box">
                                <form>
                                    <div>
                                        <div className="register-form-name">First Name</div>
                                        <input className="register-form-input" type="text" required value={user.fname} onChange={handleChange} name="fname"></input>
                                    </div>
                                    <div>
                                        <div className="register-form-name">Last Name</div>
                                        <input className="register-form-input" type="text" required value={user.lname} onChange={handleChange} name="lname"></input>
                                    </div>
                                    <div>
                                        <div className="register-form-name">Email</div>
                                        <input className="register-form-input" type="email" required value={user.email} onChange={handleChange} name="email"></input>
                                    </div>
                                    <div>
                                        <div className="register-form-name">Password</div>
                                        <input className="register-form-input" type="password" required value={user.password} onChange={handleChange} name="password"></input>
                                    </div>
                                    <div>
                                        <div className="register-form-name">Confirm Password</div>
                                        <input className="register-form-input" type="password" onChange={handleChange} required value={user.cpassword} name="cpassword"></input>
                                    </div>
                                    <div style={{ fontFamily: "calibri" }}>
                                        <div className="register-form-name">You are a...</div>
                                        <input type="radio" name="jobRole" value={"Farmer"} onChange={handleChange} />Farmer
                                        <input type="radio" name="jobRole" value={"Preserver"} onChange={handleChange} />Preserver
                                    </div>
                                    <div className="register-submit-button">
                                        <button type="submit" onClick={handleSubmit}>Register</button>
                                    </div>
                                </form>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration;