import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let onLogin = async () => {
    let dataToSend = new FormData();

    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/login", reqOptions);

    let JSOData = await JSONData.json();
    console.log(JSOData);

    if (JSOData.status == "success") {
      dispatch({ type: "login", data: JSOData.userData });
      navigate("/dashboard");
    } else {
      alert(JSOData.msg);
    }
  };

  return (
    <div className="App">
      <form>
        <h2 style={{ backgroundColor: "deeppink", color: "white" }}>Login</h2>

        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              onLogin();
            }}
          >
            Login
          </button>
        </div>
      </form>
      <div>
        Don't have account?<Link to="/signup">Click Here</Link> to create
        account
      </div>
    </div>
  );
}

export default Login;
