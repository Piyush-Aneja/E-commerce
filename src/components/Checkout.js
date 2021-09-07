import React from 'react'
// import RazorpayCheckout from 'react-native-razorpay';
require("dotenv").config();
function displayrazorpay(amount) {

    console.log("display razorpay,", amount, process.env.RAZORPAY_KEY_ID);
    var options = {
        key: "rzp_test_jDkEFfQ5tTpMpW", // Enter the Key ID generated from the Dashboard
        // key: process.env.REACT_APP_RAZORPAY_KEY_ID,

        amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Piyush Transaction",
        description: "Test Transaction",
        // image: "https://example.com/your_logo",
        // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        // alert(response.error.code);
        alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
    });
    // document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    // e.preventDefault();
    // }
}

export const Checkout = (props) => {
    return (

        <div className="col-md-12 col-lg-4">
            <div className="summary">
                <h3>Summary</h3>
                <div className="summary-item">
                    <span className="text">Subtotal</span>
                    <span className="price"> ₹{props.Subtotal}</span>
                </div>
                <div className="summary-item">
                    <span className="text">Discount</span>
                    <span className="price">₹{props.Discount}</span>
                </div>
                <div className="summary-item">
                    <span className="text">Shipping</span>
                    <span className="price"> ₹ {props.Shipping}</span>
                </div>
                <div className="summary-item">
                    <span className="text">Total</span>
                    <span className="price">₹{props.Total}</span>
                </div>
                <button id="rzp-button1"
                    type="button"
                    className="btn btn-success btn-lg btn-block"
                    onClick={() => displayrazorpay(props.Total)}
                >
                    Checkout
                </button>
            </div>
        </div>

    )
}
