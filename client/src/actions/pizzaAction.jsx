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