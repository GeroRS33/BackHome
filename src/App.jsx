import { useState } from "react";
import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import "./styles/variables.css";
import "./styles/global.css";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const toggleFavorito = (productoId) => {
    if (favoritos.includes(productoId)) {
      setFavoritos(favoritos.filter((id) => id !== productoId));
    } else {
      setFavoritos([...favoritos, productoId]);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/productos"
        element={
          <CatalogPage
            favoritos={favoritos}
            agregarAlCarrito={agregarAlCarrito}
            toggleFavorito={toggleFavorito}
          />
        }
      />

      <Route path="/producto/:id" element={<ProductDetailPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/registro" element={<RegisterPage />} />

      <Route path="/carrito" element={<CartPage carrito={carrito} />} />

      <Route path="/checkout" element={<CheckoutPage carrito={carrito} />} />

      <Route path="/confirmacion" element={<ConfirmationPage />} />

      <Route path="/perfil" element={<ProfilePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;