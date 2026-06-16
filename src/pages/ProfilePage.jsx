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
import { productos } from "../data/products";
import { getCurrentUser, updateCurrentUser, logout as logoutSession } from "../services/api";

function formatPrice(value) {
  const price = typeof value === "number" ? value : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
}

function getProductById(id) {
  return productos.find((product) => product.id === id);
}

function getOrderProduct(id, quantity = 1) {
  const product = getProductById(id);

  if (!product) {
    return null;
  }

  const price = product.price || product.precio || 0;

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    quantity,
    price: formatPrice(price),
    image: product.image,
  };
}

function getOrderTotal(products) {
  const total = products.reduce((acc, product) => {
    const originalProduct = getProductById(product.id);
    const price = originalProduct?.price || originalProduct?.precio || 0;

    return acc + price * product.quantity;
  }, 0);

  return formatPrice(total);
}

function getInitials(name) {
  if (!name) {
    return "BH";
  }

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getRealLastOrder() {
  const ultimoPedidoGuardado = localStorage.getItem("ultimoPedido");

  if (!ultimoPedidoGuardado) {
    return null;
  }

  const ultimoPedido = JSON.parse(ultimoPedidoGuardado);

  if (!ultimoPedido?.productos || ultimoPedido.productos.length === 0) {
    return null;
  }

  return {
    id: "ultimo-pedido",
    code: ultimoPedido.codigo || "BH-2026-ULTIMO",
    date: ultimoPedido.fecha || "Fecha no disponible",
    status: "Completado",
    total: formatPrice(ultimoPedido.total || 0),
    products: ultimoPedido.productos.map((product) => {
      const quantity = product.cantidad || 1;
      const price = product.price || product.precio || 0;

      return {
        id: product.id,
        name: product.name,
        category: product.category,
        quantity,
        price: formatPrice(price * quantity),
        image: product.image,
      };
    }),
  };
}

function mapApiUserToProfile(user) {
  return {
    name: user?.data?.nombre || user?.data?.name || "",
    bio: user?.data?.bio || "Agregá una descripción sobre vos.",
    email: user?.email || "",
    location: user?.data?.location || "Montevideo, Uruguay",
    memberSince: user?.data?.memberSince || "Miembro desde hoy",
    avatar: user?.data?.avatar || "",
  };
}

function getDefaultProfile() {
  return {
    name: "",
    bio: "Agregá una descripción sobre vos.",
    email: "",
    location: "Montevideo, Uruguay",
    memberSince: "Miembro desde hoy",
    avatar: "",
  };
}

const orderOneProducts = [
  getOrderProduct(21, 1),
  getOrderProduct(22, 1),
  getOrderProduct(24, 1),
].filter(Boolean);

const orderTwoProducts = [
  getOrderProduct(11, 1),
  getOrderProduct(14, 1),
  getOrderProduct(16, 1),
].filter(Boolean);

const orderThreeProducts = [
  getOrderProduct(41, 1),
  getOrderProduct(44, 1),
  getOrderProduct(45, 1),
].filter(Boolean);

const orderFourProducts = [
  getOrderProduct(23, 1),
  getOrderProduct(25, 1),
  getOrderProduct(26, 1),
].filter(Boolean);

const orderFiveProducts = [
  getOrderProduct(52, 1),
  getOrderProduct(54, 1),
  getOrderProduct(55, 1),
].filter(Boolean);

const hardcodedOrders = [
  {
    id: 1,
    code: "BH-2026-003",
    date: "15 de mayo, 2026",
    status: "Completado",
    total: getOrderTotal(orderOneProducts),
    products: orderOneProducts,
  },
  {
    id: 2,
    code: "BH-2026-002",
    date: "12 de mayo, 2026",
    status: "Completado",
    total: getOrderTotal(orderTwoProducts),
    products: orderTwoProducts,
  },
  {
    id: 3,
    code: "BH-2026-001",
    date: "5 de mayo, 2026",
    status: "Completado",
    total: getOrderTotal(orderThreeProducts),
    products: orderThreeProducts,
  },
  {
    id: 4,
    code: "BH-2026-000",
    date: "3 de mayo, 2026",
    status: "Completado",
    total: getOrderTotal(orderFourProducts),
    products: orderFourProducts,
  },
  {
    id: 5,
    code: "BH-2025-009",
    date: "1 de mayo, 2026",
    status: "Completado",
    total: getOrderTotal(orderFiveProducts),
    products: orderFiveProducts,
  },
];

function ProfilePage() {
  const navigate = useNavigate();

  const realLastOrder = getRealLastOrder();
  const profileOrders = realLastOrder
    ? [realLastOrder, ...hardcodedOrders]
    : hardcodedOrders;

  const [selectedOrderId, setSelectedOrderId] = useState(profileOrders[0].id);
  const [isEditing, setIsEditing] = useState(false);
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(3);
  const [profile, setProfile] = useState(getDefaultProfile);
  const [formData, setFormData] = useState(getDefaultProfile);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getCurrentUser();
        const apiProfile = mapApiUserToProfile(user);

        setProfile(apiProfile);
        setFormData(apiProfile);
        localStorage.setItem("currentUser", JSON.stringify(apiProfile));
      } catch (error) {
        console.log(error.message);
        logoutSession();
        navigate("/login");
      } finally {
        setIsLoadingProfile(false);
      }
    }

    loadProfile();
  }, [navigate]);

  const selectedOrder = profileOrders.find(
    (order) => order.id === selectedOrderId
  );

  const visibleOrders = profileOrders.slice(0, visibleOrdersCount);
  const hasMoreOrders = visibleOrdersCount < profileOrders.length;
  const canShowLessOrders = visibleOrdersCount > 3;

  const handleShowMoreOrders = () => {
    setVisibleOrdersCount((currentCount) =>
      Math.min(currentCount + 2, profileOrders.length)
    );
  };

  const handleShowLessOrders = () => {
    setVisibleOrdersCount(3);

    if (
      !profileOrders
        .slice(0, 3)
        .some((order) => order.id === selectedOrderId)
    ) {
      setSelectedOrderId(profileOrders[0].id);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

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

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const updatedProfile = {
        ...profile,
        ...formData,
      };

      await updateCurrentUser({
        data: {
          nombre: updatedProfile.name,
          bio: updatedProfile.bio,
          location: updatedProfile.location,
          memberSince: updatedProfile.memberSince,
          avatar: updatedProfile.avatar,
        },
      });

      setProfile(updatedProfile);
      localStorage.setItem("currentUser", JSON.stringify(updatedProfile));

      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
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
              <p>Estamos trayendo tus datos desde BackHome.</p>
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
            className={isEditing ? "profile-avatar editing" : "profile-avatar"}
          >
            {isEditing ? (
              formData.avatar ? (
                <img src={formData.avatar} alt="Foto de perfil" />
              ) : (
                <div className="profile-avatar-placeholder">
                  {getInitials(formData.name)}
                </div>
              )
            ) : profile.avatar ? (
              <img src={profile.avatar} alt="Foto de perfil" />
            ) : (
              <div className="profile-avatar-placeholder">
                {getInitials(profile.name)}
              </div>
            )}

            {isEditing && (
              <label className="change-avatar-overlay">
                <img src={cambiarImagenIcon} alt="" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </div>

          <div className="profile-info">
            {!isEditing ? (
              <>
                <h1>{profile.name}</h1>
                <p>{profile.bio}</p>

                <div className="profile-info-list">
                  <ProfileInfoItem icon={mailIcon} text={profile.email} />
                  <ProfileInfoItem
                    icon={ubicacionIcon}
                    text={profile.location}
                  />
                  <ProfileInfoItem
                    icon={calendarioIcon}
                    text={profile.memberSince}
                  />
                </div>

                <div className="profile-actions">
                  <button
                    type="button"
                    className="edit-profile-button"
                    onClick={handleEdit}
                  >
                    <img src={lapizIcon} alt="" />
                    Editar perfil
                  </button>

                  <button
                    type="button"
                    className="logout-profile-button"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <form className="profile-edit-form" onSubmit={handleSave}>
                <label>
                  Nombre
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Descripción
                  <input
                    type="text"
                    name="bio"
                    placeholder="Contá algo sobre vos"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                  />
                </label>

                <label>
                  Ubicación
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </label>

                <div className="profile-edit-actions">
                  <button type="submit" className="save-profile-button">
                    Guardar cambios
                  </button>

                  <button
                    type="button"
                    className="cancel-profile-button"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>

          <img className="profile-decoration" src={decoracionPerfil} alt="" />
        </section>

        <section className="profile-orders-section">
          <div className="profile-section-title">
            <h2>Mis compras</h2>
            <p>Revisa el historial de tus compras y detalles.</p>
          </div>

          <div className="profile-orders-layout">
            <OrderList
              orders={visibleOrders}
              selectedOrderId={selectedOrderId}
              onSelectOrder={setSelectedOrderId}
              hasMoreOrders={hasMoreOrders}
              canShowLessOrders={canShowLessOrders}
              onShowMoreOrders={handleShowMoreOrders}
              onShowLessOrders={handleShowLessOrders}
            />

            <OrderDetail order={selectedOrder} />
          </div>
        </section>
      </main>
    </>
  );
}

export default ProfilePage;