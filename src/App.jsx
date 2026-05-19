import { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router";

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
import FavoritesPage from "./pages/FavoritesPage.jsx";

import "./styles/variables.css";
import "./styles/global.css";

function ProtectedRoute({ children }) {
  const sesionActiva = localStorage.getItem("sesionActiva") === "true";

  if (!sesionActiva) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
      return JSON.parse(carritoGuardado);
    }

    return [];
  });

  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem("favoritos");

    if (favoritosGuardados) {
      return JSON.parse(favoritosGuardados);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarAlCarrito = (producto) => {
    const productoExiste = carrito.find((item) => item.id === producto.id);

    if (productoExiste) {
      const carritoActualizado = carrito.map((item) => {
        if (item.id === producto.id) {
          return {
            ...item,
            cantidad: item.cantidad + 1,
          };
        }

        return item;
      });

      setCarrito(carritoActualizado);
      return;
    }

    setCarrito([
      ...carrito,
      {
        ...producto,
        cantidad: 1,
      },
    ]);
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter((item) => item.id !== productoId));
  };

  const modificarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }

    const carritoActualizado = carrito.map((item) => {
      if (item.id === productoId) {
        return {
          ...item,
          cantidad: nuevaCantidad,
        };
      }

      return item;
    });

    setCarrito(carritoActualizado);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precioProducto = item.price || item.precio || 0;

      return total + precioProducto * item.cantidad;
    }, 0);
  };

  const toggleFavorito = (productoId) => {
    if (favoritos.includes(productoId)) {
      setFavoritos(favoritos.filter((id) => id !== productoId));
      return;
    }

    setFavoritos([...favoritos, productoId]);
  };

  const vaciarFavoritos = () => {
    setFavoritos([]);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/registro" element={<RegisterPage />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage
              favoritos={favoritos}
              agregarAlCarrito={agregarAlCarrito}
              toggleFavorito={toggleFavorito}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/productos"
        element={
          <ProtectedRoute>
            <CatalogPage
              favoritos={favoritos}
              agregarAlCarrito={agregarAlCarrito}
              toggleFavorito={toggleFavorito}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/producto/:id"
        element={
          <ProtectedRoute>
            <ProductDetailPage
              favoritos={favoritos}
              agregarAlCarrito={agregarAlCarrito}
              toggleFavorito={toggleFavorito}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favoritos"
        element={
          <ProtectedRoute>
            <FavoritesPage
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
              vaciarFavoritos={vaciarFavoritos}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/carrito"
        element={
          <ProtectedRoute>
            <CartPage
              carrito={carrito}
              eliminarDelCarrito={eliminarDelCarrito}
              modificarCantidad={modificarCantidad}
              vaciarCarrito={vaciarCarrito}
              total={calcularTotal()}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage
              carrito={carrito}
              total={calcularTotal()}
              vaciarCarrito={vaciarCarrito}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/confirmacion"
        element={
          <ProtectedRoute>
            <ConfirmationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;