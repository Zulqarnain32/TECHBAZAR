import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useCookies } from 'react-cookie';
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
import { AuthContext } from "../global/AuthContext";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const { user } = useContext(AuthContext)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const closeNav = () => {
    setShowNavbar(false);
  };

  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("user")
    window.location.reload(); // Ensures UI updates after logout
  };

  useEffect(() => {
    if (showNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showNavbar]);

  return (
    <div className="w-full sticky top-0 h-[70px] flex justify-between items-center px-10 xs:px-5 z-10 bg-gradient-to-r from-[#83ccff] to-[#4290fb] bg-blue-300">
      <div className="flex items-center text-[30px] text-red-500">
        <h4 className="font-extrabold">TECH<span className="text-red-500">BAZAAR</span></h4>
      </div>
      <div className="block md:hidden cursor-pointer" onClick={handleShowNavbar}>
        <GiHamburgerMenu className="text-3xl text-white" />
      </div>
      <div
        className={`xs:bg-blue-500 xs:text-white absolute md:static top-[70px] left-0 w-[140px] md:w-auto h-screen md:h-auto transition-all duration-300 ease-in overflow-hidden z-50 md:flex md:items-center md:space-x-8 md:text-[18px] font-bold uppercase tracking-wide ${
          showNavbar ? "left-0" : "left-[-140px]"
        }`}
      >
        <button className="absolute top-2 right-2 text-[35px] md:hidden" onClick={closeNav}>
          <RxCross2 />
        </button>
        <Link to="/" className="text-white md: block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          HOME
        </Link>
        <Link to="/products" className="md:text-white  block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          PRODUCTS
        </Link>
        <Link to="/dashboard" className="md:text-white  block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          DASHBOARD
        </Link>
       {user &&  <Link className="md:text-white  block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          {user.username}
        </Link>}
        <Link to="/cart" className="md:text-white block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          <div className="flex">
          <FaShoppingCart className="text-3xl"/>
          <span className= "mt-[-5px] ml-0.5 bg-red-500 text-white text-[12px]  rounded-full h-[20px] w-5 flex items-center justify-center font-semibold" >12</span>
          </div>
        </Link>

        {/* Conditional Rendering for Login/Logout */}
        {cookies.access_token ? (
          <button
            onClick={handleLogout}
            className="text-white block py-1.5 xs:m-3  px-3  md:border-0 cursor-pointer bg-red-500 "
          >
            LOGOUT
          </button>
        ) : (
          <Link to="/login" className="text-white block py-1.5 xs:py-4 px-3 border-b md:border-0  bg-red-500" onClick={closeNav}>
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
