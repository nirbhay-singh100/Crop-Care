import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();


  const [user, setUser] = useState({
    email: "",
    password: "",
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

  const errors = {
    email: "Invalid email",
    pass: "Invalid password"
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const {  email, password } = user;

        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        console.log(data);
        if(res.status===422 || res.status===401 || !data){
            window.alert("Invalid Credentials")
        }else{
            window.alert("Login succesfull");
            if (data.jobRole === "Farmer") {
                navigate("/farmerHome")
            }
            else if (data.jobRole === "Preserver") {
                navigate("/preserverHome");
            }
        }
    
  };

  const renderErrorMessage = (name) =>
    errorMessages[name] && <div className="error">{errorMessages[name]}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required onChange={handleChange} value={user.email}/>
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required onChange={handleChange} value={user.password}/>
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Welcome Back</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;