import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

function Products() {

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProducts();
        setProducts(data);
        setDisplayProducts(data);

      } catch (error) {

        console.log("Error fetching products");

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  useEffect(() => {

    let filtered = [...products];

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayProducts(filtered);

  }, [category, search, sort, products]);

  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery"
  ];

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Products
          </h1>

          {/* Search + Sort */}

          <div className="flex flex-col md:flex-row gap-4 mb-6">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-3 rounded-lg w-full md:w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border p-3 rounded-lg w-full md:w-1/4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="default">Sort By</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>

          </div>

          {/* Categories */}

          <div className="flex flex-wrap gap-3 mb-8">

            {categories.map((cat) => (

              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg capitalize transition
                ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>

            ))}

          </div>

          {loading ? (

            <div className="flex justify-center mt-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>

          ) : (

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >

              {displayProducts.map((product) => (

                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >

                  <ProductCard product={product} />

                </motion.div>

              ))}

            </motion.div>

          )}

        </div>

      </div>

    </div>
  );

}

export default Products;

