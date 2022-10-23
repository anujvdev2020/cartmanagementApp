import logo from "./logo.svg";
import "./App.css";
import { Button } from "reactstrap";
import Navbar from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import OrderSuccess from "./components/OrderSuccess";
import CartProvider from "./providers/CartProvider";
import { useEffect } from "react";
import Login from './components/Login/Login'
function App() {
  useEffect(() => {
    console.log("DDDDD");
    document.addEventListener("DOMContentLoaded", (event) => {
      console.log("DOM fully loaded and parsed");
    });
  }, []);
  return (
    <div className="App">
      <CartProvider>
        {/* <Navbar color="secondary" position="sticky" dark={true} expand="sm" /> */}
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderSuccess" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
