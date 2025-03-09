import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams(); // ✅ Extract the token correctly
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    axios
      .post(`http://localhost:5000/api/auth/reset-password/${token}`, { password })
      .then((result) => {
        setError(result.data.message);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-gray-100">
      <div className="bg-white p-6 w-80 rounded-lg shadow-lg">
        <p className="text-center text-2xl font-extrabold text-blue-500 mb-4">
          TECH<span className="text-red-500">BAZAAR</span>
        </p>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Reset Password
          </button>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
