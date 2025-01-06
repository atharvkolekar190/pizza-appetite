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

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("Dispatching GET_USER_ORDERS_REQUEST...");
  dispatch({ type: "GET_USER_ORDERS_REQUEST" });

  try {
    console.log("Before AXIOS method");
    const response = await axios.get(
      `/api/orders/getuserorders?userid=${currentUser._id}` // Pass `userid` in query params
    );
    console.log("Response received:", response.data); // Debug log
    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error fetching user orders:", error.message); // Debug log
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error.message });
  }
};
