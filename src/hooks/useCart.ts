import { useEffect, useMemo, useState } from "react";
import { CartItem, Guitar } from "../types";

export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (guitar: Guitar) => {
    const intemExist = cart.findIndex((item) => item.id === guitar.id);

    if (intemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[intemExist].quantity++;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = { ...guitar, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: Guitar["id"]) => {
    const filterCart = cart.filter((item) => item.id !== id);
    setCart(filterCart);
  };

  const increaseQuantity = (id: Guitar["id"]) => {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1,
        };
      }
      return guitar;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: Guitar["id"]) => {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > 1) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1,
        };
      }
      return guitar;
    });
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, element) => total + element.price * element.quantity,
        0
      ),
    [cart]
  );

  return {
    addToCart,
    cart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    isEmpty,
    cartTotal,
  };
};
