import { useState } from "react";

import "./ProfilePage.css";

import Navbar from "../components/Navbar/Navbar";
import ProfileInfoItem from "../components/ProfileInfoItem/ProfileInfoItem";
import OrderList from "../components/OrderList/OrderList";
import OrderDetail from "../components/OrderDetail/OrderDetail";

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
  {
    id: 4,
    code: "BH-2024-003",
    date: "5 de enero, 2024",
    status: "Completado",
    total: "$1.450.000",
    products: [
      {
        id: 31,
        name: "Sillón Space Age",
        category: "Sala",
        quantity: 1,
        price: "$890.000",
        image: sillonSpace,
      },
    ],
  },
  {
    id: 5,
    code: "BH-2023-012",
    date: "22 de diciembre, 2023",
    status: "Completado",
    total: "$560.000",
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
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0].id);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  return (
    <>
      <Navbar activePage="perfil" />

      <main className="profile-page">
        <section className="profile-card">
          <div className="profile-avatar">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80"
              alt="Foto de perfil"
            />
          </div>

          <div className="profile-info">
            <h1>Valentina Retro</h1>
            <p>Amante del diseño y lo vintage ✨</p>

            <div className="profile-info-list">
              <ProfileInfoItem icon={mailIcon} text="valentina@backhome.com" />
              <ProfileInfoItem icon={ubicacionIcon} text="Montevideo, Uruguay" />
              <ProfileInfoItem
                icon={calendarioIcon}
                text="Miembro desde mayo 2024"
              />
            </div>

            <button type="button" className="edit-profile-button">
              <img src={lapizIcon} alt="" />
              Editar perfil
            </button>
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