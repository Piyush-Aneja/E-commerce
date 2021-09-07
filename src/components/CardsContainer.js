import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import axios from "./axios";
export const CardsContainer = (props) => {
  //   console.log(props.data);

  const [items, setItems] = useState([]);

  async function fetchData() {
    let response = await axios.get("/shop");
    setItems(response.data);
    // let cartItemResponse = await axios.get("/cart");
    // setcartItems(cartItemResponse.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const cardContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 20rem)",
    gridTemplateRows: "repeat(auto-fit, 30rem)",
    gap: "5px",
    marginTop: "20px",
    marginBottom: "120px",
    justifyContent: "space-between",
    padding: "15px"
  };

  let userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      <div className="block-heading">
        <h1
          style={{ color: "#4f93ca", textAlign: "center", marginTop: "10px" }}
        >
          Products
        </h1>
      </div>
      <div className="cardContainer" style={cardContainer}>
        {/* {console.log("set cart func:", props.setcartItems)} */}
        {/* {console.log("card items", items)} */}
        {items.map((item) => {
          return (
            <Card
              key={item.product_id}
              id={item.product_id}
              image={item.url}
              desc={item.description}
              price={item.price}
              name={item.name}
              // userId={props.userId}
              userId={userData.email}
            />
          );
        })}
      </div>
    </>
  );
};
