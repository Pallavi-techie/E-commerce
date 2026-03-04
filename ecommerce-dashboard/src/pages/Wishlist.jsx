import { useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

function Wishlist() {

  const { wishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Wishlist
          </h1>

          {wishlist.length === 0 ? (

            <p className="text-gray-500 dark:text-gray-400">
              Your wishlist is empty ❤️
            </p>

          ) : (

            <div className="grid md:grid-cols-3 gap-6">

              {wishlist.map((item) => (

                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 transition-colors"
                >

                  <img
                    src={item.image}
                    className="h-32 object-contain mx-auto"
                  />

                  <h3 className="text-sm mt-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-blue-600 font-bold mt-2">
                    ${item.price}
                  </p>

                  <div className="flex gap-2 mt-3">

                    <button
                      onClick={() => {
                        addToCart(item);
                        toast.success("Moved to cart");
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Move to Cart
                    </button>

                    <button
                      onClick={() => {
                        removeFromWishlist(item.id);
                        toast("Removed from wishlist");
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Wishlist;