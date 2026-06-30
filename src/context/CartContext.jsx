import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useLocation } from "react-router";

import {
  getCart,
  updateCart,
  clearCart,
  getToken,
} from "../services/api";

import {
  mapApiCartToFrontend,
  mapFrontendCartToApi,
} from "../utils/cartMappers";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const location = useLocation();

  const [carrito, setCarrito] = useState([]);
  const [carritoCargando, setCarritoCargando] =
    useState(false);
  const [carritoError, setCarritoError] =
    useState("");

  // Recuerda qué sesión ya cargó el carrito.
  const tokenCarritoCargado = useRef(null);

  // Carga el carrito una sola vez por sesión.
  useEffect(() => {
    async function cargarCarrito() {
      const token = getToken();

      if (!token) {
        setCarrito([]);
        setCarritoError("");
        setCarritoCargando(false);
        tokenCarritoCargado.current = null;
        return;
      }

      // Evita volver a pedir el carrito
      // cada vez que cambia la página.
      if (tokenCarritoCargado.current === token) {
        return;
      }

      try {
        setCarritoCargando(true);
        setCarritoError("");

        const response = await getCart();

        setCarrito(
          mapApiCartToFrontend(response)
        );

        tokenCarritoCargado.current = token;
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

  // Envía el carrito completo a la API.
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
          id: productoId,
          apiId: productoId,
          idBH:
            producto.idBH ??
            producto.localId ??
            null,
          cantidad: 1,
        },
      ];
    }

    // Actualización optimista.
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

        if (itemId === String(productoId)) {
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

  const totalCarrito = carrito.reduce(
    (total, item) => {
      const precio =
        Number(item.price || item.precio) || 0;

      const cantidad =
        Number(item.cantidad) || 1;

      return total + precio * cantidad;
    },
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        carritoCargando,
        carritoError,
        agregarAlCarrito,
        eliminarDelCarrito,
        modificarCantidad,
        vaciarCarrito,
        totalCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart debe usarse dentro de CartProvider"
    );
  }

  return context;
}

export {
  CartProvider,
  useCart,
};