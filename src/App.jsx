<<<<<<< Updated upstream
<<<<<<< Updated upstream
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

function App() {

  return (

    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/productos" element={<CatalogPage />} />

      <Route

        path="/producto/:id"

        element={<ProductDetailPage />}

      />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/registro" element={<RegisterPage />} />

      <Route path="/carrito" element={<CartPage />} />

      <Route path="/checkout" element={<CheckoutPage />} />

      <Route

        path="/confirmacion"

        element={<ConfirmationPage />}

      />

      <Route path="/perfil" element={<ProfilePage />} />

      <Route path="*" element={<NotFoundPage />} />

    </Routes>

  );

=======
import LoginPage from "./pages/LoginPage";
import "./styles/variables.css";
import "./styles/global.css";

function App() {
  return <LoginPage />;
>>>>>>> Stashed changes
=======
import LoginPage from "./pages/LoginPage";
import "./styles/variables.css";
import "./styles/global.css";

function App() {
  return <LoginPage />;
>>>>>>> Stashed changes
}

export default App;