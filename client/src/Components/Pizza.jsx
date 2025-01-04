import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "../assets/css/Pizza.css"; // External CSS for enhanced effects
import { addToCart } from "../actions/cartActions";

function Pizza(pizza) {
  const [quantity, setQuantity] = useState(1);
  const [base, setBase] = useState("smallSmall");
  const [popup, setPopup] = useState({ show: false, message: "" }); // State for popup

  const dispatch = useDispatch();

  function addtocart() {
    if (localStorage.getItem('currentUser')) {
      console.log("Pizza object:", pizza.pizza);
      console.log("Selected base:", base);
      console.log("Prices object:", pizza.pizza.price);
  
      if (!pizza.pizza.price || !pizza.pizza.price[base]) {
        console.error(`Price not found for base: ${base}. Pizza data:`, pizza.pizza);
        return;
      }
  
      // Dispatch the add to cart action
      dispatch(addToCart(pizza.pizza, quantity, base));
  
      // Show the popup
      setPopup({ show: true, message: `${pizza.pizza.name} added to cart!` });
  
      // Hide the popup after 3 seconds
      setTimeout(() => {
        setPopup({ show: false, message: "" });
      }, 3000);
    } else {
      alert("Please Login First!!")
      window.location.href = "/login";
    }
  }

  return (
    <>
      <div className="m-3 p-5 w-25 shadow-md text-center border-2 rounded-lg shadow-zinc-500">
        <h1 className="font-bold font-serif my-1 text-xl">{pizza.pizza.name}</h1>
        <hr />
        <img
          src={pizza.pizza.image}
          alt={pizza.pizza.name}
          className="m-auto"
          style={{ width: "267px", height: "266px" }}
        />
        <div className="mt-2">
          <div className="text-start flex justify-items-center justify-between">
            <p className="font-bold w-1/3">Base Size:</p>
            <div className="w-2/3">
              <select
                className="p-2 border-2 rounded"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              >
                {pizza.pizza.baseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-start flex justify-items-center justify-between mt-3">
            <p className="font-bold w-1/3">Quantity</p>
            <div className="w-2/3">
              <select
                className="p-2 border-2 rounded"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[...Array(10).keys()].map((x, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            <div className="w-4/6 text-start">
              <b>Price: </b> {pizza.pizza.price[base] * quantity} Rs.
            </div>
            <div className="w-4/6 relative">
              <button
                className="add-to-cart-button"
                onClick={addtocart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Notification */}
      {popup.show && (
        <div className="popup-message fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {popup.message}
        </div>
      )}
    </>
  );
}

export default Pizza;
