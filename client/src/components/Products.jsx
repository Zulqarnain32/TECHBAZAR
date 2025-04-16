
import React, { useState, useContext, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../global/AuthContext';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products/fetch')
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className='bg-gray-200 mt-0 py-5'>
        <div className='w-[95%] mx-auto'>
          <div className='pt-5 flex flex-col lg:flex-row gap-4'>
            {/* Sidebar */}
            <div className='w-full lg:w-[17%] bg-white p-4'>for Category</div>

            {/* Product Grid */}
            <div className='w-full lg:w-[80%]'>
              <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map((product, index) => (
                  <div key={index} className='border bg-white p-4 rounded shadow-sm'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='w-full h-40 object-contain mb-3'
                    />
                    <h1 className='text-sm mb-2'>{product.name}</h1>
                    <div className='flex justify-between items-center text-sm'>
                      <h1 className='font-semibold'>RS {product.price}</h1>
                      <span className='bg-green-200 rounded px-2 py-1 text-sm flex items-center'>
                        {product.rating}
                        <FaStar className='text-yellow-400 ml-1' />
                      </span>
                    </div>
                    <div className='mt-3'>
                      <button
                        className='bg-blue-500 hover:bg-blue-700 text-white w-full py-2 rounded text-sm'
                        onClick={() => navigate(`/products/${product._id}`)}
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;


