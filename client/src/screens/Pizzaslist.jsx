import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { getAllPizzas } from "../actions/pizzaAction";

function Pizzaslist() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducers);
  const { pizzas, error, loading } = pizzasstate;

  // State for popup message
  const [popup, setPopup] = useState({ message: "", show: false });

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="text-4xl font-bold text-blue-800 text-center my-10">Pizzas List</div>

      {/* Loading and Error States */}
      {loading && <Loading name="Loading Your Pizza" />}
      {error && <Error title="Something went wrong" desc="Please try again later..." />}

      {/* Pizza List Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left w-12">#</th> {/* Fixed width for index */}
              <th className="px-4 py-2 text-left w-48">Name</th> {/* Fixed width for Name */}
              <th className="px-4 py-2 text-left w-32">Category</th> {/* Fixed width for Category */}
              <th className="px-4 py-2 text-left w-32">Image</th> {/* Fixed width for Image */}
              <th className="px-4 py-2 text-left w-32">Cheese Type</th> {/* Fixed width for Cheese Type */}
              <th className="px-4 py-2 text-left w-56">Sauces</th> {/* Fixed width for Sauces */}
              <th className="px-4 py-2 text-left w-52   ">Prices</th> {/* Fixed width for Prices */}
              <th className="px-4 py-2 text-left w-40">Actions</th> {/* Fixed width for Actions */}
            </tr>
          </thead>

          <tbody>
            {pizzas &&
              pizzas.map((pizza, index) => (
                <tr key={pizza._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td> {/* Index */}
                  <td className="px-4 py-2">{pizza.name}</td>
                  <td className="px-4 py-2">{pizza.category}</td>
                  <td className="px-4 py-2">
                    <img src={pizza.image} alt={pizza.name} className="w-20 h-20 object-cover rounded-md" />
                  </td>
                  <td className="px-4 py-2">{pizza.cheeseType}</td>
                  <td className="px-4 py-2">
                    {/* Display sauces without list icons */}
                    {pizza.sauces.join(", ")}
                  </td>
                  <td className="px-4 py-2">
                    {/* Display prices without list icons */}
                    {Object.entries(pizza.price).map(([size, price]) => (
                      <div key={size}>{size}: ₹{price}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded-md transition-all ease-in-out duration-200">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md transition-all ease-in-out duration-200">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pizzaslist;
