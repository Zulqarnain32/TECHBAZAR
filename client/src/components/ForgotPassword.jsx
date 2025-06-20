import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import  {useCookies} from "react-cookie"

const ForgotPassword = () => {
  const [ email,setEmail ] = useState("")
  const [ error,setError ] = useState("")
  
  
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
      e.preventDefault()    
      // axios.post('http://localhost:5000/api/auth/forgot-password',{email})
      axios.post('https://tech-bazaar-backend.vercel.app/api/auth/forgot-password',{email})
      .then(result => {
        setError(result.data.message)
          console.log(result)    
      }).catch(err => console.log(err))
  }
  return (
    <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-gray-100">
      <div className="bg-white p-6 w-80 rounded-lg shadow-lg ">
        <p className="text-center text-2xl font-extrabold text-blue-500 mb-4">TECH<span className='text-red-500'>BAZAAR</span></p>
        
        <form className="flex flex-col" onSubmit = {handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Send
          </button>
          {error && <p className='text-red-500 font-semibold mt-2'> {error}</p>}
          
         

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
