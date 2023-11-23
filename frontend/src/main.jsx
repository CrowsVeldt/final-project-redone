import { ChakraProvider } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import CartProvider from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <CartProvider>
      <AuthProvider>
        <ToastContainer position="bottom-left" />
        <App />
      </AuthProvider>
    </CartProvider>
  </ChakraProvider>
);
