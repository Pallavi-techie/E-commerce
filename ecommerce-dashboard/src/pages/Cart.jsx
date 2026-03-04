import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

function Cart() {

  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (

            <div className="text-center mt-20 text-gray-500 dark:text-gray-400 text-lg">
              Your cart is empty 🛒
            </div>

          ) : (

            <div className="grid md:grid-cols-3 gap-8">

              {/* Cart Items */}

              <div className="md:col-span-2 space-y-4">

                {cart.map(item => (

                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 shadow rounded-xl p-4 transition-colors"
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain"
                    />

                    <div className="w-1/3">

                      <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="text-blue-600 font-bold mt-1">
                        ${item.price}
                      </p>

                    </div>

                    {/* Quantity */}

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        -
                      </button>

                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>

                  </motion.div>

                ))}

              </div>

              {/* Order Summary */}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 h-fit transition-colors"
              >

                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4 text-gray-700 dark:text-gray-300">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between mb-4 text-gray-700 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-6 text-gray-700 dark:text-gray-300">
                  <span>Shipping</span>
                  <span>$0</span>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6 text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                >
                  Proceed to Checkout
                </button>

              </motion.div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Cart;