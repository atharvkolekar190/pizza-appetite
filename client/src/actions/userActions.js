import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const navigate=useNavigate()
// Sign-Up Action
export const signupUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    await axios.post("/api/users/register", user); // Call register API
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAILED",
      payload: error.response?.data?.message || "An error occurred during registration",
    });
  }
};

// Login Action
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post("/api/users/login", { email, password });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    // Save only non-sensitive data in localStorage
    localStorage.setItem("currentUser", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// Logout Action
export const logoutUser = () => {
  localStorage.removeItem("cartItems")
  localStorage.removeItem("currentUser")
  return {
    type: "USER_LOGOUT",
  };
};

export const getUsers=()=>async(dispatch)=>{
  dispatch({type:"GET_USERS_REQUEST"});
    try {
        const response = await axios.get('/api/users/getallusers');
        console.log(response.data)
        dispatch({type:"GET_USERS_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"GET_USERS_FAILED",payload:error});
    }
}