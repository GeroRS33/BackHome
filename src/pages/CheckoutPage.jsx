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

import { createPurchase } from "../services/api";

function formatPrice(value) {
  const price =
    typeof value === "number"
      ? value
      : Number(value) || 0;

  return `$${new Intl.NumberFormat("es-UY").format(price)}`;
}

function mapCartToPurchaseItems(carrito) {
  return carrito.map((product) => ({
    productoId: String(product.id),

    cantidad:
      Number(product.cantidad) || 1,

    data: {
      nombre:
        product.name ||
        product.nombre ||
        "Producto",

      precio: Number(
        product.price ||
          product.precio ||
          0
      ),

      imagen:
        product.image ||
        product.imagen ||
        "",

      categoria:
        product.category ||
        product.categoria ||
        "",

      material:
        product.material || "",

      decada: Number(
        product.decade ||
          product.decada ||
          0
      ),

      slug:
        product.slug || "",

      descripcion:
        product.description ||
        product.descripcion ||
        "",
    },
  }));
}

function createOrderCode(purchaseId) {
  const year = new Date().getFullYear();

  if (purchaseId) {
    const shortId = String(purchaseId)
      .slice(-6)
      .toUpperCase();

    return `BH-${year}-${shortId}`;
  }

  return `BH-${year}-${Date.now()
    .toString()
    .slice(-6)}`;
}

function CheckoutPage({
  carrito = [],
  total = 0,
  vaciarCarrito,
}) {
  const navigate = useNavigate();

  const itemCount = carrito.reduce(
    (acc, item) =>
      acc + (Number(item.cantidad) || 1),
    0
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm();

  const onSubmit = async (data) => {
    if (carrito.length === 0) {
      setError("root", {
        type: "manual",
        message:
          "Tu carrito está vacío. Agregá productos antes de confirmar.",
      });

      return;
    }

    try {
      const fechaActual = new Date();

      const purchaseData = {
        items: mapCartToPurchaseItems(
          carrito
        ),

        total: Number(total),

        datosCheckout: {
          nombre: data.nombre,
          email: data.email,
          direccion: data.direccion,
          telefono: data.telefono,
        },

        data: {
          estado: "Completado",
          metodoEnvio: "Envío estándar",
          comentario: "",
        },
      };

      const purchaseResponse =
        await createPurchase(
          purchaseData
        );

      const purchase =
        purchaseResponse?.compra ||
        purchaseResponse?.purchase ||
        purchaseResponse?.data ||
        purchaseResponse;

      const purchaseId =
        purchase?.id ||
        purchase?._id ||
        purchaseResponse?.id ||
        purchaseResponse?._id ||
        null;

      const ultimoPedido = {
        id: purchaseId,

        codigo:
          createOrderCode(
            purchaseId
          ),

        fechaISO:
          fechaActual.toISOString(),

        fecha:
          fechaActual.toLocaleDateString(
            "es-UY",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          ),

        hora:
          fechaActual.toLocaleTimeString(
            "es-UY",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),

        productos: carrito,

        total: Number(total),

        datosEntrega: {
          nombre: data.nombre,
          email: data.email,
          direccion:
            data.direccion,
          telefono:
            data.telefono,
        },
      };

      if (vaciarCarrito) {
        await vaciarCarrito();
      }

      navigate("/confirmacion", {
        state: {
          pedido: ultimoPedido,
        },
      });
    } catch (error) {
      console.error(
        "Error confirmando compra:",
        error
      );

      setError("root", {
        type: "manual",
        message:
          error.message ||
          "No se pudo confirmar la compra.",
      });
    }
  };

  return (
    <>
      <Navbar activePage="carrito" />

      <main className="checkout-page">
        <section className="checkout-header">
          <h1>Checkout</h1>

          <p>
            Completá tus datos para confirmar
            la compra.
          </p>
        </section>

        <section className="checkout-layout">
          <form
            className="checkout-form-card"
            onSubmit={handleSubmit(
              onSubmit
            )}
          >
            <h2>Datos personales</h2>

            <InputField
              label="Nombre completo"
              type="text"
              placeholder="Ingresá tu nombre"
              icon={nombreIcon}
              register={register}
              nombre="nombre"
              reglas={{
                required:
                  "El nombre es obligatorio",

                minLength: {
                  value: 3,
                  message:
                    "Debe tener al menos 3 caracteres",
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
                required:
                  "El correo es obligatorio",

                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                  message:
                    "Ingresá un correo válido",
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
                required:
                  "La dirección es obligatoria",

                minLength: {
                  value: 5,
                  message:
                    "Ingresá una dirección válida",
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
                required:
                  "El teléfono es obligatorio",

                minLength: {
                  value: 8,
                  message:
                    "Ingresá un teléfono válido",
                },
              }}
              error={errors.telefono}
            />

            {errors.root && (
              <p className="input-error">
                {errors.root.message}
              </p>
            )}

            <PrimaryButton
              type="submit"
              disabled={
                isSubmitting ||
                carrito.length === 0
              }
            >
              {isSubmitting
                ? "Confirmando compra..."
                : "Confirmar compra"}
            </PrimaryButton>
          </form>

          <aside className="checkout-summary-card">
            <h2>Resumen</h2>

            <div className="checkout-summary-line" />

            <div className="checkout-summary-row">
              <span>Productos</span>
              <strong>
                {itemCount}
              </strong>
            </div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>

              <strong>
                {formatPrice(total)}
              </strong>
            </div>

            <div className="checkout-summary-row">
              <span>Envío</span>
              <strong>$0</strong>
            </div>

            <div className="checkout-summary-line" />

            <div className="checkout-summary-total">
              <span>Total</span>

              <strong>
                {formatPrice(total)}
              </strong>
            </div>

            <p>
              Al confirmar, la compra quedará
              guardada en tu cuenta.
            </p>

            <img
              src={decoracionPerfil}
              alt=""
            />
          </aside>
        </section>
      </main>
    </>
  );
}

export default CheckoutPage;