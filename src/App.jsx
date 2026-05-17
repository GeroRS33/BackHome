import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

import "./styles/variables.css";
import "./styles/global.css";

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
    const carritoActualizado = carrito.filter(
      (item) => item.id !== productoId
    );

    setCarrito(carritoActualizado);
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
      return total + item.precio * item.cantidad;
    }, 0);
  };

  const toggleFavorito = (productoId) => {
    if (favoritos.includes(productoId)) {
      const favoritosActualizados = favoritos.filter((id) => id !== productoId);

      setFavoritos(favoritosActualizados);
      return;
    }

    setFavoritos([...favoritos, productoId]);
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

      <Route
        path="/producto/:id"
        element={
          <ProductDetailPage
            favoritos={favoritos}
            agregarAlCarrito={agregarAlCarrito}
            toggleFavorito={toggleFavorito}
          />
        }
      />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/registro" element={<RegisterPage />} />

      <Route
        path="/favoritos"
        element={
          <FavoritesPage
            favoritos={favoritos}
            toggleFavorito={toggleFavorito}
          />
        }
      />

      <Route
        path="/carrito"
        element={
          <CartPage
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            modificarCantidad={modificarCantidad}
            vaciarCarrito={vaciarCarrito}
            total={calcularTotal()}
          />
        }
      />

      <Route path="/confirmacion" element={<ConfirmationPage />} />

      <Route path="/perfil" element={<ProfilePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;