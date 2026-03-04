import { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const [wishlist, setWishlist] = useState(storedWishlist);

  const addToWishlist = (product) => {

    const exists = wishlist.find((item) => item.id === product.id);

    if (!exists) {

      const updated = [...wishlist, product];

      setWishlist(updated);

      localStorage.setItem("wishlist", JSON.stringify(updated));

    }

  };

  const removeFromWishlist = (id) => {

    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);

    localStorage.setItem("wishlist", JSON.stringify(updated));

  };

  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

};