import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CardsProvider } from "./context/CardsContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <CardsProvider>
    <CartProvider>

         <App />

    </CartProvider>
  </CardsProvider>
  </StrictMode>
);
