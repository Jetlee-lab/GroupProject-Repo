import React from 'react';
import AITS_Logo from '../components/images/logo2.jpg';
import { Link, useNavigate } from 'react-router-dom'; 

const LoginPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    // Performing login logic here
    console.log('User logged in successfully!');

    // Redirecting to the Landing Page after successful login
    navigate('/landing');
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img src={AITS_Logo} alt="AITS Logo" className="object-cover w-full h-full" />
      </div>

      {/* Right: Log In Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Log in to Academic Issue Tracking System
        </h1>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4 bg-sky-100">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" name="remember" className="text-red-500" />
            <label htmlFor="remember" className="text-green-900 ml-2">
              Remember Me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <a href="/" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Log in
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-green-500 text-center">
          <Link to="/signup" className="hover:underline">
            Sign Up Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;