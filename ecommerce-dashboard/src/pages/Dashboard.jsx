import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { FaBoxOpen, FaShoppingCart, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const stats = [
    {
      title: "Products Available",
      value: 20,
      icon: <FaBoxOpen size={24} />,
      color: "bg-blue-500"
    },
    {
      title: "Items in Cart",
      value: cart.length,
      icon: <FaShoppingCart size={24} />,
      color: "bg-green-500"
    },
    {
      title: "Account",
      value: user?.name || "User",
      icon: <FaUser size={24} />,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {/* Welcome */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >

            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Welcome, {user?.name} 🚀
            </h1>

            <p className="text-gray-600 dark:text-gray-300">
              Manage your products, cart, and profile from this dashboard.
            </p>

          </motion.div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6">

            {stats.map((item, index) => (

              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex items-center gap-4 transition-colors"
              >

                <div
                  className={`text-white p-4 rounded-lg ${item.color}`}
                >
                  {item.icon}
                </div>

                <div>

                  <p className="text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </h2>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;