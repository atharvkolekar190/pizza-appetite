import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/users/forgot-password", { email });

      toast.success("A temporary password has been sent to your email.", {
        autoClose: 3000,
        position: "top-center",
        theme: "colored",
      });

      setTimeout(() => {
        window.location.href = "/login"; // Redirect after showing success toast
      }, 3000);
    } catch (err) {
      toast.error("Error: Unable to process request. Please try again.", {
        autoClose: 3000,
        position: "top-center",
        theme: "colored",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full border-2 border-gray-200">
        <h2 className="text-2xl font-extrabold text-red-500 mb-4 text-center">
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email, and we'll send you a temporary password.
        </p>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"}`}
          >
            {loading ? "Sending..." : "Send Temporary Password"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Remembered your password?{" "}
          <a href="/login" className="text-red-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
