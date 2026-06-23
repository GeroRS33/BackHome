import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./ProfilePage.css";

import Navbar from "../components/Navbar/Navbar";
import ProfileInfoItem from "../components/ProfileInfoItem/ProfileInfoItem";
import OrderList from "../components/OrderList/OrderList";
import OrderDetail from "../components/OrderDetail/OrderDetail";

import cambiarImagenIcon from "../assets/images/cambiarimagen.png";
import mailIcon from "../assets/images/mail.png";
import ubicacionIcon from "../assets/images/ubicacion.png";
import calendarioIcon from "../assets/images/calendario.png";
import lapizIcon from "../assets/images/lapiz.png";
import decoracionPerfil from "../assets/images/decoracionperfil.png";

import { productos as productosLocales } from "../data/products";

import {
  getCurrentUser,
  updateCurrentUser,
  getPurchases,
  logout as logoutSession,
} from "../services/api";

function formatPrice(value) {
  const price =
    typeof value === "number"
      ? value
      : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
}

function formatOrderDate(value) {
  if (!value) {
    return "Fecha no disponible";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  return date.toLocaleDateString("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function createOrderCode(order) {
  const year = order?.createdAt
    ? new Date(order.createdAt).getFullYear()
    : new Date().getFullYear();

  const shortId = String(order?.id || "")
    .slice(-6)
    .toUpperCase();

  return shortId
    ? `BH-${year}-${shortId}`
    : `BH-${year}-PEDIDO`;
}

function getInitials(name) {
  if (!name) {
    return "BH";
  }

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStoredUser() {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    return null;
  }

  try {
    return JSON.parse(currentUser);
  } catch {
    return null;
  }
}

function getDefaultProfile() {
  const storedUser = getStoredUser();

  return {
    name: storedUser?.name || "",
    bio:
      storedUser?.bio ||
      "Agregá una descripción sobre vos.",
    email: storedUser?.email || "",
    location:
      storedUser?.location ||
      "Montevideo, Uruguay",
    memberSince:
      storedUser?.memberSince ||
      "Miembro desde hoy",
    avatar: storedUser?.avatar || "",
  };
}

function parsePossibleJson(value) {
  if (typeof value !== "string") {
    return value || {};
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function mapApiUserToProfile(response) {
  const storedUser = getStoredUser();

  const rootUser =
    response?.usuario ||
    response?.user ||
    response?.data?.usuario ||
    response?.data?.user ||
    response?.data ||
    response ||
    {};

  const parsedRootUser = parsePossibleJson(rootUser);

  const rawUserData =
    parsedRootUser?.data ||
    parsedRootUser?.datos ||
    parsedRootUser?.perfil ||
    response?.datos ||
    {};

  const userData = parsePossibleJson(rawUserData);

  return {
    name:
      userData?.nombre ||
      userData?.name ||
      parsedRootUser?.nombre ||
      parsedRootUser?.name ||
      response?.nombre ||
      response?.name ||
      storedUser?.name ||
      "",

    bio:
      userData?.bio ||
      userData?.descripcion ||
      parsedRootUser?.bio ||
      storedUser?.bio ||
      "Agregá una descripción sobre vos.",

    email:
      parsedRootUser?.email ||
      userData?.email ||
      response?.email ||
      storedUser?.email ||
      "",

    location:
      userData?.location ||
      userData?.ubicacion ||
      parsedRootUser?.location ||
      parsedRootUser?.ubicacion ||
      storedUser?.location ||
      "Montevideo, Uruguay",

    memberSince:
      userData?.memberSince ||
      userData?.miembroDesde ||
      parsedRootUser?.memberSince ||
      storedUser?.memberSince ||
      "Miembro desde hoy",

    avatar:
      userData?.avatar ||
      userData?.imagen ||
      parsedRootUser?.avatar ||
      storedUser?.avatar ||
      "",
  };
}

function getLocalProduct(itemData) {
  const idBH = Number(itemData?.idBH);

  if (idBH) {
    const byId = productosLocales.find(
      (product) => Number(product.id) === idBH
    );

    if (byId) {
      return byId;
    }
  }

  const normalizedName = String(
    itemData?.nombre || ""
  )
    .trim()
    .toLowerCase();

  return productosLocales.find(
    (product) =>
      product.name.trim().toLowerCase() ===
      normalizedName
  );
}

function mapPurchaseProduct(item) {
  const data = item?.data || {};
  const localProduct = getLocalProduct(data);

  const quantity = Number(item?.cantidad) || 1;
  const unitPrice = Number(data?.precio) || 0;

  return {
    id:
      item?.productoId ||
      item?._id ||
      localProduct?.id,

    name:
      data?.nombre ||
      localProduct?.name ||
      "Producto",

    category:
      data?.categoria ||
      localProduct?.category ||
      "",

    quantity,

    price: formatPrice(
      Number(item?.subtotal) ||
        unitPrice * quantity
    ),

    image:
      data?.imagen ||
      localProduct?.image ||
      "",
  };
}

function mapPurchaseToOrder(purchase) {
  const purchaseItems = Array.isArray(
    purchase?.items
  )
    ? purchase.items
    : [];

  return {
    id: purchase.id,

    code: createOrderCode(purchase),

    date: formatOrderDate(
      purchase.createdAt
    ),

    status:
      purchase?.data?.estado ||
      purchase?.estado ||
      "Completado",

    total: formatPrice(
      purchase?.total || 0
    ),

    products: purchaseItems.map(
      mapPurchaseProduct
    ),

    deliveryData:
      purchase?.datosCheckout || {},
  };
}

function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(
    getDefaultProfile
  );

  const [formData, setFormData] = useState(
    getDefaultProfile
  );

  const [orders, setOrders] = useState([]);

  const [selectedOrderId, setSelectedOrderId] =
    useState(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [visibleOrdersCount, setVisibleOrdersCount] =
    useState(3);

  const [isLoadingProfile, setIsLoadingProfile] =
    useState(true);

  const [isLoadingOrders, setIsLoadingOrders] =
    useState(true);

  const [isSavingProfile, setIsSavingProfile] =
    useState(false);

  const [profileError, setProfileError] =
    useState("");

  const [ordersError, setOrdersError] =
    useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setProfileError("");

        const response =
          await getCurrentUser();

        const apiProfile =
          mapApiUserToProfile(response);

        setProfile(apiProfile);
        setFormData(apiProfile);

        localStorage.setItem(
          "currentUser",
          JSON.stringify(apiProfile)
        );
      } catch (error) {
        console.error(
          "Error cargando perfil:",
          error
        );

        setProfileError(
          error.message ||
            "No se pudo cargar el perfil."
        );

        const message =
          error.message?.toLowerCase() || "";

        if (
          message.includes("token") ||
          message.includes("autoriz") ||
          message.includes("unauthorized")
        ) {
          logoutSession();
          navigate("/login");
        }
      } finally {
        setIsLoadingProfile(false);
      }
    }

    loadProfile();
  }, [navigate]);

  useEffect(() => {
    async function loadPurchases() {
      try {
        setOrdersError("");
        setIsLoadingOrders(true);

        const response =
          await getPurchases();

        const apiOrders = (
          response?.items || []
        )
          .map(mapPurchaseToOrder)
          .sort((a, b) => {
            const orderA =
              response.items.find(
                (item) => item.id === a.id
              );

            const orderB =
              response.items.find(
                (item) => item.id === b.id
              );

            return (
              new Date(orderB?.createdAt || 0) -
              new Date(orderA?.createdAt || 0)
            );
          });

        setOrders(apiOrders);

        if (apiOrders.length > 0) {
          setSelectedOrderId(
            apiOrders[0].id
          );
        }
      } catch (error) {
        console.error(
          "Error cargando compras:",
          error
        );

        setOrdersError(
          error.message ||
            "No se pudieron cargar las compras."
        );
      } finally {
        setIsLoadingOrders(false);
      }
    }

    loadPurchases();
  }, []);

  const selectedOrder = orders.find(
    (order) =>
      order.id === selectedOrderId
  );

  const visibleOrders = orders.slice(
    0,
    visibleOrdersCount
  );

  const hasMoreOrders =
    visibleOrdersCount < orders.length;

  const canShowLessOrders =
    visibleOrdersCount > 3;

  const handleShowMoreOrders = () => {
    setVisibleOrdersCount(
      (currentCount) =>
        Math.min(
          currentCount + 2,
          orders.length
        )
    );
  };

  const handleShowLessOrders = () => {
    setVisibleOrdersCount(3);

    const selectedOrderIsVisible = orders
      .slice(0, 3)
      .some(
        (order) =>
          order.id === selectedOrderId
      );

    if (!selectedOrderIsVisible) {
      setSelectedOrderId(
        orders[0]?.id || null
      );
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((currentData) => ({
        ...currentData,
        avatar: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      setIsSavingProfile(true);
      setProfileError("");

      const updatedProfile = {
        ...profile,
        ...formData,
      };

      await updateCurrentUser({
        data: {
          nombre: updatedProfile.name,
          bio: updatedProfile.bio,
          location:
            updatedProfile.location,
          memberSince:
            updatedProfile.memberSince,
          avatar: updatedProfile.avatar,
        },
      });

      setProfile(updatedProfile);
      setFormData(updatedProfile);

      localStorage.setItem(
        "currentUser",
        JSON.stringify(updatedProfile)
      );

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Error guardando perfil:",
        error
      );

      setProfileError(
        error.message ||
          "No se pudo actualizar el perfil."
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleLogout = () => {
    logoutSession();
    navigate("/login");
  };

  if (isLoadingProfile) {
    return (
      <>
        <Navbar activePage="perfil" />

        <main className="profile-page">
          <section className="profile-card">
            <div className="profile-info">
              <h1>Cargando perfil...</h1>
              <p>
                Estamos trayendo tus datos
                desde BackHome.
              </p>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar activePage="perfil" />

      <main className="profile-page">
        <section className="profile-card">
          <div
            className={
              isEditing
                ? "profile-avatar editing"
                : "profile-avatar"
            }
          >
            {isEditing ? (
              formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Foto de perfil"
                />
              ) : (
                <div className="profile-avatar-placeholder">
                  {getInitials(
                    formData.name
                  )}
                </div>
              )
            ) : profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Foto de perfil"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                {getInitials(
                  profile.name
                )}
              </div>
            )}

            {isEditing && (
              <label className="change-avatar-overlay">
                <img
                  src={cambiarImagenIcon}
                  alt=""
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleAvatarChange
                  }
                />
              </label>
            )}
          </div>

          <div className="profile-info">
            {profileError && (
              <p className="profile-error">
                {profileError}
              </p>
            )}

            {!isEditing ? (
              <>
                <h1>
                  {profile.name ||
                    "Usuario BackHome"}
                </h1>

                <p>{profile.bio}</p>

                <div className="profile-info-list">
                  <ProfileInfoItem
                    icon={mailIcon}
                    text={
                      profile.email ||
                      "Email no disponible"
                    }
                  />

                  <ProfileInfoItem
                    icon={ubicacionIcon}
                    text={profile.location}
                  />

                  <ProfileInfoItem
                    icon={calendarioIcon}
                    text={
                      profile.memberSince
                    }
                  />
                </div>

                <div className="profile-actions">
                  <button
                    type="button"
                    className="edit-profile-button"
                    onClick={handleEdit}
                  >
                    <img
                      src={lapizIcon}
                      alt=""
                    />
                    Editar perfil
                  </button>

                  <button
                    type="button"
                    className="logout-profile-button"
                    onClick={
                      handleLogout
                    }
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <form
                className="profile-edit-form"
                onSubmit={handleSave}
              >
                <label>
                  Nombre
                  <input
                    type="text"
                    name="name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </label>

                <label>
                  Descripción
                  <input
                    type="text"
                    name="bio"
                    placeholder="Contá algo sobre vos"
                    value={
                      formData.bio
                    }
                    onChange={
                      handleChange
                    }
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={
                      formData.email
                    }
                    readOnly
                  />
                </label>

                <label>
                  Ubicación
                  <input
                    type="text"
                    name="location"
                    value={
                      formData.location
                    }
                    onChange={
                      handleChange
                    }
                  />
                </label>

                <div className="profile-edit-actions">
                  <button
                    type="submit"
                    className="save-profile-button"
                    disabled={
                      isSavingProfile
                    }
                  >
                    {isSavingProfile
                      ? "Guardando..."
                      : "Guardar cambios"}
                  </button>

                  <button
                    type="button"
                    className="cancel-profile-button"
                    onClick={
                      handleCancel
                    }
                    disabled={
                      isSavingProfile
                    }
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>

          <img
            className="profile-decoration"
            src={decoracionPerfil}
            alt=""
          />
        </section>

        <section className="profile-orders-section">
          <div className="profile-section-title">
            <h2>Mis compras</h2>
            <p>
              Revisa el historial de tus compras
              y detalles.
            </p>
          </div>

          {isLoadingOrders ? (
            <p>Cargando compras...</p>
          ) : ordersError ? (
            <p className="profile-error">
              {ordersError}
            </p>
          ) : orders.length === 0 ? (
            <p>
              Todavía no realizaste ninguna
              compra.
            </p>
          ) : (
            <div className="profile-orders-layout">
              <OrderList
                orders={visibleOrders}
                selectedOrderId={
                  selectedOrderId
                }
                onSelectOrder={
                  setSelectedOrderId
                }
                hasMoreOrders={
                  hasMoreOrders
                }
                canShowLessOrders={
                  canShowLessOrders
                }
                onShowMoreOrders={
                  handleShowMoreOrders
                }
                onShowLessOrders={
                  handleShowLessOrders
                }
              />

              <OrderDetail
                order={selectedOrder}
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default ProfilePage;