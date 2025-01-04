export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const newItem = action.payload;
            console.log("Adding new item to cart:", newItem); // Check the dispatched item

            // Check if the item is already in the cart
            const existingItem = state.cartItems.find(item => item._id === newItem._id && item.baseOptions === newItem.baseOptions);
            if (existingItem) {
                // If the item already exists, update the quantity
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item._id === existingItem._id && item.baseOptions === existingItem.baseOptions
                            ? { ...item, quantity:newItem.quantity, price:newItem.price }
                            : item
                    )
                };
            } else {
                // If the item doesn't exist, add it to the cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem]
                };
            }
        case "DELETE_FROM_CART":
            return{
                ...state,
                cartItems:state.cartItems.filter(item=>item._id !== action.payload._id)
            }
        default:
            return state;
    }
};

export default cartReducer;
