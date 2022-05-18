import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from "./axios";
import { AdminLogin } from "./AdminLogin";
function AdminEdit() {
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
    gridTemplateRows: "repeat(auto-fit, 35rem)",
    gap: "5px",
    marginTop: "20px",
    marginBottom: "120px",
    justifyContent: "space-between",
    padding: "15px",
  };

  return (
    <>
      {JSON.parse(localStorage.getItem("userData")).email ===
      "admin@gmail.com" ? (
        <>
          <div className="block-heading">
            <h1
              style={{
                color: "#4f93ca",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Edit Products
            </h1>
          </div>
          <div className="cardContainer" style={cardContainer}>
            {items.map((item, i) => {
              return (
                <Card
                  key={i}
                  id={item.product_id}
                  image={item.url}
                  desc={item.description}
                  price={item.price}
                  name={item.name}
                  edit={1}
                />
              );
            })}
          </div>
        </>
      ) : (
        <>
          <AdminLogin />
        </>
      )}
    </>
  );
}

export default AdminEdit;
