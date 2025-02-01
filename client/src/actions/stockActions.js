
import axios from "axios";

// Get all stocks
export const getAllStocks = () => async (dispatch) => {
  dispatch({ type: "GET_STOCKS_REQUEST" });

  try {
    const response = await axios.get("/api/stocks/getallstocks");
    dispatch({ type: "GET_STOCKS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_STOCKS_FAILED", payload: error.message });
  }
};

// Update stock
export const updateStock = (id, newQuantity) => async (dispatch) => {
  dispatch({ type: "UPDATE_STOCK_REQUEST" });

  try {
    await axios.post("/api/stocks/updatestock", { id, newQuantity });
    dispatch({ type: "UPDATE_STOCK_SUCCESS" });
    dispatch(getAllStocks()); // Refresh stock list
  } catch (error) {
    dispatch({ type: "UPDATE_STOCK_FAILED", payload: error.message });
  }
};

// Add new stock
export const addStock = (newStock) => async (dispatch) => {
  dispatch({ type: "ADD_STOCK_REQUEST" });

  try {
    await axios.post("/api/stocks/addstock", newStock);
    dispatch({ type: "ADD_STOCK_SUCCESS" });
    dispatch(getAllStocks()); // Refresh stock list
  } catch (error) {
    dispatch({ type: "ADD_STOCK_FAILED", payload: error.message });
  }
};
