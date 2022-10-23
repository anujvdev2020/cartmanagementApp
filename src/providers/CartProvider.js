import { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();

const initialTodoListState = [];
// const MenuItems = [
//   {
//     id: 0,
//     image:
//       "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/FP.jpg",
//     price: 550,
//     foodname: "Farmers Pick Pizza",
//     quantity: 0,
//     isVeg: true,
//   },
//   {
//     id: 1,
//     image:
//       "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/Mar.jpg",
//     price: 600,
//     foodname: "Marghreita",
//     quantity: 0,
//     isVeg: true,
//   },
//   {
//     id: 2,
//     image:
//       "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/CS.jpg",
//     price: 650,
//     foodname: "Chicken Supreme Pizza",
//     quantity: 0,
//     isVeg: false,
//   },
//   {
//     id: 3,
//     image:
//       "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/CS.jpg",
//     price: 750,
//     foodname: "Chicken Supreme Pizza 1",
//     quantity: 0,
//     isVeg: false,
//   },
//   {
//     id: 4,
//     image:
//       "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/DPS.jpg",
//     price: 750,
//     foodname: "Peppy Paneer",
//     quantity: 0,
//     isVeg: false,
//   },
// ];

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotal] = useState(0);
  useEffect(() => {
    fetch("https://demoerceappl.vercel.app/")
      .then((data) => {
        return data.json();
      })
      .then((post) => {
        console.log(post.data);
        setCart(post.data);
      });
  }, []);

  const getNumberOfTodoItems = () => {
    let total = 0;
    if (cart.length > 0) {
      cart.map((item) => {
        total += item.quantity;
      });
    }

    setTotal(total);
    return total;
  };
  const addToCart = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });

    setCart(updatedCart);
  };
  const deleteFromCart = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity -= 1;
      }
      return item;
    });

    setCart(updatedCart);
  };

  const contextValue = {
    getNumberOfTodoItems,
    cart,
    addToCart,
    totalItems,
    deleteFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

export default CartProvider;
