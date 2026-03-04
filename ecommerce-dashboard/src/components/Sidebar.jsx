import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBoxOpen, FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

function Sidebar() {

  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />
    },
    {
      name: "Products",
      path: "/products",
      icon: <FaBoxOpen />
    },
    {
      name: "Cart",
      path: "/cart",
      icon: <FaShoppingCart />
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: <FaHeart />
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />
    }
  ];

  return (

    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-gray-900 text-white min-h-screen p-6"
    >

      <h2 className="text-3xl font-bold mb-10">
        Menu
      </h2>

      <nav className="flex flex-col gap-3">

        {menu.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition
            ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >

            {item.icon}

            {item.name}

          </Link>

        ))}

      </nav>

    </motion.div>

  );
}

export default Sidebar;