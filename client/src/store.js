import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { addPizzaReducer, getAllPizzasReducers } from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducers';
import { loginReducer, signupUserReducer } from './reducers/userReducer';
import { loginUser } from './actions/userActions';
import { placeOrder } from './actions/orderActions';
import { deliverOrderReducer, getAllOrderReducer, getUserOrdersReducer, placeOrderReducer } from './reducers/orderReducer';
import { stockReducer } from './reducers/stockReducer';

const finalReducers = combineReducers({
    getAllPizzasReducers, // ES6 shorthand for getAllPizzasReducers: getAllPizzasReducers
    cartReducer,
    signupUserReducer,
    loginReducer,
    placeOrderReducer,
    getUserOrdersReducer,
    addPizzaReducer,
    getAllOrderReducer,
    deliverOrderReducer,
    stockReducer
});

const cartItems=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const currentUser=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):[]
const initialState = {
    cartReducer:{
        cartItems:cartItems
    },
    loginReducer:{
        currentUser:currentUser
    }
};
const middleware = [thunk];

const store = createStore(
    finalReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
