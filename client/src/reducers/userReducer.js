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
      return { loading: true }; // Set loading state when login is requested
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload }; // Store user info on successful login
    case "USER_LOGIN_FAILED":
      return { loading: false, error: action.payload }; // Handle errors with payload
    case "USER_LOGOUT":
      return {}; // Reset state completely on logout
    default:
      return state; // Return current state for unrelated actions
  }
};

export const getUsersReducer=(state={},action)=>{
  switch (action.type) {
    case 'GET_USERS_REQUEST':
      return { ...state, loading: true };
    case 'GET_USERS_SUCCESS':
      return { users: action.payload, loading: false };
    case 'GET_USERS_FAILED':
      return { error: action.payload, loading: false };
    default:
      return state;
  }
}