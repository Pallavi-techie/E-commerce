import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

function ProductCard({ product }) {

  const { addToCart, cart } = useContext(CartContext);
  const { addToWishlist, wishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  const isInCart = cart.find((item) => item.id === product.id);

  const isInWishlist = wishlist.find(
    (item) => item.id === product.id
  );

  const goToDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (

    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col justify-between relative hover:shadow-xl transition-colors"
    >

      {/* Wishlist */}

      <button
        onClick={() => {
          addToWishlist(product);
          toast("Added to wishlist ❤️");
        }}
        className="absolute top-3 right-3"
      >

        <FaHeart
          className={`text-lg ${
            isInWishlist ? "text-red-500" : "text-gray-400 dark:text-gray-500"
          }`}
        />

      </button>

      {/* Category Badge */}

      <span className="absolute top-3 left-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded capitalize">
        {product.category}
      </span>

      {/* Image */}

      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-4 cursor-pointer"
        onClick={goToDetail}
      />

      {/* Title */}

      <h3
        onClick={goToDetail}
        className="text-sm font-medium mb-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 text-gray-900 dark:text-white"
      >
        {product.title}
      </h3>

      {/* Rating */}

      <div className="flex items-center gap-1 mb-2 text-yellow-500">

        <FaStar />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {product.rating?.rate || 4.5}
        </span>

      </div>

      {/* Price */}

      <p className="text-blue-600 font-bold mb-4 text-lg">
        ${product.price}
      </p>

      {/* Buttons */}

      <div className="flex flex-col gap-2">

        <button
          onClick={() => {
            addToCart(product);
            toast.success("Added to cart 🛒");
          }}
          className={`w-full py-2 rounded-lg transition
          ${
            isInCart
              ? "bg-green-500 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isInCart ? "Added ✓" : "Add to Cart"}
        </button>

        <button
          onClick={goToDetail}
          className="border border-gray-300 dark:border-gray-600 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
        >
          View Details
        </button>

      </div>

    </motion.div>

  );

}

export default ProductCard;