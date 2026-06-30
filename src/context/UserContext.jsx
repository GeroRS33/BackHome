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

const UserContext = createContext(null);

function UserProvider({ children }) {
  const location = useLocation();

  const [usuario, setUsuario] = useState(null);
  const [usuarioCargando, setUsuarioCargando] =
    useState(false);
  const [usuarioError, setUsuarioError] =
    useState("");

  // Recuerda para qué sesión ya cargamos el usuario.
  const tokenCargado = useRef(null);

  useEffect(() => {
    async function cargarUsuario() {
      const token = getToken();

      if (!token) {
        setUsuario(null);
        setUsuarioError("");
        setUsuarioCargando(false);
        tokenCargado.current = null;
        return;
      }

      // Evita repetir GET /api/usuarios/me
      // en cada cambio de página.
      if (tokenCargado.current === token) {
        return;
      }

      try {
        setUsuarioCargando(true);
        setUsuarioError("");

        const response = await getCurrentUser();

        setUsuario(response?.user || null);
        tokenCargado.current = token;
      } catch (error) {
        console.error(
          "Error cargando usuario:",
          error
        );

        setUsuarioError(
          error.message ||
            "No se pudo cargar el usuario."
        );
      } finally {
        setUsuarioCargando(false);
      }
    }

    cargarUsuario();
  }, [location.pathname]);

  // Actualiza los datos del usuario en la API
  // y también en el estado global.
  const actualizarUsuario = async (
    nuevosDatos
  ) => {
    setUsuarioError("");

    const response = await updateCurrentUser(
      nuevosDatos
    );

    const usuarioActualizado =
      response?.user || {
        ...usuario,
        data: {
          ...(usuario?.data || {}),
          ...nuevosDatos,
        },
      };

    setUsuario(usuarioActualizado);

    return usuarioActualizado;
  };

  return (
    <UserContext.Provider
      value={{
        usuario,
        usuarioCargando,
        usuarioError,
        actualizarUsuario,
        setUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser debe usarse dentro de UserProvider"
    );
  }

  return context;
}

export {
  UserProvider,
  useUser,
};