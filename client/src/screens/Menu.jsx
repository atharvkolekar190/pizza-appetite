import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pizza from '../Components/Pizza';
import Loading from '../Components/Loading'

import { getAllPizzas } from "../actions/pizzaAction";
import Error from '../Components/Error';


function Menu() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector(state => state.getAllPizzasReducers);
  const { pizzas, error, loading } = pizzasstate;

  // State for popup message
  const [popup, setPopup] = useState({ message: '', show: false });

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  // Function to handle the popup
  const showPopup = (pizzaName) => {
    setPopup({ message: `${pizzaName} added to cart successfully!`, show: true });
    setTimeout(() => {
      setPopup({ message: '', show: false });
    }, 3000); // Popup visible for 3 seconds
  };

  return (
    <>
      <div className="text-center m-5">
        <h1 className="font-serif font-extrabold text-3xl animate-bounce">
          Available Pizzas In Store
        </h1>
      </div>
      
      {/* Loading State */}
      {loading ? (
        <Loading name="Loading Your Pizza" />
      ) : error ? (
        // Error State
        <Error title="Something went wrong" desc="Please try again later..."/>
      ) : pizzas && pizzas.length > 0 ? (
        // Data State
        <div className="justify-items-center w-full flex-wrap flex justify-center mt-2">
          {pizzas.map((pizza) => (
            <div key={pizza._id} className="flex-wrap">
              <Pizza pizza={pizza} showPopup={showPopup} />
            </div>
          ))}
        </div>
      ) : (
        // Empty State with Custom Image
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <img 
            src="../assets/images/no-pizza.png"
            alt="No Pizzas Available" 
            className="w-60 h-60"
          />
          <h1 className="text-3xl font-bold text-gray-800">No Pizzas Found</h1>
          <p className="text-gray-500 text-lg">Feeling hungry? We're all out of pizzas right now!</p>
          <button
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all duration-200"
            onClick={() => alert('Request a pizza feature coming soon!')}
          >
            Request a Pizza
          </button>
          <div className="text-sm text-gray-400 mt-4 animate-bounce">
            Or contact our kitchen for special orders.
          </div>
        </div>
      )}

      {/* Popup Notification */}
      {popup.show && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
          {popup.message}
        </div>
      )}
    </>
  );
}

export default Menu;
