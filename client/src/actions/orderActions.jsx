import axios from "axios";

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  try {
    console.log("Placing Order...");
    const response = await axios.post("/api/orders/placeorder", {
      token,
      subtotal,
      currentUser,
      cartItems,
    });

    dispatch({ type: "PLACE_ORDER_SUCCESS", payload: response.data });
    console.log("Order Placed Successfully: ", response.data);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
    dispatch({ type: "PLACE_ORDER_FAILED", payload: errorMessage });
    console.error("Order Failed: ", errorMessage);
  }
};
