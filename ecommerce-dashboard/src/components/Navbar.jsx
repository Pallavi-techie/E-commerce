import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";

function Navbar() {

  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {

    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center bg-white dark:bg-gray-900 shadow px-6 py-3"
    >

      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
        E-Commerce Dashboard
      </h1>

      <div className="flex items-center gap-5">

        {/* Dark Mode Button */}

        <button
          onClick={() => setDark(!dark)}
          className="text-xl text-gray-600 dark:text-yellow-400"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* User */}

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200">

          <FaUserCircle size={24} />

          <span className="font-medium">
            {user?.name || "User"}
          </span>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </motion.div>

  );
}

export default Navbar;