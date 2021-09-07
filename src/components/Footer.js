import React from "react";
import heartImg from "../assets/heart.png";
let FooterStyle = {
  backgroundColor: "black",
  color: "white",
  width: "100%",
  height: "60px",
  alignItems: "center",
  position: "fixed",
  bottom: "0px",
  display: "flex",
  justifyContent: "center",

};
export const Footer = () => {
  return (
    <div style={FooterStyle}>
      <p>
        Made with
        <img
          src={heartImg}
          alt="Love"
          style={{ width: "25px", height: "25px", padding: "3px" }}
        />
        by Piyush Aneja
      </p>
    </div>
  );
};
