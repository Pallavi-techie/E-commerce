import { useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Checkout() {

  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    navigate("/success");
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8 grid md:grid-cols-2 gap-8">

          {/* Address */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition-colors"
          >

            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Shipping Address
            </h2>

            <div className="flex flex-col gap-4">

              <input placeholder="Full Name" className="border p-3 rounded" />
              <input placeholder="Phone Number" className="border p-3 rounded" />
              <input placeholder="City" className="border p-3 rounded" />
              <textarea placeholder="Full Address" className="border p-3 rounded" />

            </div>

          </motion.div>

          {/* Order Summary */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition-colors"
          >

            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="space-y-3">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                >

                  <span>{item.title}</span>

                  <span>
                    ${item.price} × {item.quantity}
                  </span>

                </div>

              ))}

            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-gray-900 dark:text-white">

              <span>Total</span>
              <span>${total.toFixed(2)}</span>

            </div>

            <button
              onClick={handlePayment}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Pay Now
            </button>

          </motion.div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;