import React from 'react'
import {FaStar} from "react-icons/fa"
import data from "../global/EarbirdsData"
import data1 from "../global/MobileData"
import data2 from "../global/WatchedData"
import { useNavigate } from 'react-router-dom'

const Products = () => {

 const navigate = useNavigate()

  return (
    <>
      <div className='bg-gray-200 mt-0 '>
        <div className='w-[95%] mx-auto '>
           <div className='pt-10 flex justify-between flex-wrap'>
             <div className='w-[17%] bg-white'>for Category
             </div>
             <div className='w-[80%] '>
                <div className='flex flex-wrap justify-between border '>
                  {data.map((product,index) => (
                    <div key={index}>
                      <div className=' py-4 px-2  mb-3 border bg-white'>
                         <div className=''>
                           <img src={product.image} alt="" className='w-[150px] mx-auto' />
                            <h1 className=' text-[13px] my-2 '>{product.name}</h1>
                           <div className='flex justify-between'>
                           <h1 className='font-semibold'>RS {product.price}</h1>
                           <span className='bg-green-200 rounded px-2 text-sm '>{product.rating}
                            <FaStar className='text-yellow-400 inline'/>
                           </span>
                           </div>
                           <div className='flex justify-between mt-3'>
                             {/* <div className='bg-blue-500 hover:bg-blue-700 text-white cursor-pointer px-2 py-1' onClick={() => handleAddProduct(product.id)}>Buy Now </div> */}
                             <div className='bg-blue-500 hover:red-blue-700 text-white cursor-pointer px-2 py-1 w-full text-center'  onClick={() => navigate(`/products/${product.id}`)}>Detail </div>
                             {/* <div className='text-2xl cursor-pointer' onClick={() => handleFavorite(product.id)}>💙</div> */}
                           </div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
           </div>
        </div>
      </div>
    </>
  )
}

export default Products
