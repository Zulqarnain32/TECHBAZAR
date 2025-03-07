import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import React from "react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const closeNav = () => {
    setShowNavbar(false);
  };

  useEffect(() => {
    if (showNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showNavbar]);

  return (
    <div className=" w-full sticky top-0  h-[70px] flex justify-between items-center px-10 xs:px-5 z-10 border-b-2 bg-white">
      <div className="flex items-center text-[30px] text-blue-500">
        <h4 className="font-extrabold">TECH<span className="text-red-500">BAZAAR</span></h4>
      </div>
      <div className="block md:hidden cursor-pointer" onClick={handleShowNavbar}>
        <GiHamburgerMenu className=" text-3xl text-blue-500" />
      </div>
      <div
        className={` xs:bg-blue-500 xs:text-white absolute md:static top-[70px] left-0 w-[140px] md:w-auto h-screen md:h-auto transition-all duration-300 max-w-[450px]:bg-red-500 ease-in overflow-hidden z-50 md:flex md:items-center md:space-x-8 md:text-[18px] font-bold uppercase tracking-wide  ${showNavbar ? "left-0" : "left-[-140px]"}`}
      >
        <button className="absolute top-2 right-2 text-[35px]  md:hidden" onClick={closeNav}>
          <RxCross2 />
        </button>
        <Link to="/" className="md:text-red-500 md:font-extrabold  block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          HOME
        </Link>
        <Link to="/products" className="md:text-red-500 md:font-extrabold  block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          PRODUCTS
        </Link>
        <Link to="/products" className="md:text-red-500 md:font-extrabold  block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          Private
        </Link>
        <Link to="/dashboard" className="md:text-red-500 md:font-extrabold  block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          DASHBOARD
        </Link>
        <Link to="/cart" className="md:text-red-500 md:font-extrabold  block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          CART
        </Link>
        <Link to="/login" className="md:text-red-500 md:font-extrabold  block py-4 px-4 border-b md:border-0" onClick={closeNav}>
          LOGIN
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
