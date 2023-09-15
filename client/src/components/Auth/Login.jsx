// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";

// function Login() {
//   const [errorMessages, setErrorMessages] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const navigate = useNavigate();


//   const [user, setUser] = useState({
//     email: "",
//     password: "",
// });

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser(prev => {
//         return (
//             {
//                 ...prev,
//                 [name]: value,
//             }
//         )
//     })
//     console.log(user)
// }

//   const errors = {
//     email: "Invalid email",
//     pass: "Invalid password"
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const {  email, password } = user;

//         const res = await fetch("http://localhost:5000/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             credentials: "include",
//             body: JSON.stringify({
//                 email, password
//             })
//         });

//         const data = await res.json();
//         console.log(data);
//         if(res.status===422 || res.status===401 || !data){
//             window.alert("Invalid Credentials")
//         }else{
//             window.alert("Login succesfull");
//             if (data.jobRole === "Farmer") {
//                 navigate("/farmerHome")
//             }
//             else if (data.jobRole === "Preserver") {
//                 navigate("/preserverHome");
//             }
//         }

//   };

//   const renderErrorMessage = (name) =>
//     errorMessages[name] && <div className="error">{errorMessages[name]}</div>;

//   const renderForm = (
//     <div className="form">
//       <form onSubmit={handleSubmit}>
//         <div className="input-container">
//           <label>Email </label>
//           <input type="text" name="email" required onChange={handleChange} value={user.email}/>
//           {renderErrorMessage("email")}
//         </div>
//         <div className="input-container">
//           <label>Password </label>
//           <input type="password" name="password" required onChange={handleChange} value={user.password}/>
//           {renderErrorMessage("pass")}
//         </div>
//         <div className="button-container">
//           <input type="submit" value="Login" />
//         </div>
//       </form>
//     </div>
//   );

//   return (
//     <div className="login">
//       <div className="login-form">
//         <div className="title">Welcome Back</div>
//         {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import happykisan from "../../images/happykisan.jpg";

function Registration() {
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


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const { fname, lname, email, jobRole, password, cpassword } = user;

    //     const res = await fetch("http://localhost:5000/register", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         credentials: "include",
    //         body: JSON.stringify({
    //             fname, lname, email, jobRole, password, cpassword
    //         })
    //     });

    //     const data = await res.json();
    //     console.log(data);
    //     if(res.status===422 || !data){
    //         window.alert("Invalid Registration")
    //     }else{
    //         window.alert("Registration succesfull");
    //         if (data.jobRole === "Farmer") {
    //             navigate("/farmerHome")
    //         }
    //         else if (data.jobRole === "Preserver") {
    //             navigate("/preserverHome");
    //         }
    //     }
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = user;

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
        if (res.status === 422 || res.status === 401 || !data) {
            window.alert("Invalid Credentials")
        } else {
            if (data.jobRole === "Farmer") {
                navigate("/farmerHome")
            }
            else if (data.jobRole === "Preserver") {
                navigate("/preserverHome");
            }
        }

    };

    return (
        <div className="registration">
            <div className="backdrop">
                <div className="register-box">
                    <div className="register-box-left" style={{backgroundImage:{happykisan}}}>
                    </div>
                    <div className="register-box-form">
                        <div style={{ padding: "0 50px 0 50px" }}>
                            <div className="register-form-title" style={{ padding: "50px 0 50px 0" }}>
                                Crop <span>Care</span>
                            </div>
                            <div className="register-form-heading">
                                Welcome Back
                            </div>
                            <div className="register-input-box">
                                <form>

                                    <div>
                                        <div className="register-form-name">Email</div>
                                        <input className="register-form-input" type="email" required value={user.email} onChange={handleChange} name="email"></input>
                                    </div>
                                    <div>
                                        <div className="register-form-name">Password</div>
                                        <input className="register-form-input" type="password" required value={user.password} onChange={handleChange} name="password"></input>
                                    </div>
                                    <div className="register-submit-button">
                                        <button type="submit" onClick={handleSubmit}>Login</button>
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