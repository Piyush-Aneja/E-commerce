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
    minHeight: "31rem",
    width: "20rem",
    // backgroundColor: "red",
    objectFit: "contain",
    marginTop: "20px",
  };

  function editContent(id) {
    document.getElementById(id).contentEditable = "true";
  }
  function delContent(id) {
    axios
      .delete("/delete", { data: { product_id: props.id } })
      .then(() => console.log("Product Deleted.!"))
      .catch((err) => console.log("Error:", err));
  }

  function saveContent(id) {
    var divContent = document.getElementById(id).children[1].children;

    console.log(divContent[0].firstChild.innerHTML); //name
    console.log(divContent[0].children[2].innerHTML); //desc
    console.log(divContent[1].firstChild); //price
    let st = divContent[1].firstChild.innerHTML;
    console.log(st.substring(st.indexOf("₹") + 1)); //price
    // console.log(st.substring(st.indexOf("₹") + 1));
    // console.log(divContent[2].firstChild.innerHTML.ind); //price
    // console.log(divContent[1][0]);
    let data = {
      product_id: props.id,
      name: `${divContent[0].firstChild.innerHTML}`,
      description: `${divContent[0].children[2].innerHTML}`,
      price: st.substring(st.indexOf("₹") + 1),
      url: `${props.image}`,
    };
    axios
      .put("/admin/edit/updateData", data)
      .then(() => console.log("data updated"))
      .catch((err) => {
        console.log("error here:", err);
      });

    // prod_db.update(
    //   { name: props.name, description: props.desc, price: props.price },
    //   { where: { product_id: id } }
    // );
  }

  let btnStyle = {
    padding: "2px",
    margin: "3px",
    width: "72px",
  };
  return (
    <div>
      {/* <div className="card" style={cardStyle} id={props.id}> */}
      <div className="card" style={cardStyle} id={`${props.id}_card`}>
        {/* {`${x._id}_name`} */}
        <img
          src={props.image}
          className="card-img-top"
          alt="..."
          height="330"
          width="15rem"
        />
        <div className="card-body">
          <p className="card-text">
            <b name="title">{props.name}</b>
            <br />
            <span className="card-text" name="desc">
              {props.desc}
            </span>
          </p>
          <b>
            <p name="price">
              Price: ₹{props.price}
              {/* {console.log(props.price)} */}
            </p>
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
          </b>
        </div>
        {props.edit ? (
          <>
            <span>
              <input
                style={btnStyle}
                type="button"
                value="edit"
                onClick={() => editContent(`${props.id}_card`)}
              />
              {/* <br /> */}
              <input
                style={btnStyle}
                type="button"
                value="save"
                onClick={() => saveContent(`${props.id}_card`)}
              />
              {/* <br /> */}
              <input
                style={btnStyle}
                type="button"
                value="Delete"
                onClick={() => delContent(`${props.id}_card`)}
              />
            </span>
          </>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};
