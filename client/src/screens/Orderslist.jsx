import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { deliverOrder, getAllOrders } from "../actions/orderActions";

function Orderslist() {
  const dispatch = useDispatch();

  // Access the Redux state for orders
  const orderState = useSelector((state) => state.getAllOrderReducer);
  const { orders, error, loading } = orderState;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Handle sorting of orders
  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  // Deliver an order by ID
  const deliver = (id) => {
    console.log("Deliver button clicked for ID:", id); // Debugging log
    dispatch(deliverOrder(id));
  };

  // Calculate total pizza quantities
  const totalQuantity = orders
    ? orders.reduce(
        (sum, order) =>
          sum +
          order.orderItems?.reduce(
            (orderSum, item) => orderSum + (parseInt(item.quantity, 10) || 0),
            0
          ),
        0
      )
    : 0;

  // Sort orders based on criteria
  const sortedOrders = orders && orders.length > 0 ? [...orders] : [];
  if (sortBy === "status") {
    sortedOrders.sort((a, b) =>
      a.isDelivered === b.isDelivered ? 0 : a.isDelivered ? 1 : -1
    );
  } else if (sortBy === "price") {
    sortedOrders.sort((a, b) => a.orderAmount - b.orderAmount);
  }

  return (
    <div className="container mx-auto p-6">
      {loading && <Loading name="Loading orders..." />}
      {error && <Error title="Something Went Wrong" desc={error.toString()} />}

      {/* Total Quantity */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
        {totalQuantity > 0 ? (
          <h2 className="text-xl font-semibold text-gray-700">
            Total Pizzas Ordered:{" "}
            <span className="text-blue-600">{totalQuantity}</span>
          </h2>
        ) : (
          <h2 className="text-xl font-semibold text-gray-700">
            No pizzas ordered yet. Please check back later.
          </h2>
        )}
      </div>

      {/* Sorting Buttons */}
      <div className="mb-4">
        <button
          className="bg-blue-600 text-white p-2 rounded mr-2"
          onClick={() => handleSort("status")}
        >
          Sort by Delivery Status
        </button>
        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={() => handleSort("price")}
        >
          Sort by Price
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full table-auto border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer Details</th>
              <th className="px-4 py-2">Ordered Items</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.length > 0 ? (
              sortedOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b cursor-pointer hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{order._id}</td>
                  <td
                    className="px-4 py-2"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Name: {order.name || "N/A"}
                    <br />
                    Email: {order.email}
                  </td>
                  <td className="px-4 py-2">
                    <table className="min-w-full">
                      {order.orderItems?.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td className="px-2 border">{item.name}</td>
                          <td className="px-2 border">Qty: {item.quantity}</td>
                          <td className="px-2 border">₹{item.prices || 0}</td>
                        </tr>
                      ))}
                    </table>
                  </td>
                  <td className="px-4 py-2">₹{order.orderAmount}</td>
                  <td className="px-4 py-2">
                    {order.shippingAddress?.street},<br />
                    {order.shippingAddress?.city},<br />
                    {order.shippingAddress?.country},<br />
                    Pin- {order.shippingAddress?.pincode}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {order.isDelivered ? (
                      <span className="text-green-700 font-semibold">Delivered</span>
                    ) : (
                      <button
                        className="bg-yellow-400 p-2 border hover:bg-yellow-300 rounded-xl"
                        onClick={() => deliver(order._id)}
                      >
                        Deliver Now!
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-2 text-center text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <hr />
            <div className="text-start px-6">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Customer Name:</strong> {selectedOrder.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.email}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedOrder.shippingAddress?.street},{" "}
                {selectedOrder.shippingAddress?.city},{" "}
                {selectedOrder.shippingAddress?.country}, Pin-{" "}
                {selectedOrder.shippingAddress?.pincode}
              </p>
              <p>
                <strong>Transaction Id:</strong> {selectedOrder.transactionId}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{selectedOrder.orderAmount}
              </p>
            </div>
            <h3 className="text-xl font-semibold mt-4">Ordered Items:</h3>
            <div className="px-5">
              <ul className="list-disc list-inside">
                {selectedOrder.orderItems?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-4 border-2 m-1 text-start"
                  >
                    <img
                      src={item.image || "/default-pizza.png"}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>₹{item.prices || 0}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded absolute right-4 bottom-4"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orderslist;
