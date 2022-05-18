import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import Admin from "./Admin";
import "./Login.css";
import "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import firebaseApp from "../Firebaseconfig";
import "../Firebaseconfig";
const auth = getAuth();

export const AdminLogin = (props) => {
  let history = useHistory();
  //   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LogIn = (e) => {
    console.log("login function");
    e.preventDefault();
    signInWithEmailAndPassword(auth, "admin@gmail.com", password)
      .then(() => {
        // Signed in
        // const user = userCredential.user;

        // console.log(userCredential);
        // console.log("Login successfull for ", user.providerData[0].email);
        let userData = {
          email: "admin@gmail.com",
          name: "ramu",
          // loginStatus: 1,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        // localStorage.setItem("userData", userData);

        // props.setloginStatus(1);
        console.log("success");
        history.push("/admin");
      })
      .catch((error) => {
        let fullmsg = error.message;
        alert(
          fullmsg.substring(fullmsg.indexOf("/") + 1, fullmsg.indexOf(")"))
        );
        console.log(error.message);
        // const errorMessage = error.message;
      });
  };

  function show$hide() {
    // let toggle = document.getElementsByClassName("toggle")[0];
    let password = document.querySelector("#password");

    // console.log(toggle);

    if (password.getAttribute("type") === "password") {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  }
  console.log("came to admin login");
  return (
    <div>
      <form action="checkUser" method="post">
        <div className="wrapper">
          <div className="row">
            <h1>Admin Login</h1>

            <div className="form-control">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter Your Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="toggle" onClick={show$hide}>
                <i className="fas fa-eye"></i>
              </span>
            </div>
            <button className="btn" onClick={(e) => LogIn(e)}>
              <i className="fas fa-lock"></i> Login
            </button>
          </div>
        </div>
        <script src="login1.js"></script>
      </form>
    </div>
  );
};
