import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProducts } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProduct = async () => {

      const data = await getProducts();

      const selected = data.find(
        (item) => item.id === Number(id)
      );

      setProduct(selected);
      setLoading(false);

    };

    fetchProduct();

  }, [id]);

  if (loading) {

    return (
      <div className="flex justify-center mt-20">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );

  }

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl transition-colors"
          >

            <img
              src={product.image}
              alt={product.title}
              className="h-80 object-contain"
            />

            <div>

              <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {product.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {product.description}
              </p>

              <p className="text-2xl font-bold text-blue-600 mb-6">
                ${product.price}
              </p>

              <div className="flex gap-4">

                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success("Added to cart");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => {
                    addToWishlist(product);
                    toast("Added to wishlist ❤️");
                  }}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg"
                >
                  Wishlist
                </button>

                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
                  Buy Now
                </button>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;