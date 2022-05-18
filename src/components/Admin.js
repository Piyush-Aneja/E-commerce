import React from "react";
import { AdminLogin } from "./AdminLogin";
import axios from "./axios";

function submitForm() {
  var formEl = document.getElementById("myForm");
  console.log(formEl);
  console.log(formEl.title.value);
  axios
    .post("/addData", {
      product_id: formEl.prod_id.value,
      name: formEl.title.value,
      description: formEl.desc.value,
      price: formEl.price.value,
      url: formEl.url.value,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  formEl.reset();
}
let centerstyle = {
  left: "50%",
  top: "50%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
};
let btnStyle = {
  backgroundColor: "lightblue",
  padding: "2px",
  color: "black",
};
export default function Admin() {
  return (
    <div>
      {JSON.parse(localStorage.getItem("userData")).email ===
      "admin@gmail.com" ? (
        <center>
          <form action="" id="myForm" style={centerstyle}>
            <input
              type="number"
              name="prod_id"
              id="prod_id"
              placeholder="Product ID"
            />
            <br />
            <input type="text" name="title" id="title_id" placeholder="title" />
            <br />
            <input
              type="text"
              name="desc"
              id="description"
              placeholder="Description"
            />
            <br />
            <input
              type="number"
              name="price"
              id="price_id"
              placeholder="Price"
            />
            <br />
            <input type="text" name="url" placeholder="URL of image" />
            {/* <input type="submit" value="Submit" /> */}
            <br />
            <input
              style={btnStyle}
              type="button"
              onClick={submitForm}
              value="Submit"
            />
            <br />

            <br />
          </form>
          <input
            //   style={{ backgroundColor: "red" }}
            style={btnStyle}
            type="button"
            onClick={() => (window.location.href = "admin/edit")}
            value="edit"
          />
          {/* backgroundColor: "yellow"  */}
          <br />
          <input
            style={btnStyle}
            type="button"
            onClick={() => {
              window.location.href = "../";
            }}
            value="Back to Home page"
          />
        </center>
      ) : (
        <AdminLogin />
      )}
    </div>
  );
}
