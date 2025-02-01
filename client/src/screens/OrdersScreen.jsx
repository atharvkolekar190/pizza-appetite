import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import { toast, ToastContainer } from "react-toastify";
import { FaCheckCircle, FaClock } from "react-icons/fa"; // Icons for delivered and in progress
import "./screenscss.css";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

function OrdersScreen() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.getUserOrdersReducer);

  // State to hold the selected sorting option
  const [sortOption, setSortOption] = useState("newest"); // Default sorting is Newest to Oldest

  // State to handle modal visibility and selected order details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderPlaced = urlParams.get("orderplaced");

    // If the orderPlaced flag is true, show a success toast
    if (orderPlaced) {
      toast.success("Order is Placed! See Your Order Here!");
    }

    dispatch(getUserOrders());
  }, [dispatch]);

  // Function to handle sorting of orders
  const sortOrders = (orders, sortOption) => {
    return orders.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sortOption === "newest") {
        return dateB - dateA; // Sort by latest date (Newest to Oldest)
      } else {
        return dateA - dateB; // Sort by oldest date (Oldest to Newest)
      }
    });
  };

  // Sorted orders based on the selected option
  const sortedOrders = sortOrders(orders, sortOption);

  // Function to handle opening the modal with order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="m-10 p-6 bg-gradient-to-l from-red-500 to-yellow-400 text-white rounded-lg shadow-xl">
      <ToastContainer />
      <h2 className="text-4xl font-extrabold text-center mb-6 text-black">My Orders</h2>

      {/* Sort Dropdown */}
      <div className="flex justify-end mb-5">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-600 transition-all"
        >
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <Loading name="Loading your orders"/>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-xl text-center bg-red-100 p-4 rounded-lg shadow-lg mt-4">
          <strong>Error:</strong> {error}
          <Error title="Something Went Wrong" desc="Please Try Again Later!!"></Error>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-xl text-center font-semibold">You have no orders yet. Start shopping now!</p>
      )}

      {/* Grid Layout for Orders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!loading &&
          sortedOrders.map((order) => (
            <div
              key={order._id}
              className="p-6 bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-600 text-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-semibold text-white">
                  Order ID: <span className="text-teal-300">{order._id}</span>
                </p>
                <div className="flex items-center">
                  {order.isDelivered ? (
                    <FaCheckCircle className="text-green-500 text-2xl mr-2" />
                  ) : (
                    <FaClock className="text-yellow-500 text-2xl mr-2" />
                  )}
                  <span
                    className={`${
                      order.isDelivered ? "text-green-500" : "text-yellow-500"
                    } font-bold`}
                  >
                    {order.isDelivered ? "Delivered" : "In Progress"}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-medium text-lg text-white">
                  <strong>Amount:</strong> ₹{order.orderAmount}
                </p>
                <p className="font-medium text-lg text-white">
                <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="font-medium text-lg text-white">
                  <strong>Shipping Address:</strong> {order.shippingAddress.street},{" "}
                  {order.shippingAddress.city}, {order.shippingAddress.pincode},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>

              <div className="mb-4">
                <p className="font-medium text-lg text-white">Items:</p>
                <ul className="list-disc pl-5">
                  {order.orderItems.map((item) => (
                    <li key={item._id} className="text-gray-200">
                      {item.name} ({item.quantity})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => handleViewDetails(order)}
                  className="px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 focus:outline-none transition-all duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modal for Order Details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg transform scale-95 hover:scale-100 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-black">Order Details</h3>
            <div className="mb-4 text-black">
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>Amount:</strong> ₹{selectedOrder.orderAmount}</p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <p><strong>Transaction ID:</strong> {selectedOrder.transactionId}</p>
              <p>
                <strong>Shipping Address:</strong>{" "}
                {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.pincode}, {selectedOrder.shippingAddress.country}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium text-lg text-gray-700">Items:</p>
              <ul className="list-disc pl-5">
                {selectedOrder.orderItems.map((item) => (
                  <li key={item._id} className="text-gray-600">
                    {item.name} ({item.quantity}) - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
              >
                Close
              </button>
              <button
                onClick={() => alert("Order details feature coming soon!")}
                className="px-6 py-2 bg-indigo-600 text-black rounded-lg hover:bg-indigo-700 transition-all duration-200"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersScreen;
