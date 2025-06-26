import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../global/AuthContext";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.id || user?._id;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userId) return;

    axios
      // .get(`http://localhost:5000/orders/${userId}`)
      .get(`https://tech-bazaar-backend.vercel.app/orders/${userId}`)
      .then((result) => {
        console.log("Fetched Orders:", result.data);
        setOrders(result.data.orders || []);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userId]);

  return (
    <div className="p-4 xs:p-2">
      <h1 className="text-2xl xs:text-lg font-bold mb-6 xs:mb-4 text-center">
        Your Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="mb-8 xs:mb-4 p-6 xs:p-3 border border-gray-300 rounded-2xl shadow-md"
          >
            <div className="mb-3">
              <h2 className="text-lg xs:text-base font-semibold">
                Order #{index + 1}
              </h2>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.orderDate).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-1 gap-4">
              {order.cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 xs:gap-2 border p-3 xs:p-2 rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 xs:w-16 xs:h-16 object-cover rounded"
                  />
                  <div className="flex flex-col text-sm xs:text-xs">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-600">Price: Rs. {item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-500 text-xs">
                      Product ID: {item.productId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
