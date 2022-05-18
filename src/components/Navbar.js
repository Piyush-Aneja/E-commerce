import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import homeImg from "../assets/home.png";
import logoutImg from "../assets/logout.png";
import cartImg from "../assets/shopping-cart.png";
import menuImg from "../assets/menu.png";
import axios from "./axios";
import "./navbar.css";
import { CartsContainer } from "./CartsContainer";
// import { CartsContainer } from "./CartsContainer";
// import { Cart } from "./Cart"
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

  async function searchCart(searchQuery, userId) {
    let response = await axios.get("search", {
      params: {
        user_id: userId,

        searchquery: searchQuery,
      },
    });
    // let d = response.data
    console.log(response.data);
    CartsContainer.setcartItems(response.data); // change useEffect in CartContainer as it is again refreshing so search items are lost.

    //CartsContainer
    // <Cart
    // name={d.name}
    // product_id={response.data.product_id}
    // user_id={response.data.user_id}
    // url={response.data.url}
    // description={response.data.description}
    // price={response.data.price} />
  }

  function searchItem() {
    console.log("searching");
    let itemName = document.querySelector("input").value;
    console.log(itemName);
    let userData = JSON.parse(localStorage.getItem("userData"));
    searchCart(itemName, userData.email);
  }

  let linkstyle = {
    textDecoration: "none",
    fontSize: "24px",
    // fontSize: "30px",
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
            {/* <Link to="/shop" style={linkstyle}>
              <li className="nav-item  ">
                <a className="nav-link  " aria-current="page" href="#0">
                  <img src={homeImg} alt="Home" width="40" height="40" />
                  Home
                </a>
              </li>
            </Link> */}

            <Link to="/shop" style={linkstyle} className="nav-link">
              <img src={homeImg} alt="Home" width="40" height="40" />
              Home
            </Link>

            <Link
              to={`/cart/?userId=${userid}`}
              style={linkstyle}
              className="nav-link"
            >
              <img src={cartImg} alt="Cart" width="40" height="40" />
              Cart
            </Link>
            <Link
              to="/"
              style={linkstyle}
              onClick={logout}
              className="nav-link"
            >
              <img
                src={logoutImg}
                alt="Logout"
                width="40"
                height="40"
                style={{ padding: "0px 5px 0px 0px" }}
              />
              Logout
            </Link>

            {/* <Link to={`/cart/?userId=${userid}`} style={linkstyle}>

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
            </Link> */}
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
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={() => searchItem()}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
