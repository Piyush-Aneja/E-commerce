import React, { useState } from "react";
// import {Link} from "react-router-dom"
import axios from "./axios";
import "./cart.css";

export const Cart = (props) => {
  function removeFromCart(item) {
    console.log("remove item from cart:", item);
    axios.post("/removeItem", {
      product_id: props.product_id,
      user_id: props.user_id,
    });
    props.fetchCartData();
    // window.location.reload();
  }
  // let quantityValue = 0;
  const [quantityValue, setquantityValue] = useState(props.price);
  function setQuantity(e) {
    setquantityValue(e.target.value);

  }

  return (
    <>
      {/* <div className="card" style={{ width: "16rem" }}>
        <img src={props.url} className="card-img-top" alt="..." /> */}

      <div className="product">
        <div className="row">
          <div className="col-md-3">
            <img
              className="img-fluid mx-auto d-block image"
              src={props.url}
              alt="not"
            />
          </div>
          <div className="col-md-8">
            <div className="info">
              <div className="row">
                <div className="col-md-5 product-name">
                  <div className="product-name">
                    <a href="#0">{props.description}</a>
                    <div className="product-info">
                      {/* <input
                        type="button"
                        value="remove item"
                        onClick={() => removeFromCart(props)}
                      /> */}
                      <button
                        id="removeFromCartBtn"
                        type="button"
                        className="btn btn-outline-primary btn-sm pull-left"
                        onClick={() => removeFromCart(props)}
                        style={{ margin: "7px" }}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 quantity">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max="1"
                    // value="1"
                    placeholder="1"
                    onChange={(e) => setQuantity(e)}
                    className="form-control quantity-input"
                  />
                </div>
                <div className="col-md-3 price">
                  <span>
                    ₹
                    {props.price * quantityValue > 2000000
                      ? props.price
                      : props.price * quantityValue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

