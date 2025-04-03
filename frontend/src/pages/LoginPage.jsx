import React, { useState } from "react";
import AITS_Logo from "../components/images/logo2.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role is "student"

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Check session
      const sessionResponse = await axios.get(
        "https://groupproject-repo.onrender.com/auth/browser/v1/auth/sessions"
      );
      console.log("Session Response:", sessionResponse.data);

      // Login Request
      const loginResponse = await axios.post(
        "https://groupproject-repo.onrender.com/auth/browser/v1/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Login Response:", loginResponse.data);

      // Navigate based on role
      console.log(`User logged in as ${role}`);
      if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "registrar") {
        navigate("/registrar-dashboard");
      } else if (role === "lecturer") {
        navigate("/lecturer-dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials and try again.");
    }
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
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-800">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="student">Student</option>
              <option value="registrar">Registrar</option>
              <option value="lecturer">Lecturer</option>
            </select>
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" className="text-red-500" />
            <label htmlFor="remember" className="text-green-900 ml-2">Remember Me</label>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <a href="/" className="hover:underline">Forgot Password?</a>
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
          <Link to="/signup" className="hover:underline">Sign Up Here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
