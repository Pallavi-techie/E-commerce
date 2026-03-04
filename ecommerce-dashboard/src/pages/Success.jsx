import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Success() {

  const navigate = useNavigate();

  return (

    <div className="flex flex-col items-center justify-center h-screen">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 shadow-xl p-10 rounded-xl text-center transition-colors"
      >

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your order has been placed successfully.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </button>

      </motion.div>

    </div>

  );

}

export default Success;