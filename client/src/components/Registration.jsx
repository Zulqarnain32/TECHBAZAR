import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Registration = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:5000/api/auth/register', { username, email, password })
      .then(result => {
        console.log(result.data);

        if (result?.data?.message === "please fill all the fields") {
          setError("Please fill all the fields");
        } else if (result?.data?.message === "email already exist") {
          setError("Email already exists");
        } else {
          navigate("/login");
        }

      }).catch(err => {
        setError(err.response?.data?.message || "Something went wrong");
      });
      
  }


  return (
    <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-gray-100">
      <div className="bg-white p-6 w-80 rounded-lg shadow-lg">
        <p className="text-center text-2xl font-extrabold text-blue-500 mb-4">TECH<span className='text-red-500'>BAZAAR</span></p>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Register
          </button>
         

          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          <hr className="my-4 border-gray-300" />

          <Link
            to="/login"
            className="bg-green-600 text-center hover:bg-green-700 text-white font-semibold py-2 rounded-md w-3/4 mx-auto transition duration-200"
          >
            Already have an Account
          </Link>
         
          
        </form>
      </div>
    </div>
  );
};

export default Registration;
``