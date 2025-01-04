import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions"; // Import the login action creator

const LoginPage = () => {
  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialize dispatch
  const dispatch = useDispatch();

  // Access login state from Redux store
  const loginState = useSelector((state) => state.loginReducer);
  const { loading, error, userInfo } = loginState;

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password)); // Dispatch login action
    console.log("Data is sent to check")
  };

  // Redirect if the user is logged in
  useEffect(() => {
    if (userInfo) {
      alert("Loggin Successful!!")
      window.location.href = "/menu"; // Redirect to dashboard or any protected route
    }
  }, [userInfo]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Container */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full border-2 shadow-black">
        {/* Left Section - Pizza Image */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.pinimg.com/474x/07/37/1a/07371a5299ecdc51bbb2dfff5b59ba47.jpg')`,
          }}
        ></div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-red-500 mb-4 text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Log in to access your pizza dashboard
          </p>

          {/* Show loading spinner or error message */}
          {loading && <p className="text-center text-red-500">Logging in...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <form className="space-y-6" onSubmit={submitHandler}>
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 text-red-500" required/>
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-red-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="border-t flex-grow border-gray-300"></div>
            <span className="mx-2 text-gray-400">OR</span>
            <div className="border-t flex-grow border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-red-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
