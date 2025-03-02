import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-gray-100">
      <div className="bg-white p-6 w-80 rounded-lg shadow-lg ">
        <p className="text-center text-2xl font-extrabold text-blue-500 mb-4">TECH<span className='text-red-500'>BAZAAR</span></p>
        
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Email"
            required
            className="p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Log In
          </button>
          
          <a href="#" className="text-blue-600 text-center mt-3 text-sm hover:underline">
            Forgot Password?
          </a>

          <hr className="my-4 border-gray-300" />

          <Link
          to = "/registration"
            type="button"
            className="bg-green-600 text-center hover:bg-green-700 text-white font-semibold py-2 rounded-md w-3/4 mx-auto transition duration-200"
          >
            Create New Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
