import React, { useState } from "react";
import {Link, Navlink, useNavigate} from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        jobRole: "",
        password: "",
        cpassword: ""
    });

    const handleChange = (event) =>{
        const { name, value} = event.target;

        setUser(prevValue => {
            return (
                {...prevValue,
                [name]: value}
            )

        })
    }

    const handleSubmit = async (event) =>{
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
        <form method="POST" onSubmit={handleSubmit}>
            <input type="text" name="fname" id="" placeholder="First Name" value={user.fname} onChange={handleChange}/><br></br>
            <input type="text" name="lname" id="" placeholder="Last Name" value={user.lname} onChange={handleChange}/><br></br>
            <input type="email" name="email" id="" placeholder="Email" value={user.email} onChange={handleChange} /><br></br>
            <input type="text" name="jobRole" placeholder="job" value={user.jobRole } onChange={handleChange}/>
            <br></br>
            <input type="password" name="password" id="" placeholder="Password" value={user.password} onChange={handleChange}/><br></br>
            <input type="password" name="cpassword" id="" placeholder="Confirm Password" value={user.cpassword} onChange={handleChange} /><br></br>
            <button tupe="submit">Register</button>
            <p>Already registerd ?</p>
            <Link to="/login">Login</Link>
        </form>
    )
}

export default Register;