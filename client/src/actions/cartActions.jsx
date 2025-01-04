export const addToCart = (pizza, quantity, base) => (dispatch,getState) => {
    // Access the price from the price field, which contains base sizes
    const price = pizza.price[base];
    // if (!price) {
    //     price=pizza.price[baseOptions]
    // }

    // Prepare the cart item
    const cartItem = {
        name: pizza.name,
        _id: pizza._id,
        image: pizza.image,
        baseOptions: base,
        quantity: quantity,
        prices: price, // Use the correct price for the selected base
        price: price * quantity, // Multiply the price with quantity
    };

    // Log the cartItem to ensure it's populated correctly
    console.log("Dispatching cartItem:", cartItem);

    // Dispatch the ADD_TO_CART action with the cartItem
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
    const cartItems=getState().cartReducer.cartItems
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
};

export const deleteFromCart=(pizza)=>(dispatch,getState)=>{
    //used to remove items from the cart 
    dispatch({type:"DELETE_FROM_CART",payload:pizza})
    //After refreshing 
    const cartItems=getState().cartReducer.cartItems
    localStorage.setItem('cartItems',JSON.stringify(cartItems))

}