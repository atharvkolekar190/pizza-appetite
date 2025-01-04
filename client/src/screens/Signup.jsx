import React from "react";
import {useState,useEffect} from "react"
import {useDispatch,useSelector} from 'react-redux'
import { signupUser } from "../actions/userActions";
 
const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword,setConfirmPassword]=useState('')
  const dispatch=useDispatch()
  function submit(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
        alert("Passwords do not match!");
    } else {
        const user = {
            name,
            email,
            password,
        };
        dispatch(signupUser(user)); // Pass the user object
        console.log("Data: ", user);
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center m-6">
      {/* Container */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full border-2 shadow-black">
        {/* Left Section - Pizza Image */}
        <div className="md:block md:w-1/2 border-r-2">
        <div className="m-8">
            <img src="https://i.pinimg.com/474x/07/37/1a/07371a5299ecdc51bbb2dfff5b59ba47.jpg" alt="" className="rounded-xl " />
        </div>
        </div>

        {/* Right Section - Sign-Up Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-red-500 mb-4 text-center">
            Create Your Account!
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Sign up to order your favorite pizzas!
          </p>

          <form className="space-y-6"
          onSubmit={(e)=>{
            submit(e)
            }}>
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                required
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                required
                type="email"
                id="email"
                placeholder="abc@xyz.com"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
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
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                required
                type="password"
                id="confirmPassword"
                value={confirmpassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-red-500" />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-red-500 hover:underline">
                  Terms and Conditions
                </a>
              </span>
            </div>

            {/* Sign-Up Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="border-t flex-grow border-gray-300"></div>
            <span className="mx-2 text-gray-400">OR</span>
            <div className="border-t flex-grow border-gray-300"></div>
          </div>

          {/* Log In Link */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-red-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  
  );
};

export default SignUpPage;
