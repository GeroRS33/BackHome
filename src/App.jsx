import { useEffect, useState } from "react";
import {
  Navigate,
  Routes,
  Route,
  useLocation,
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

import {
  getCart,
  updateCart,
  clearCart,
  getToken,
} from "./services/api";

import "./styles/variables.css";
import "./styles/global.css";

function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function mapApiCartToFrontend(response) {
  const items = response?.items || [];

  return items.map((item) => {
    const data = item?.data || {};

    return {
      // ID real del producto en el backend.
      id: item.productoId,
      apiId: item.productoId,

      // ID original de BackHome.
      idBH: data.idBH ?? null,

      cantidad: item.cantidad || 1,

      name: data.nombre || "Producto",
      nombre: data.nombre || "Producto",

      price: Number(data.precio) || 0,
      precio: Number(data.precio) || 0,

      image: data.imagen || "",
      imagen: data.imagen || "",

      category: data.categoria || "",
      categoria: data.categoria || "",

      material: data.material || "",

      decade: Number(data.decada) || null,
      decada: Number(data.decada) || null,

      slug: data.slug || "",

      description: data.descripcion || "",
      descripcion: data.descripcion || "",
    };
  });
}

function mapFrontendCartToApi(cart) {
  return {
    items: cart.map((producto) => ({
      productoId: String(
        producto.apiId ||
          producto.backendId ||
          producto.id
      ),

      cantidad: producto.cantidad || 1,

      data: {
        idBH:
          producto.idBH ??
          producto.localId ??
          null,

        nombre:
          producto.name ||
          producto.nombre ||
          "Producto",

        precio: Number(
          producto.price ||
            producto.precio ||
            0
        ),

        imagen:
          producto.image ||
          producto.imagen ||
          "",

        categoria:
          producto.category ||
          producto.categoria ||
          "",

        material: producto.material || "",

        decada: Number(
          producto.decade ||
            producto.decada ||
            0
        ),

        slug: producto.slug || "",

        descripcion:
          producto.description ||
          producto.descripcion ||
          "",
      },
    })),
  };
}

function App() {
  const location = useLocation();

  const [carrito, setCarrito] = useState([]);
  const [carritoCargando, setCarritoCargando] =
    useState(false);
  const [carritoError, setCarritoError] =
    useState("");

  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados =
      localStorage.getItem("favoritos");

    if (!favoritosGuardados) {
      return [];
    }

    try {
      return JSON.parse(favoritosGuardados);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    async function cargarCarrito() {
      const token = getToken();

      if (!token) {
        setCarrito([]);
        setCarritoCargando(false);
        return;
      }

      try {
        setCarritoCargando(true);
        setCarritoError("");

        const response = await getCart();
        const carritoApi =
          mapApiCartToFrontend(response);

        setCarrito(carritoApi);
      } catch (error) {
        console.error(
          "Error cargando carrito:",
          error
        );

        setCarritoError(
          error.message ||
            "No se pudo cargar el carrito."
        );
      } finally {
        setCarritoCargando(false);
      }
    }

    cargarCarrito();
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );
  }, [favoritos]);

  const guardarCarritoEnApi = async (
    nuevoCarrito
  ) => {
    setCarritoError("");

    await updateCart(
      mapFrontendCartToApi(nuevoCarrito)
    );
  };

  const agregarAlCarrito = async (producto) => {
    const productoId = String(
      producto.apiId ||
        producto.backendId ||
        producto.id
    );

    const carritoAnterior = carrito;

    const productoExiste = carrito.find(
      (item) =>
        String(item.apiId || item.id) ===
        productoId
    );

    let carritoActualizado;

    if (productoExiste) {
      carritoActualizado = carrito.map(
        (item) => {
          const itemId = String(
            item.apiId || item.id
          );

          if (itemId === productoId) {
            return {
              ...item,
              cantidad:
                (item.cantidad || 1) + 1,
            };
          }

          return item;
        }
      );
    } else {
      carritoActualizado = [
        ...carrito,
        {
          ...producto,

          // El backend necesita su propio ID.
          id: productoId,
          apiId: productoId,

          // Conservamos el ID original de BackHome.
          idBH:
            producto.idBH ??
            producto.localId ??
            null,

          cantidad: 1,
        },
      ];
    }

    setCarrito(carritoActualizado);

    try {
      await guardarCarritoEnApi(
        carritoActualizado
      );
    } catch (error) {
      console.error(
        "Error agregando al carrito:",
        error
      );

      setCarrito(carritoAnterior);

      setCarritoError(
        error.message ||
          "No se pudo agregar el producto."
      );

      throw error;
    }
  };

  const eliminarDelCarrito = async (
    productoId
  ) => {
    const carritoAnterior = carrito;

    const carritoActualizado = carrito.filter(
      (item) =>
        String(item.apiId || item.id) !==
        String(productoId)
    );

    setCarrito(carritoActualizado);

    try {
      await guardarCarritoEnApi(
        carritoActualizado
      );
    } catch (error) {
      console.error(
        "Error eliminando producto:",
        error
      );

      setCarrito(carritoAnterior);

      setCarritoError(
        error.message ||
          "No se pudo eliminar el producto."
      );
    }
  };

  const modificarCantidad = async (
    productoId,
    nuevaCantidad
  ) => {
    if (nuevaCantidad <= 0) {
      await eliminarDelCarrito(productoId);
      return;
    }

    const carritoAnterior = carrito;

    const carritoActualizado = carrito.map(
      (item) => {
        const itemId = String(
          item.apiId || item.id
        );

        if (
          itemId === String(productoId)
        ) {
          return {
            ...item,
            cantidad: nuevaCantidad,
          };
        }

        return item;
      }
    );

    setCarrito(carritoActualizado);

    try {
      await guardarCarritoEnApi(
        carritoActualizado
      );
    } catch (error) {
      console.error(
        "Error modificando cantidad:",
        error
      );

      setCarrito(carritoAnterior);

      setCarritoError(
        error.message ||
          "No se pudo modificar la cantidad."
      );
    }
  };

  const vaciarCarrito = async () => {
    const carritoAnterior = carrito;

    setCarrito([]);

    try {
      await clearCart();
    } catch (error) {
      console.error(
        "Error vaciando carrito:",
        error
      );

      setCarrito(carritoAnterior);

      setCarritoError(
        error.message ||
          "No se pudo vaciar el carrito."
      );

      throw error;
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precioProducto =
        Number(item.price || item.precio) || 0;

      const cantidad =
        Number(item.cantidad) || 1;

      return (
        total +
        precioProducto * cantidad
      );
    }, 0);
  };

  const toggleFavorito = (productoId) => {
    if (favoritos.includes(productoId)) {
      setFavoritos(
        favoritos.filter(
          (id) => id !== productoId
        )
      );

      return;
    }

    setFavoritos([
      ...favoritos,
      productoId,
    ]);
  };

  const vaciarFavoritos = () => {
    setFavoritos([]);
  };

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
              carritoCargando={
                carritoCargando
              }
              carritoError={
                carritoError
              }
              eliminarDelCarrito={
                eliminarDelCarrito
              }
              modificarCantidad={
                modificarCantidad
              }
              vaciarCarrito={
                vaciarCarrito
              }
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