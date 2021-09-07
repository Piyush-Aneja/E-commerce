import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import firebaseApp from "../Firebaseconfig";
import "../Firebaseconfig";
const auth = getAuth();

export const LoginPage = (props) => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignUp = (e) => {
    console.log("signup function");
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("userData", JSON.stringify(userCredential.user));
        // props.setloginStatus(1);
        props.setUserId(userCredential.user.providerData[0].email);
        history.push("/shop");

        // ...
      })
      .catch((error) => {
        let fullmsg = error.message;
        alert(
          fullmsg.substring(fullmsg.indexOf("/") + 1, fullmsg.indexOf(")"))
        );
        console.log(error.code);

      });
  };

  const LogIn = (e) => {
    console.log("login function");
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // console.log(userCredential);
        // console.log("Login successfull for ", user.providerData[0].email);
        let userData = {
          email: userCredential.user.email,
          // loginStatus: 1,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        props.setUserId(user.providerData[0].email);
        // props.setloginStatus(1);
        history.push("/shop");
        // ...
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

  return (
    <div>
      <form action="checkUser" method="post">
        <div className="wrapper">
          <div className="row">
            <h1>Login</h1>
            <div className="form-control">
              <input
                type="text"
                name="email"
                placeholder="Enter Your Name..."
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="toggle">
                <i className="fas fa-user"></i>
              </span>
            </div>
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
            <button className="btn" onClick={(e) => SignUp(e)}>
              <i className="fas fa-lock"></i> Register
            </button>
          </div>
        </div>
        <script src="login1.js"></script>
      </form>
    </div>
  );
};

