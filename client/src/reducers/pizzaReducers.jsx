export const getAllPizzasReducers = (state = {}, action) => {
    switch (action.type) {
      case 'GET_PIZZAS_REQUEST':
        return { ...state, loading: true };
      case 'GET_PIZZAS_SUCCESS':
        return { pizzas: action.payload, loading: false };
      case 'GET_PIZZAS_FAILED':
        return { error: action.payload, loading: false };
      default:
        return state;
    }
  };
  