import { Navigate } from "react-router";
import { getToken } from "../services/api";

// Protege las rutas que requieren una sesión iniciada.
function ProtectedRoute({ children }) {
  const token = getToken();

  // Si no hay token, redirige al login.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay sesión, muestra la página solicitada.
  return children;
}

export default ProtectedRoute;