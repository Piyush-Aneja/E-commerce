import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import homeImg from "../assets/home.png";
import logoutImg from "../assets/logout.png";
import cartImg from "../assets/shopping-cart.png";
import menuImg from "../assets/menu.png";
import "./navbar.css";
export const Navbar = (props) => {
  let history = useHistory();
  function logout() {
    // props.setloginStatus(0);
    localStorage.removeItem("userData");
    // window.location.reload();
    // window.location = "https://ecommerce28.herokuapp.com/";
    history.push("/");
    window.location.reload();


  }
  let userid = "login_error";
  // let loginStatus = 0;
  if (localStorage.getItem("userData") != null) {
    userid = JSON.parse(localStorage.getItem("userData")).email;
    // props.setloginStatus(
    //   JSON.parse(localStorage.getItem("userData")).loginStatus
    // );
  }

  function myFunction(e) {
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function (el) {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  }

  let linkstyle = {
    textDecoration: "none",
    fontSize: "14px",
    marginLeft: "10px",

    // color: "blue",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#0">
          Navigation Menu
        </a> */}
        <span
          className="navbar-brand"
          style={{
            color: "white",
            fontWeight: "bold",
            // border: "1px solid",
            padding: "5px",

            // backgroundColor: "#f8fafb",
          }}
        >
          Piyush's E-commerce
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img className=" navbar-toggler-icon" src={menuImg} alt="menu" />
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            onClick={(event) => myFunction(event)}
          >
            <Link to="/shop" style={linkstyle}>
              <li className="nav-item  ">
                <a className="nav-link  " aria-current="page" href="#0">
                  <img src={homeImg} alt="Home" width="40" height="40" />
                  Home
                </a>
              </li>
            </Link>

            <Link to={`/cart/?userId=${userid}`} style={linkstyle}>
              {/* <Link to="/cart"> */}
              {/* <Link to={`/cart/${userId}`}> */}
              <li className="nav-item">
                <a className="nav-link" href="#0">
                  <img src={cartImg} alt="Cart" width="40" height="40" />
                  Cart
                </a>
              </li>
            </Link>
            <Link to="/" style={linkstyle}>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={logout}>
                  <img
                    src={logoutImg}
                    alt="Logout"
                    width="40"
                    height="40"
                    style={{ padding: "0px 5px 0px 0px" }}
                  />
                  Logout
                </a>
              </li>
            </Link>
          </ul>
          <form
            className="d-flex"
            style={{
              alignItems: "center",
            }}
          >
            <input
              className="form-control  me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ height: "50px" }}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
