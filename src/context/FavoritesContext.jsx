import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useLocation } from "react-router";

import {
  getCurrentUser,
  updateCurrentUser,
  getToken,
} from "../services/api";

const FavoritesContext = createContext(null);

function FavoritesProvider({ children }) {
  const location = useLocation();

  const [favoritos, setFavoritos] = useState([]);
  const [favoritosCargando, setFavoritosCargando] =
    useState(false);
  const [favoritosError, setFavoritosError] =
    useState("");
  const [usuarioActual, setUsuarioActual] =
    useState(null);

  // Recuerda para qué sesión ya cargamos los favoritos.
  const tokenCargado = useRef(null);

  useEffect(() => {
    async function cargarFavoritos() {
      const token = getToken();

      // Si no hay sesión, limpiamos la información.
      if (!token) {
        setFavoritos([]);
        setUsuarioActual(null);
        setFavoritosCargando(false);
        tokenCargado.current = null;
        return;
      }

      // Evita repetir el GET en cada cambio de página.
      if (tokenCargado.current === token) {
        return;
      }

      try {
        setFavoritosCargando(true);
        setFavoritosError("");

        const response = await getCurrentUser();
        const usuario = response?.user || null;

        setUsuarioActual(usuario);

        const favoritosGuardados =
          usuario?.data?.favoritos;

        setFavoritos(
          Array.isArray(favoritosGuardados)
            ? favoritosGuardados
            : []
        );

        tokenCargado.current = token;
      } catch (error) {
        console.error(
          "Error cargando favoritos:",
          error
        );

        setFavoritosError(
          error.message ||
            "No se pudieron cargar los favoritos."
        );
      } finally {
        setFavoritosCargando(false);
      }
    }

    cargarFavoritos();
  }, [location.pathname]);

  // Guarda favoritos sin borrar nombre, bio
  // ni los demás datos del perfil.
  const guardarFavoritosEnApi = async (
    nuevosFavoritos
  ) => {
    let usuario = usuarioActual;

    if (!usuario) {
      const response = await getCurrentUser();
      usuario = response?.user || null;
    }

    const dataActual = usuario?.data || {};

    const datosActualizados = {
      nombre: dataActual.nombre || "",
      bio: dataActual.bio || "",
      location: dataActual.location || "",
      memberSince: dataActual.memberSince || "",
      avatar: dataActual.avatar || "",
      favoritos: nuevosFavoritos,
    };

    const response = await updateCurrentUser(
      datosActualizados
    );

    const usuarioActualizado =
      response?.user || {
        ...usuario,
        data: datosActualizados,
      };

    setUsuarioActual(usuarioActualizado);
  };

  const toggleFavorito = async (productoId) => {
    const favoritosAnteriores = favoritos;

    const favoritosActualizados =
      favoritos.includes(productoId)
        ? favoritos.filter(
            (id) => id !== productoId
          )
        : [...favoritos, productoId];

    // Actualización optimista.
    setFavoritos(favoritosActualizados);
    setFavoritosError("");

    try {
      await guardarFavoritosEnApi(
        favoritosActualizados
      );
    } catch (error) {
      console.error(
        "Error guardando favoritos:",
        error
      );

      setFavoritos(favoritosAnteriores);

      setFavoritosError(
        error.message ||
          "No se pudieron actualizar los favoritos."
      );
    }
  };

  const vaciarFavoritos = async () => {
    const favoritosAnteriores = favoritos;

    setFavoritos([]);
    setFavoritosError("");

    try {
      await guardarFavoritosEnApi([]);
    } catch (error) {
      console.error(
        "Error vaciando favoritos:",
        error
      );

      setFavoritos(favoritosAnteriores);

      setFavoritosError(
        error.message ||
          "No se pudieron vaciar los favoritos."
      );
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoritos,
        favoritosCargando,
        favoritosError,
        toggleFavorito,
        vaciarFavoritos,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites debe usarse dentro de FavoritesProvider"
    );
  }

  return context;
}

export {
  FavoritesProvider,
  useFavorites,
};