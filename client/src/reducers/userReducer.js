export const signupUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return {
        loading: true,
      };
    case 'USER_REGISTER_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'USER_REGISTER_FAILED':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state; // Default case to handle initialization
  }
};
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.error };
    case "USER_LOGOUT":
      return { ...state, currentUser: null, cartItems: null };
    default:
      return state;
  }
};
