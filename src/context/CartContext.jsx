import {
  createContext,
  useCallback,
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

  const carritoRef = useRef([]);
  const tokenCarritoCargado = useRef(null);

  const actualizarCarritoLocal = useCallback(
    (nuevoCarrito) => {
      carritoRef.current = nuevoCarrito;
      setCarrito(nuevoCarrito);
    },
    []
  );

  const cargarCarrito = useCallback(async () => {
    const token = getToken();

    if (!token) {
      actualizarCarritoLocal([]);
      setCarritoError("");
      setCarritoCargando(false);
      tokenCarritoCargado.current = null;

      return [];
    }

    if (tokenCarritoCargado.current === token) {
      return carritoRef.current;
    }

    try {
      setCarritoCargando(true);
      setCarritoError("");

      const response = await getCart();

      const carritoApi =
        mapApiCartToFrontend(response);

      actualizarCarritoLocal(carritoApi);
      tokenCarritoCargado.current = token;

      return carritoApi;
    } catch (error) {
      console.error(
        "Error cargando carrito:",
        error
      );

      setCarritoError(
        error.message ||
        "No se pudo cargar el carrito."
      );

      throw error;
    } finally {
      setCarritoCargando(false);
    }
  }, [actualizarCarritoLocal]);

  useEffect(() => {
    const debeCargarCarrito =
      location.pathname === "/carrito" ||
      location.pathname === "/checkout";

    if (debeCargarCarrito) {
      cargarCarrito();
    }
  }, [location.pathname, cargarCarrito]);

  const guardarCarritoEnApi = async (
    nuevoCarrito
  ) => {
    setCarritoError("");

    await updateCart(
      mapFrontendCartToApi(nuevoCarrito)
    );
  };

  const agregarAlCarrito = async (
    producto
  ) => {
    try {
      const carritoBase =
        await cargarCarrito();

      const productoId = String(
        producto.id
      );

      const productoExiste =
        carritoBase.find(
          (item) =>
            String(item.id) ===
            productoId
        );

      let carritoActualizado;

      if (productoExiste) {
        carritoActualizado =
          carritoBase.map((item) => {
            if (
              String(item.id) ===
              productoId
            ) {
              return {
                ...item,
                cantidad:
                  Number(
                    item.cantidad
                  ) + 1,
              };
            }

            return item;
          });
      } else {
        carritoActualizado = [
          ...carritoBase,
          {
            ...producto,
            id: productoId,
            cantidad: 1,
          },
        ];
      }

      actualizarCarritoLocal(
        carritoActualizado
      );

      await guardarCarritoEnApi(
        carritoActualizado
      );
    } catch (error) {
      console.error(
        "Error agregando al carrito:",
        error
      );

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
    const carritoAnterior =
      carritoRef.current;

    const carritoActualizado =
      carritoAnterior.filter(
        (item) =>
          String(item.id) !==
          String(productoId)
      );

    actualizarCarritoLocal(
      carritoActualizado
    );

    try {
      await guardarCarritoEnApi(
        carritoActualizado
      );
    } catch (error) {
      console.error(
        "Error eliminando producto:",
        error
      );

      actualizarCarritoLocal(
        carritoAnterior
      );

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
      await eliminarDelCarrito(
        productoId
      );
      return;
    }

    const carritoAnterior =
      carritoRef.current;

    const carritoActualizado =
      carritoAnterior.map((item) => {
        if (
          String(item.id) ===
          String(productoId)
        ) {
          return {
            ...item,
            cantidad:
              Number(nuevaCantidad),
          };
        }

        return item;
      });

    actualizarCarritoLocal(
      carritoActualizado
    );

    try {
      await guardarCarritoEnApi(
        carritoActualizado
      );
    } catch (error) {
      console.error(
        "Error modificando cantidad:",
        error
      );

      actualizarCarritoLocal(
        carritoAnterior
      );

      setCarritoError(
        error.message ||
        "No se pudo modificar la cantidad."
      );
    }
  };

  const vaciarCarrito = async () => {
    const carritoAnterior =
      carritoRef.current;

    actualizarCarritoLocal([]);

    try {
      await clearCart();
    } catch (error) {
      console.error(
        "Error vaciando carrito:",
        error
      );

      actualizarCarritoLocal(
        carritoAnterior
      );

      setCarritoError(
        error.message ||
        "No se pudo vaciar el carrito."
      );

      throw error;
    }
  };

  const totalCarrito = carrito.reduce(
    (total, item) => {
      const precio = Number(
        item.price ||
        item.precio ||
        0
      );

      const cantidad =
        Number(item.cantidad) || 1;

      return (
        total +
        precio * cantidad
      );
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
  const context = useContext(
    CartContext
  );

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