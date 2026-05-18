import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import "./CheckoutPage.css";

import Navbar from "../components/Navbar/Navbar";
import InputField from "../components/InputField/InputField";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";

import mailIcon from "../assets/images/mail.png";
import ubicacionIcon from "../assets/images/ubicacion.png";
import nombreIcon from "../assets/images/nombre.png";
import telefonoIcon from "../assets/images/telefono.png";
import decoracionPerfil from "../assets/images/decoracionperfil.png";

function formatPrice(value) {
  const price = typeof value === "number" ? value : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
}

function CheckoutPage({ carrito = [], total = 0, vaciarCarrito }) {
  const navigate = useNavigate();

  const itemCount = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const fechaActual = new Date();

    const ultimoPedido = {
      codigo: "BH-2024-007",
      fecha: fechaActual.toLocaleDateString("es-UY", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      hora: fechaActual.toLocaleTimeString("es-UY", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      productos: carrito,
      total,
      datosEntrega: {
        nombre: data.nombre,
        email: data.email,
        direccion: data.direccion,
        telefono: data.telefono,
      },
    };

    localStorage.setItem("ultimoPedido", JSON.stringify(ultimoPedido));

    if (vaciarCarrito) {
      vaciarCarrito();
    }

    navigate("/confirmacion");
  };

  return (
    <>
      <Navbar activePage="carrito" />

      <main className="checkout-page">
        <section className="checkout-header">
          <h1>Checkout</h1>
          <p>Completá tus datos para confirmar la compra.</p>
        </section>

        <section className="checkout-layout">
          <form className="checkout-form-card" onSubmit={handleSubmit(onSubmit)}>
            <h2>Datos personales</h2>

            <InputField
              label="Nombre completo"
              type="text"
              placeholder="Ingresá tu nombre"
              icon={nombreIcon}
              register={register}
              nombre="nombre"
              reglas={{
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              }}
              error={errors.nombre}
            />

            <InputField
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              icon={mailIcon}
              register={register}
              nombre="email"
              reglas={{
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresá un correo válido",
                },
              }}
              error={errors.email}
            />

            <InputField
              label="Dirección de envío"
              type="text"
              placeholder="Calle, número, apartamento"
              icon={ubicacionIcon}
              register={register}
              nombre="direccion"
              reglas={{
                required: "La dirección es obligatoria",
                minLength: {
                  value: 5,
                  message: "Ingresá una dirección válida",
                },
              }}
              error={errors.direccion}
            />

            <InputField
              label="Teléfono"
              type="tel"
              placeholder="+598 99 123 456"
              icon={telefonoIcon}
              register={register}
              nombre="telefono"
              reglas={{
                required: "El teléfono es obligatorio",
                minLength: {
                  value: 8,
                  message: "Ingresá un teléfono válido",
                },
              }}
              error={errors.telefono}
            />

            <PrimaryButton type="submit">Confirmar compra</PrimaryButton>
          </form>

          <aside className="checkout-summary-card">
            <h2>Resumen</h2>

            <div className="checkout-summary-line"></div>

            <div className="checkout-summary-row">
              <span>Productos</span>
              <strong>{itemCount}</strong>
            </div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <div className="checkout-summary-row">
              <span>Envío</span>
              <strong>$0</strong>
            </div>

            <div className="checkout-summary-line"></div>

            <div className="checkout-summary-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <p>
              Al confirmar, se mostrará la pantalla de compra realizada. No se
              guardan datos reales.
            </p>

            <img src={decoracionPerfil} alt="" />
          </aside>
        </section>
      </main>
    </>
  );
}

export default CheckoutPage;