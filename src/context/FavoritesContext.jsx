import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useUser } from "./UserContext.jsx";

const FavoritesContext = createContext(null);

function FavoritesProvider({ children }) {
  const {
    usuario,
    usuarioCargando,
    actualizarUsuario,
  } = useUser();

  const [favoritos, setFavoritos] = useState([]);
  const [favoritosError, setFavoritosError] =
    useState("");

  // Cada vez que cambia el usuario global,
  // sincronizamos sus favoritos.
  useEffect(() => {
    const favoritosGuardados =
      usuario?.data?.favoritos;

    setFavoritos(
      Array.isArray(favoritosGuardados)
        ? favoritosGuardados
        : []
    );
  }, [usuario]);

  // Guarda favoritos sin borrar los demás
  // datos del perfil.
  const guardarFavoritosEnApi = async (
    nuevosFavoritos
  ) => {
    const dataActual = usuario?.data || {};

    await actualizarUsuario({
      nombre: dataActual.nombre || "",
      bio: dataActual.bio || "",
      location: dataActual.location || "",
      memberSince:
        dataActual.memberSince || "",
      avatar: dataActual.avatar || "",
      favoritos: nuevosFavoritos,
    });
  };

  const toggleFavorito = async (
    productoId
  ) => {
    const favoritosAnteriores = favoritos;

    const favoritosActualizados =
      favoritos.includes(productoId)
        ? favoritos.filter(
            (id) => id !== productoId
          )
        : [...favoritos, productoId];

    // Actualización optimista:
    // primero cambia la interfaz.
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
        favoritosCargando:
          usuarioCargando,
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
  const context = useContext(
    FavoritesContext
  );

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