import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingStock, setEditingStock] = useState(null);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/stocks");
      setStocks(data);

      // Show popups for low inventory
      const lowInventory = data.filter((stock) => stock.quantity < 5);
      if (lowInventory.length > 0) {
        lowInventory.forEach((stock) => {
          toast.warn(
            `Low inventory alert: ${stock.name} only has ${stock.quantity} units left!`,
            { autoClose: 8000 }
          );
        });
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpdateStock = async (id, updatedStock) => {
    try {
      const { data } = await axios.put(`/api/stocks/${id}`, updatedStock);
      setStocks((prev) =>
        prev.map((stock) => (stock._id === id ? data : stock))
      );
      toast.success(`${updatedStock.name} updated successfully!`);
    } catch (err) {
      toast.error("Failed to update stock.");
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      await axios.delete(`/api/stocks/${id}`);
      setStocks((prev) => prev.filter((stock) => stock._id !== id));
      toast.success("Stock deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete stock.");
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Stock Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td className="border border-gray-300 px-4 py-2">{stock.name}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">${stock.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => setEditingStock(stock)}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStock(stock._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingStock && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Edit Stock</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateStock(editingStock._id, editingStock);
              setEditingStock(null);
            }}
          >
            <input
              type="text"
              value={editingStock.name}
              onChange={(e) =>
                setEditingStock({ ...editingStock, name: e.target.value })
              }
              className="border p-2 mr-2"
              placeholder="Name"
              required
            />
            <input
              type="number"
              value={editingStock.quantity}
              onChange={(e) =>
                setEditingStock({ ...editingStock, quantity: e.target.value })
              }
              className="border p-2 mr-2"
              placeholder="Quantity"
              required
            />
            <input
              type="number"
              value={editingStock.price}
              onChange={(e) =>
                setEditingStock({ ...editingStock, price: e.target.value })
              }
              className="border p-2 mr-2"
              placeholder="Price"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              Save
            </button>
            <button
              onClick={() => setEditingStock(null)}
              className="bg-gray-500 text-white px-4 py-2 ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Stock;
