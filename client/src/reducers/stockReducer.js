
export const stockReducer = (state = { stocks: [] }, action) => {
    switch (action.type) {
      case "GET_STOCKS_REQUEST":
        return { loading: true, ...state };
      case "GET_STOCKS_SUCCESS":
        return { loading: false, stocks: action.payload };
      case "GET_STOCKS_FAILED":
        return { loading: false, error: action.payload };
  
      case "UPDATE_STOCK_REQUEST":
      case "ADD_STOCK_REQUEST":
        return { ...state, loading: true };
      case "UPDATE_STOCK_SUCCESS":
      case "ADD_STOCK_SUCCESS":
        return { ...state, loading: false };
      case "UPDATE_STOCK_FAILED":
      case "ADD_STOCK_FAILED":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  