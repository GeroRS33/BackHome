import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import "./LoginPage.css";

import InputField from "../components/InputField/InputField";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";

import fondo from "../assets/images/fondo.png";
import mailIcon from "../assets/images/mail.png";
import lockIcon from "../assets/images/candado.png";
import eyeIcon from "../assets/images/vercontrasena.png";
import heartIcon from "../assets/images/corazon.png";
import boxIcon from "../assets/images/disponibilidad.png";
import tagIcon from "../assets/images/etiqueta.png";
import plantIcon from "../assets/images/iconoplanta.png";

function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const crearCuenta = (datos) => {
    console.log("Datos de registro:", datos);

    // Registro simulado
    navigate("/login");
  };

  return (
    <main className="login-page">
      <section className="login-content">
        <div className="login-decoration">
          <img src={plantIcon} alt="" />
        </div>

        <div className="login-form-wrapper">
          <p className="login-eyebrow">Únete a BackHome</p>

          <h1>Crear cuenta</h1>

          <p className="login-description">
            Crea tu cuenta para guardar favoritos, armar tu carrito y descubrir
            piezas retro seleccionadas para tu hogar.
          </p>

          <form className="login-form" onSubmit={handleSubmit(crearCuenta)}>
            <InputField
              label="Nombre completo"
              type="text"
              placeholder="Ingresa tu nombre"
              icon={heartIcon}
              nombre="nombre"
              register={register}
              error={errors.nombre}
              reglas={{
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
              }}
            />

            <InputField
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              icon={mailIcon}
              nombre="email"
              register={register}
              error={errors.email}
              reglas={{
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Ingresá un correo válido",
                },
              }}
            />

            <InputField
              label="Contraseña"
              type="password"
              placeholder="Crea una contraseña"
              icon={lockIcon}
              rightIcon={eyeIcon}
              nombre="password"
              register={register}
              error={errors.password}
              reglas={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              }}
            />

            <InputField
              label="Confirmar contraseña"
              type="password"
              placeholder="Repite tu contraseña"
              icon={lockIcon}
              rightIcon={eyeIcon}
              nombre="confirmarPassword"
              register={register}
              error={errors.confirmarPassword}
              reglas={{
                required: "Debes confirmar la contraseña",
                validate: (valor) =>
                  valor === password || "Las contraseñas no coinciden",
              }}
            />

            <PrimaryButton type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </PrimaryButton>

            <a className="auth-secondary-button" href="/login">
              Ya tengo cuenta
            </a>
          </form>
        </div>
      </section>

      <section className="login-image">
        <img src={fondo} alt="Living retro con sillón y muebles vintage" />
      </section>

      <section className="login-benefits">
        <article>
          <div className="benefit-icon">
            <img src={heartIcon} alt="" />
          </div>
          <div>
            <h3>Favoritos siempre guardados</h3>
            <p>Volvé fácilmente a las piezas que más te gustaron.</p>
          </div>
        </article>

        <article>
          <div className="benefit-icon">
            <img src={boxIcon} alt="" />
          </div>
          <div>
            <h3>Compras más simples</h3>
            <p>Agregá productos y continuá tu experiencia cuando quieras.</p>
          </div>
        </article>

        <article>
          <div className="benefit-icon">
            <img src={tagIcon} alt="" />
          </div>
          <div>
            <h3>Selección personalizada</h3>
            <p>Explorá objetos retro pensados para tu estilo.</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default RegisterPage;