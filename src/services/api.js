// =====================================================
// SERVICIO CENTRAL DE LA API
// =====================================================

export const API_URL =
  "https://creacionaplicaciones.onrender.com";

export const PROJECT_KEY = "backhome-retro";

// =====================================================
// TOKEN
// =====================================================

// Devuelve el token guardado en el navegador.
export const getToken = () =>
  localStorage.getItem("token");

// Guarda el token recibido al iniciar sesión.
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Elimina el token al cerrar sesión.
export const removeToken = () => {
  localStorage.removeItem("token");
};

// =====================================================
// FETCH GENERAL
// =====================================================

// Función central para consumir la API.
// Agrega automáticamente:
// - Content-Type
// - x-project-key
// - Authorization si existe un token
export const apiFetch = async (
  path,
  options = {}
) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    "x-project-key": PROJECT_KEY,
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,
      headers,
    }
  );

  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.message ||
        (typeof data === "string"
          ? data
          : null) ||
        "Error consumiendo la API"
    );
  }

  return data;
};

// =====================================================
// USUARIOS
// =====================================================

// Registra un usuario nuevo.
export const registerUser = (userData) => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

// Inicia sesión y devuelve un token.
export const loginUser = (credentials) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

// Obtiene los datos del usuario autenticado.
export const getCurrentUser = () => {
  return apiFetch("/api/usuarios/me");
};

// Actualiza los datos del usuario autenticado.
export const updateCurrentUser = (
  userData
) => {
  return apiFetch("/api/usuarios/me", {
    method: "PUT",
    body: JSON.stringify(userData),
  });
};

// =====================================================
// PRODUCTOS
// =====================================================

// Obtiene productos paginados.
export const getProducts = (
  page = 1,
  limit = 100
) => {
  return apiFetch(
    `/api/productos?page=${page}&limit=${limit}`
  );
};

// Obtiene un producto por su ID de backend.
export const getProductById = (
  productId
) => {
  return apiFetch(
    `/api/productos/${productId}`
  );
};

// Crea un producto nuevo.
export const createProduct = (
  productData
) => {
  return apiFetch("/api/productos", {
    method: "POST",
    body: JSON.stringify(productData),
  });
};

// Actualiza un producto existente.
export const updateProduct = (
  productId,
  productData
) => {
  return apiFetch(
    `/api/productos/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify(productData),
    }
  );
};

// Elimina un producto.
export const deleteProduct = (
  productId
) => {
  return apiFetch(
    `/api/productos/${productId}`,
    {
      method: "DELETE",
    }
  );
};

// =====================================================
// CARRITO
// =====================================================

// Obtiene el carrito del usuario autenticado.
export const getCart = () => {
  return apiFetch("/api/carrito");
};

// Actualiza todo el carrito.
export const updateCart = (cartData) => {
  return apiFetch("/api/carrito", {
    method: "PUT",
    body: JSON.stringify(cartData),
  });
};

// Vacía el carrito.
export const clearCart = () => {
  return apiFetch("/api/carrito", {
    method: "DELETE",
  });
};

// =====================================================
// COMPRAS
// =====================================================

// Obtiene el historial de compras.
export const getPurchases = () => {
  return apiFetch("/api/compras");
};

// Crea una compra nueva.
export const createPurchase = (
  purchaseData
) => {
  return apiFetch("/api/compras", {
    method: "POST",
    body: JSON.stringify(purchaseData),
  });
};

// =====================================================
// SESIÓN
// =====================================================

// Guarda el token y marca la sesión como activa.
export const saveSession = (token) => {
  saveToken(token);
  localStorage.setItem(
    "sesionActiva",
    "true"
  );
};

// Cierra la sesión local.
// No elimina al usuario de la API.
export const logout = () => {
  removeToken();
  localStorage.removeItem(
    "sesionActiva"
  );
  localStorage.removeItem(
    "currentUser"
  );
};

// Devuelve true si existe un token guardado.
export const isLoggedIn = () => {
  return Boolean(getToken());
};