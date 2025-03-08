import React from 'react'

const Home = () => {
  return (
    // <div className='bg-blue-300 h-screen '>
    <div className='p-20 bg-gradient-to-r from-[#83ccff] to-[#4290fb] h-[calc(100vh-70px)] '>
    {/* <div className='bg-white h-[calc(100vh-70px)] p-20'> */}
      <div className='flex items-center justify-between h-full'>
         <div className='w-[50%]'>
           <h1 className='text-5xl font-bold leading-[55px]  '>Top Gadgets, Best Prices  Shop Now & Save!</h1>
           <p className='my-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, modi quo. Reiciendis autem, modi fugiat vel eum at tenetur volupa veritatis illum nihil commodi error quis. Vero quas veritatis doloribus totam alias?</p>
          
           <button className=' px-3 py-2 bg-red-500 text-white cursor-pointer '>Shop Now</button>
           <div className='flex space-x-5 mt-4'>
             <img src="assets/headphones/headphone13.png" className='h-[100px]' alt="" />
             <img src="assets/headphones/headphone13.png" className='h-[100px]' alt="" />
             <img src="assets/headphones/headphone13.png" className='h-[100px]' alt="" />
           </div>
         </div>
         <div>
           <img 
             src="assets/headphones/headphone11.png" 
             alt="" 
             className='w-[420px] h-[500px]'  
           />
         </div>
      </div>
 
    </div>
  )
}

export default Home
