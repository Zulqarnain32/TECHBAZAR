import React, { useContext, useState } from 'react'
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import  {useCookies} from "react-cookie"
import { AuthContext } from '../global/AuthContext';

const Login = () => {
  const [ email,setEmail ] = useState("")
  const [ password,setPassword ] = useState("")
  const [ error,setError ] = useState("")
  const [cookies, setCookies] = useCookies(["access_token"]);
  const { setUser } = useContext(AuthContext)
  
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
      e.preventDefault()    
      axios.post('http://localhost:5000/api/auth/login',{email,password})
      .then(result => {
        console.log(result)
          if(result?.data?.message == "sucessfully login"){
            window.localStorage.setItem("id",result.data.id)
            // window.localStorage.setItem("token",result.da)
            window.localStorage.setItem("user", JSON.stringify(result.data));
            console.log("login ho geya");
            setCookies("access_token",result.data.id)
            setUser({ username: result.data.username});
            
          setError("");
          navigate('/products')
          window.location.reload();
        
          }
          else if(result?.data?.message == "please fill all the fields"){
             setError("Please fill all the fields")
          }
          else if(result?.data?.message === "incorrect password"){
              setError("incorrect password")
          } else if(result?.data?.message === "invalid email"){
              setError("email not found")
          } else {
              setError("")
          }
          console.log(result)    
      }).catch(err => console.log(err))
  }

  
  const openWithGoogle = () => {
    window.open("http://localhost:5000/auth/google/callback","_self")
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
            Log In
          </button>
          <div onClick={openWithGoogle} className='border-2 mt-6 flex items-center py-1 justify-center space-x-3 cursor-pointer rounded-md'>
             <img 
               src="/assets/google.png"  
               className='w-[20px]'
              />
              <p >Sign in with Google</p>

          </div>
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          
          <Link to = "/forgot-password" className="text-blue-600 text-center mt-3 text-sm hover:underline">
            Forgot Password?
          </Link>

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
