import React, { useState, useEffect } from "react";
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import axios from "./axios";

import "./cart.css";

export const CartsContainer = (props) => {
  // console.log("carts  :", props);
  const [cartItems, setcartItems] = useState([]);

  async function fetchCartData() {
    let userdata = JSON.parse(localStorage.getItem("userData"));

    // console.log(page_type);

    let response = await axios.get("/cart", {
      params: { userId: userdata.email },
    });

    setcartItems(response.data);
  }
  useEffect(() => {
    // if (props.value === 0);
    fetchCartData();
  }, []);
  function redirectHome() {
    // console.log("redirect to home");
    window.location.href = "/shop";
    // window.location.href = "#0";
  }
  // console.log("cart url:", props.data[0].url);
  let subtotal1 = 0,
    discount = 0,
    shipping = 0;

  return (
    <div>
      <main className="page">
        <section className="shopping-cart dark">
          <div className="container">
            <div className="block-heading">
              <h2>Shopping Cart</h2>
              {/* <p>Welcome {props.userId}</p> */}

              {/* {console.log("name ..!!!!", props.userName)} */}
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="items">
                    {/* {console.log("DAta:", cartItems)} */}
                    {cartItems.map((item, k) => {
                      subtotal1 = subtotal1 + item.price;

                      console.log(item);
                      return (
                        <Cart
                          key={k}
                          name={item.name}
                          product_id={item.product_id}
                          user_id={item.user_id}
                          url={item.url}
                          description={item.description}
                          price={item.price}
                          fetchCartData={fetchCartData}
                        />
                      );
                    })}
                    {/* {setsubtotal(subtotal1)} */}
                    {/* {console.log(subtotal1)} */}
                  </div>
                </div>
                {/* if(subtotal!==subtotal1) */}
                {/* {setsubtotal(subtotal1)} */}
                <Checkout
                  Subtotal={subtotal1}
                  Discount={discount}
                  Shipping={shipping}
                  Total={subtotal1 - discount + shipping}
                  // setsubtotal={setsubtotal}
                />
              </div>
            </div>
            <center>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={redirectHome}
              >
                Back to shopping
              </button>
            </center>
          </div>
        </section>
      </main>
    </div>
  );
};
