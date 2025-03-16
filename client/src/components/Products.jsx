import React from 'react'
import {FaStar} from "react-icons/fa"
import data from "../global/EarbirdsData"
import {useDispatch} from "react-redux"
import { addToCart } from '../store/slices/ProductSlices'
const Products = () => {

  const dispatch = useDispatch();
  const handleAddProduct = (id) => {
    console.log("product id is ", id);
    dispatch(addToCart(data[id]))
    
  }

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
                    <>
                      <div key={product.id} className=' py-4 px-2 md:w-[24%] mb-3 border bg-white'>
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
                             <div className='bg-blue-500 hover:bg-blue-700 text-white cursor-pointer px-2 py-1' onClick={() => handleAddProduct(product.id)}>Buy Now </div>
                             <div className='text-2xl'>💙</div>
                           </div>
                         </div>
                      </div>
                    </>
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
