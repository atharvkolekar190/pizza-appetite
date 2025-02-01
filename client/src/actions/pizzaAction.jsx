import axios from 'axios';
export const getAllPizzas=()=>async dispatch=>{
    dispatch({type:"GET_PIZZAS_REQUEST"});

    try {
        const response = await axios.get('/api/pizzas/getAllPizzas');
        console.log(response.data)
        dispatch({type:"GET_PIZZAS_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"GET_PIZZAS_FAILED",payload:error});
    }
}

export const addPizza = (pizza) => async (dispatch) => {
    dispatch({ type: "ADD_PIZZA_REQUEST" });

    try {
        const response = await axios.post('/api/pizzas/addpizza', { pizzaData: pizza });
        console.log("Pizza added successfully:", response.data);

        dispatch({ type: "ADD_PIZZA_SUCCESS", payload: response.data });
    } catch (error) {
        console.error("Error adding pizza:", {
            message: error.message,
            stack: error.stack,
            ...error,
        });
        dispatch({ type: "ADD_PIZZA_FAILED", payload: response.data });
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
