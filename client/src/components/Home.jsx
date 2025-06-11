import React, { useState } from "react";

const Home = () => {
  const [image, setImage] = useState("assets/headphones/headphone11.png");
  return (
    <div className="xs:py-0 xs:px-5 p-20 bg-gradient-to-r from-[#83ccff] to-[#4290fb] xs:h-auto xs:w-full h-[calc(100vh-70px)] ">
      <div className="flex  xs:flex-wrap xs:flex-col-reverse items-center justify-between h-full">
        <div className="xs:w-full w-[50%]">
          <h1 className="text-5xl xs:text-center font-bold leading-[55px]  ">
            Top Gadgets, Best Pricesss Shop Now & Save!
          </h1>
          <p className="my-4 xs:text-center">
          Upgrade your lifestyle with the latest gadgets! From flagship smartphones to high-performance laptops and top-quality accessories, we bring you the best tech at unbeatable prices. Browse, shop, and experience innovation with seamless shopping and fast delivery
          </p>

          <button className="xs:block xs:mx-auto px-3 py-2 bg-red-500 text-white cursor-pointer ">
            Shop Now
          </button>
          <div className=" flex xs:justify-center  xs:space-x-4 space-x-10 mt-4 ">
            
            <img
              src="assets/headphones/headphone11.png"
              className="h-[100px]"
              alt=""
              onClick={() => setImage("assets/headphones/headphone11.png")}
            />
             <img
              src="assets/headphones/headphone13.png"
              className="h-[100px]"
              alt=""
              onClick={() => setImage("assets/headphones/headphone13.png")}
            />
            <img
              src="assets/headphones/headphone22.png"
              className="h-[100px]"
              alt=""
              onClick={() => setImage("assets/headphones/headphone22.png")}
            />
           
          </div>
        </div>
        <div className="xs:text-center xs:mx-auto ">
          <img
            src={image}
            alt="image not found"
            className="xs:w-[250px] xs:h-[300px] w-[420px] h-[500px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;


