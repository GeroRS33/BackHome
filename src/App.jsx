import {
  Navigate,
  Routes,
  Route,
} from "react-router";

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

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import { useCart } from "./context/CartContext.jsx";
import { useFavorites } from "./context/FavoritesContext.jsx";

import "./styles/variables.css";
import "./styles/global.css";

function App() {
  // Estado y funciones globales del carrito.
  const {
    carrito,
    carritoCargando,
    carritoError,
    agregarAlCarrito,
    eliminarDelCarrito,
    modificarCantidad,
    vaciarCarrito,
    totalCarrito,
  } = useCart();

  // Estado y funciones globales de favoritos.
  const {
    favoritos,
    toggleFavorito,
    vaciarFavoritos,
  } = useFavorites();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/registro"
        element={<RegisterPage />}
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage
              favoritos={favoritos}
              agregarAlCarrito={
                agregarAlCarrito
              }
              toggleFavorito={
                toggleFavorito
              }
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
              agregarAlCarrito={
                agregarAlCarrito
              }
              toggleFavorito={
                toggleFavorito
              }
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
              agregarAlCarrito={
                agregarAlCarrito
              }
              toggleFavorito={
                toggleFavorito
              }
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
              toggleFavorito={
                toggleFavorito
              }
              vaciarFavoritos={
                vaciarFavoritos
              }
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
              carritoCargando={carritoCargando}
              carritoError={carritoError}
              eliminarDelCarrito={eliminarDelCarrito}
              modificarCantidad={modificarCantidad}
              total={totalCarrito}
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
              total={totalCarrito}
              vaciarCarrito={
                vaciarCarrito
              }
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

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;