export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      console.log("Reducer State: Loading...");
      return { loading: true };
    case "PLACE_ORDER_SUCCESS":
      console.log("Reducer State: Success");
      return { loading: false, success: true };
    case "PLACE_ORDER_FAILED":
      console.log("Reducer State: Failed", action.payload);
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "GET_USER_ORDERS_REQUEST":
      return { loading: true, ...state };

    case "GET_USER_ORDERS_SUCCESS":
      return { loading: false, orders: action.payload };

    case "GET_USER_ORDERS_FAILED":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
