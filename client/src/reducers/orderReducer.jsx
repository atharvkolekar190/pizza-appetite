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
