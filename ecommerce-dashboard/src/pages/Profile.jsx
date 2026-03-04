import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

function Profile() {

  const { user } = useContext(AuthContext);

  const storedImage = localStorage.getItem("profileImage");

  const [image, setImage] = useState(storedImage || null);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
      toast.success("Profile picture updated");
    };

    if (file) reader.readAsDataURL(file);

  };

  const removeImage = () => {
    setImage(null);
    localStorage.removeItem("profileImage");
    toast("Profile picture removed");
  };

  const handleSave = () => {

    localStorage.setItem("registeredUser", JSON.stringify(form));
    localStorage.setItem("user", JSON.stringify(form));

    toast.success("Profile updated successfully");

  };

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8 flex justify-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-lg transition-colors"
          >

            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              My Profile
            </h1>

            <div className="flex flex-col items-center mb-6">

              {image ? (

                <img
                  src={image}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                />

              ) : (

                <FaUserCircle size={90} className="text-gray-400 dark:text-gray-500" />

              )}

              <div className="flex gap-3 mt-3 items-center">

                <input
                  type="file"
                  onChange={handleImage}
                  className="text-sm text-gray-700 dark:text-gray-200"
                />

                {image && (
                  <button
                    onClick={removeImage}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                )}

              </div>

            </div>

            <div className="space-y-4">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-3 w-full rounded-lg bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-3 w-full rounded-lg bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
              />

              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="border p-3 w-full rounded-lg bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
              />

              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg transition"
              >
                Save Changes
              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}

export default Profile;