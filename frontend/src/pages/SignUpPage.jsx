import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import AITS_Logo from '../components/images/logo2.jpg';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate(); 

  const handleSignUp = (e) => {
    e.preventDefault();

    // Performing sign-up logic here
    console.log('User signed up successfully!');

    // Redirecting to the Landing Page after successful sign-up
    navigate('/landing');
  };

  return (
    <div className="bg-sky-100 flex h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-full hidden lg:block">
        <img
          src={AITS_Logo}
          alt="AITS Logo"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Sign Up Form */}
      <div className="p-5 w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mt-20 mb-6 text-center">Sign Up</h1>
          <form onSubmit={handleSignUp}>
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
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
                required
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-800">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                name="confirmPassword"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Reference Number Input */}
            <div className="mb-4">
              <label htmlFor="referenceNumber" className="block text-gray-800">
                Reference Number
              </label>
              <input
                type="text"
                id="referenceNumber"
                name="referenceNumber"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* User Role Dropdown */}
            <div className="mb-4">
              <label htmlFor="userRole" className="block text-gray-800">
                User Role
              </label>
              <select
                id="userRole"
                name="userRole"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled selected>
                  Select your role
                </option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Sign Up
            </button>
          </form>

          {/* Log in Link */}
          <div className="mt-6 text-green-500 text-center">
            <Link to="/account/login" className="hover:underline">
              Already have an account? Log In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;