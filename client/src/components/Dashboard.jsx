import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      // .get("http://localhost:5000/dashboard")
      .get("https://tech-bazaar-backend.vercel.app/dashboard")
      .then((result) => {
        const filteredUsers = result.data.filter((user) =>
          user.userOrders?.some((order) => order.cart?.length > 0)
        );
        setData(filteredUsers);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const sendEmail = (email) => {
    axios
      // .post("http://localhost:5000/api/admin/email", { email })
      .post("https://tech-bazaar-backend.vercel.app/api/admin/email", { email })
      .then((res) => {
        console.log("email sent", res);
      })
      .catch(() => {
        console.log("error sending email");
      });
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard Page</h1>

      {data.map((user, index) => (
        <div
          key={index}
          className="mb-12 bg-white p-4 sm:p-6 rounded-2xl shadow-md"
        >
          {/* User Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-5">
            {/* Left Block: Name + Email Button + Contact Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto">
              <div className="space-y-1 sm:space-y-0 sm:space-x-4 sm:flex sm:items-center">
                <h2 className="text-base xs:text-lg font-semibold text-gray-700 break-all">
                  Name:{" "}
                  <span className="text-gray-800">
                    {user.username.toUpperCase()}
                  </span>
                </h2>
                <button
                  onClick={() => sendEmail(user.email)}
                  className="bg-blue-500 px-4 py-1.5 text-sm text-white rounded-md hover:bg-blue-600"
                >
                  Send Email
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-2 sm:mt-0 sm:ml-6 space-y-1">
                <h2 className="text-sm font-medium text-gray-700">
                  Address: <span className="text-gray-800">{user.address}</span>
                </h2>
                <h2 className="text-sm font-medium text-gray-700">
                  WhatsApp:{" "}
                  <span className="text-gray-800">{user.whatsApp}</span>
                </h2>
              </div>
            </div>

            {/* Right Block: Total */}
            <div className="text-base sm:text-xl font-semibold text-gray-800 mt-2 sm:mt-0">
              Total: Rs.{" "}
              {user.userOrders.reduce(
                (sum, order) => sum + (order.totalPrice || 0),
                0
              )}
            </div>
          </div>

          {/* Each Order's Table */}
          {user.userOrders.map(
            (order, orderIdx) =>
              order.cart?.length > 0 && (
                <div key={orderIdx} className="mb-8">
                  <h3 className="text-md font-semibold text-gray-600 mb-2">
                    Order #{orderIdx + 1} — Rs. {order.totalPrice}
                  </h3>
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-[800px] md:min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-200 h-[60px]">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                            Product
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase hidden sm:table-cell">
                            Category
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                            Price
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                            Quantity
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                            Rating
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase hidden sm:table-cell">
                            Stock
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.cart.map((item, itemIdx) => (
                          <tr
                            key={itemIdx}
                            className="hover:bg-gray-100 transition duration-150"
                          >
                            <td className="px-4 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-800">
                              <img
                                src={item.image}
                                className="w-[40px] h-[40px] object-cover"
                                alt={item.name}
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-800">
                              {item.name}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-800 hidden sm:table-cell">
                              {item.category}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs sm:text-sm text-green-600 font-semibold">
                              Rs. {item.price}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-800">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs sm:text-sm text-yellow-500 font-medium">
                              <div className="flex items-center gap-1">
                                <span>{item.rating}</span>
                                <FaStar />
                              </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-800 hidden sm:table-cell">
                              {item.stock}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-800">
                              <ImBin2 className="text-red-400 cursor-pointer" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
