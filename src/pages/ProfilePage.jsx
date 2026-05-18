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

import sillonSpace from "../assets/images/sillonspace.png";
import lamparaHongo from "../assets/images/lamparahongo.png";
import plantaImg from "../assets/images/planta.png";

const orders = [
  {
    id: 1,
    code: "BH-2024-006",
    date: "12 de mayo, 2024",
    status: "Completado",
    total: "$1.210.000",
    products: [
      {
        id: 31,
        name: "Sillón Space Age",
        category: "Sala",
        quantity: 1,
        price: "$890.000",
        image: sillonSpace,
      },
      {
        id: 33,
        name: "Lámpara Hongo",
        category: "Iluminación",
        quantity: 1,
        price: "$320.000",
        image: lamparaHongo,
      },
      {
        id: 34,
        name: "Florero Cerámica",
        category: "Decoración",
        quantity: 1,
        price: "$150.000",
        image: plantaImg,
      },
    ],
  },
  {
    id: 2,
    code: "BH-2024-005",
    date: "2 de abril, 2024",
    status: "Completado",
    total: "$680.000",
    products: [
      {
        id: 35,
        name: "Mesa Ratona Orbital",
        category: "Sala",
        quantity: 1,
        price: "$680.000",
        image: sillonSpace,
      },
    ],
  },
  {
    id: 3,
    code: "BH-2024-004",
    date: "18 de febrero, 2024",
    status: "Completado",
    total: "$320.000",
    products: [
      {
        id: 33,
        name: "Lámpara Hongo",
        category: "Iluminación",
        quantity: 1,
        price: "$320.000",
        image: lamparaHongo,
      },
    ],
  },
];

function ProfilePage() {
  const navigate = useNavigate();

  const [selectedOrderId, setSelectedOrderId] = useState(orders[0].id);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Valentina Retro",
    bio: "Amante del diseño y lo vintage ✨",
    email: "valentina@backhome.com",
    location: "Montevideo, Uruguay",
    memberSince: "Miembro desde mayo 2024",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
  });

  const [formData, setFormData] = useState(profile);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setFormData((currentData) => ({
      ...currentData,
      avatar: imageUrl,
    }));
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
    setProfile(formData);
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
    navigate("/login");
  };

  return (
    <>
      <Navbar activePage="perfil" />

      <main className="profile-page">
        <section className="profile-card">
          <div className="profile-avatar">
            <img
              src={isEditing ? formData.avatar : profile.avatar}
              alt="Foto de perfil"
            />

            {isEditing && (
              <label className="change-avatar-button">
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