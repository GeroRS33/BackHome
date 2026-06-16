// =====================================================
// Archivo central para consumir la API del obligatorio.
// BackHome - Creación de Aplicaciones
// =====================================================

export const API_URL = "https://creacionaplicaciones.onrender.com";

export const PROJECT_KEY = "backhome-retro";

export const getToken = () => localStorage.getItem("token");

export const saveToken = (token) => localStorage.setItem("token", token);

export const removeToken = () => localStorage.removeItem("token");

// Función genérica para hacer fetch a la API.
// Ya agrega siempre:
// - Content-Type
// - x-project-key
// - Authorization si hay token
export const apiFetch = async (path, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    "x-project-key": PROJECT_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Error consumiendo la API");
  }

  return data;
};

/* =========================
   USUARIOS
========================= */

export const registerUser = (userData) => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = (credentials) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const getCurrentUser = () => {
  return apiFetch("/api/usuarios/me");
};

export const updateCurrentUser = (userData) => {
  return apiFetch("/api/usuarios/me", {
    method: "PUT",
    body: JSON.stringify(userData),
  });
};

/* =========================
   PRODUCTOS
========================= */

export const getProducts = () => {
  return apiFetch("/api/productos");
};

export const getProductById = (productId) => {
  return apiFetch(`/api/productos/${productId}`);
};

export const createProduct = (productData) => {
  return apiFetch("/api/productos", {
    method: "POST",
    body: JSON.stringify(productData),
  });
};

export const updateProduct = (productId, productData) => {
  return apiFetch(`/api/productos/${productId}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });
};

export const deleteProduct = (productId) => {
  return apiFetch(`/api/productos/${productId}`, {
    method: "DELETE",
  });
};

/* =========================
   CARRITO
========================= */

export const getCart = () => {
  return apiFetch("/api/carrito");
};

export const updateCart = (cartData) => {
  return apiFetch("/api/carrito", {
    method: "PUT",
    body: JSON.stringify(cartData),
  });
};

export const clearCart = () => {
  return apiFetch("/api/carrito", {
    method: "DELETE",
  });
};

/* =========================
   COMPRAS
========================= */

export const getPurchases = () => {
  return apiFetch("/api/compras");
};

export const createPurchase = (purchaseData) => {
  return apiFetch("/api/compras", {
    method: "POST",
    body: JSON.stringify(purchaseData),
  });
};

/* =========================
   SESIÓN
========================= */

export const saveSession = (token) => {
  saveToken(token);
  localStorage.setItem("sesionActiva", "true");
};

export const logout = () => {
  removeToken();
  localStorage.removeItem("sesionActiva");
  localStorage.removeItem("currentUser");
};

export const isLoggedIn = () => {
  return Boolean(getToken());
};