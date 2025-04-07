import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard Page</h1>
      {data.map((user, index) => (
        <div key={index} className="mb-12 bg-white p-6 rounded-2xl shadow-md">
          {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">{user.username || user.displayName} - {user.email}</h2> */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {user.email}
          </h2>

          {user.cart && user.cart.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Old Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user.cart.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-100 transition duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                        Rs. {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 line-through">
                        {item.oldPrice ? `Rs. ${item.oldPrice}` : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4  text-sm text-yellow-500 font-medium flex items-center ">
                        {item.rating}
                        <FaStar />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        🚴‍♂️
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No items in cart.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
