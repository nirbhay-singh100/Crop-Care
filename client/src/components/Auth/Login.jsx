import React, { useState } from "react";
import "./login.css";

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


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

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, pass } = event.target.elements;

    if (email.value === "example@email.com" && pass.value === "password") {
      setIsSubmitted(true);
    } else {
      setErrorMessages({ email: errors.email, pass: errors.pass });
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