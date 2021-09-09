import React, { useState, useEffect } from "react";

// import axios from "axios";
import axios from "./axios";
export const Card = (props) => {
  const [btnText, setbtnText] = useState("Add to cart");

  async function checkcart() {
    let response = await axios.get("checkcart", {
      params: {
        user_id: props.userId,
        product_id: props.id,
      },
    });
    console.log(response.data);
    if (response.data.length > 0) setbtnText("Added to cart");
    else {
      setbtnText("Add to cart");
    }
  }

  useEffect(() => {
    checkcart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addtoCart(item) {
    if (item.userId === "") alert("You are logged out");
    else {
      setbtnText("Added to cart");
      axios
        .post("/cart", {
          product_id: item.id,
          user_id: item.userId,
        })
        .then((response) => {
          // console.log("item added to cart");
          // window.location.reload();
        })
        .catch((err) => console.log("error in posting:", err));
    }

    // fetchCart();
  }
  const cardStyle = {
    height: "30rem",
    width: "20rem",
    // backgroundColor: "red",
    objectFit: "contain",
  };

  return (
    <div>
      <div className="card" style={cardStyle}>
        <img
          src={props.image}
          className="card-img-top"
          alt="..."
          height="330"
          width="15rem"
        />
        <div className="card-body">
          <p className="card-text">
            <b> {props.name}</b>
          </p>
          <b>
            <p>
              Price: ₹{props.price}
              {/* {console.log(props.price)} */}
            </p>
          </b>

          <button
            type="button"
            className="btn btn-outline-primary"
            // value={btnText}
            onClick={() => addtoCart(props)}
            disabled={btnText === "Add to cart" ? false : true}
            style={{ margin: "auto" }}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};
