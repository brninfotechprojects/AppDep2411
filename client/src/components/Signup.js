import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic, setProfilePic] = useState("./images/no-pic.png");

  let onSignupUsingJSON = async () => {
    let dataToSend = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobileNo: mobileNoInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };

    console.log(dataToSend);

    let dataToSendJSON = JSON.stringify(dataToSend);
    console.log(dataToSendJSON);

    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: dataToSendJSON,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
    alert(JSOData.msg);
  };

  let onSignupUsingURLE = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");

    let dataToSend = new URLSearchParams();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    dataToSend.append("profilePic", profilePicInputRef.current.value);

    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: dataToSend,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    alert(JSOData.msg);
  };

  let onSignupUsingFormData = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    alert(JSOData.msg);
  };

  return (
    <div className="App">
      <form>
        <h2>Sign Up</h2>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No.</label>
          <input ref={mobileNoInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            ref={profilePicInputRef}
            onChange={(event) => {
              let selectedImagePath = URL.createObjectURL(
                event.target.files[0]
              );

              setProfilePic(selectedImagePath);
            }}
          ></input>
          <br></br>
          <img className="profilePicPreview" src={profilePic}></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignupUsingJSON();
            }}
          >
            Signup (JSON)
          </button>
          <button
            type="button"
            onClick={() => {
              onSignupUsingURLE();
            }}
          >
            Signup (URLE)
          </button>
          <button
            type="button"
            onClick={() => {
              onSignupUsingFormData();
            }}
          >
            Signup (FormData)
          </button>
        </div>
      </form>
      <div>
        Already have an account?<Link to="/">Click Here</Link> to Login
      </div>
    </div>
  );
}

export default Signup;
