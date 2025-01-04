import React from "react";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";

function Checkout(props) {
  const dispatch = useDispatch();

  const tokenHandler = (token) => {
    console.log("Stripe Token Received: ", token);
    dispatch(placeOrder(token, props.subtotal));
  };

  return (
    <>
      <StripeCheckout
        amount={props.subtotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51QdSigATOtobaEjqUTdDr9XHXDkGlV3v6W8rhdTqZGXhkIKR2keoApoPFHn2lvEA70eKJdWHvyrDQ1PHkXVLeqAZ00VeLd3GcS"
        currency="INR"
      >
        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-300"
        >
          Pay Now: ₹{props.subtotal}
        </button>
      </StripeCheckout>
    </>
  );
}

export default Checkout;
