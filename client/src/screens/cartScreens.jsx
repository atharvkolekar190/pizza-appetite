import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { deleteFromCart } from '../actions/cartActions';
import Checkout from '../Components/Checkout';
import { ToastContainer } from "react-toastify";  // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";    // Import Toastify CSS

function CartScreens() {
    const dispatch = useDispatch();
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;

    // Calculate the subtotal
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <>
            {/* ToastContainer to show toast messages */}
            <ToastContainer /> 

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-slate-950 text-center text-4xl font-extrabold mt-8 uppercase">
                My Cart
                <motion.hr
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    className="border-t-2 border-gray-400 w-1/2 mx-auto mt-2 origin-left"
                />
            </motion.div>

            {/* Cart Content */}
            <div className="flex flex-wrap justify-between mt-8 px-8 gap-6 mb-14">
                {/* Cart Items Section */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-8/12 bg-gray-50 border border-gray-300 rounded-lg shadow-lg p-6"
                >
                    <p className="text-center border-b border-gray-400 mb-4 text-2xl font-bold">
                        Cart Items:
                        <span className="px-4 py-2 mx-2 bg-indigo-100 text-indigo-700 rounded-full">
                            {cartItems.length}
                        </span>
                        <br /><br />
                    </p>

                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-wrap items-center bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="w-full md:w-8/12">
                                    <h3 className="text-lg font-bold text-gray-700">{item.name} [{item.baseOptions}]</h3>
                                    <p className="text-gray-600">
                                        Price: {item.quantity} x {item.prices} =
                                        <span className="font-semibold text-indigo-600"> {item.price} Rs./-</span>
                                    </p>
                                    <p className="text-gray-600 mt-2">Quantity:
                                        <span className="text-lg font-semibold border border-gray-300 rounded-lg px-3 py-1 ml-2">
                                            {item.quantity}
                                        </span>
                                    </p>
                                </div>
                                <div className="w-full md:w-3/12 flex justify-center">
                                    <img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-lg shadow-md" />
                                </div>
                                <div className="w-full md:w-1/12 text-center">
                                    <button
                                        className="text-red-600 hover:text-red-800 transition duration-200"
                                        onClick={() => dispatch(deleteFromCart(item))}
                                    >
                                        <i className="fa-solid fa-trash-can text-2xl"></i>
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-xl text-gray-600 font-semibold">Your cart is empty!</p>
                    )}
                </motion.div>

                {/* Total Amount Section */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-3/12 bg-gray-50 border border-gray-300 rounded-lg shadow-lg p-6"
                >
                    <p className="text-center border-b border-gray-400 mb-4 text-2xl font-bold">
                        Total Amount
                    </p>
                    <div className="text-center text-3xl font-bold text-indigo-600">
                        {subtotal} Rs./-
                    </div>
                    <Checkout
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        subtotal={subtotal}
                        className="mt-3"
                    />
                </motion.div>
            </div>
        </>
    );
}

export default CartScreens;
