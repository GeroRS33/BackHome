import { useState } from "react";
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
    price: `$${new Intl.NumberFormat("es-UY").format(price)}`,
    image: product.image,
  };
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

const orders = [
  {
    id: 1,
    code: "BH-2024-006",
    date: "12 de mayo, 2024",
    status: "Completado",
    total: "$125.500",
    products: [
      getOrderProduct(31, 1),
      getOrderProduct(32, 1),
      getOrderProduct(34, 1),
    ].filter(Boolean),
  },
  {
    id: 2,
    code: "BH-2024-005",
    date: "2 de abril, 2024",
    status: "Completado",
    total: "$119.400",
    products: [
      getOrderProduct(21, 1),
      getOrderProduct(24, 1),
      getOrderProduct(26, 1),
    ].filter(Boolean),
  },
  {
    id: 3,
    code: "BH-2024-004",
    date: "18 de febrero, 2024",
    status: "Completado",
    total: "$87.200",
    products: [
      getOrderProduct(51, 1),
      getOrderProduct(54, 1),
      getOrderProduct(55, 1),
    ].filter(Boolean),
  },
];

function getStoredProfile() {
  const currentUser = localStorage.getItem("currentUser");
  const backhomeUser = localStorage.getItem("backhomeUser");

  if (currentUser) {
    return JSON.parse(currentUser);
  }

  if (backhomeUser) {
    return JSON.parse(backhomeUser);
  }
  return {
    name: "",
    bio: "Agregá una descripción sobre vos.",
    email: "",
    location: "Montevideo, Uruguay",
    memberSince: "Miembro desde hoy",
    avatar: "",
  };
}

function ProfilePage() {
  const navigate = useNavigate();

  const [selectedOrderId, setSelectedOrderId] = useState(orders[0].id);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(() => getStoredProfile());
  const [formData, setFormData] = useState(() => getStoredProfile());

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

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

  const handleSave = (event) => {
    event.preventDefault();

    const updatedProfile = {
      ...profile,
      ...formData,
    };

    setProfile(updatedProfile);
    localStorage.setItem("currentUser", JSON.stringify(updatedProfile));
    localStorage.setItem("backhomeUser", JSON.stringify(updatedProfile));

    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("currentUser");

    navigate("/login");
  };

  return (
    <>
      <Navbar activePage="perfil" />

      <main className="profile-page">
        <section className="profile-card">
          <div className={isEditing ? "profile-avatar editing" : "profile-avatar"}>
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
                    onChange={handleChange}
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
              orders={orders}
              selectedOrderId={selectedOrderId}
              onSelectOrder={setSelectedOrderId}
            />

            <OrderDetail order={selectedOrder} />
          </div>
        </section>
      </main>
    </>
  );
}

export default ProfilePage;