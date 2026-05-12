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

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-content">
        <div className="login-decoration">
          <img src={plantIcon} alt="" />
        </div>

        <div className="login-form-wrapper">
          <p className="login-eyebrow">Bienvenido de nuevo</p>

          <h1>Iniciar sesión</h1>

          <p className="login-description">
            Accede a tu cuenta para guardar favoritos, consultar disponibilidad
            y seguir explorando piezas retro.
          </p>

          <form className="login-form">
            <InputField
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              icon={mailIcon}
            />

            <InputField
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              icon={lockIcon}
              rightIcon={eyeIcon}
            />

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" defaultChecked />
                <span>Recordarme</span>
              </label>

              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <PrimaryButton type="submit">Iniciar sesión</PrimaryButton>

            <a className="auth-secondary-button" href="/registro">
              Crear cuenta
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
            <h3>Guarda tus piezas favoritas</h3>
            <p>Crea listas y vuelve a ellas cuando quieras.</p>
          </div>
        </article>

        <article>
          <div className="benefit-icon">
            <img src={boxIcon} alt="" />
          </div>
          <div>
            <h3>Consulta disponibilidad</h3>
            <p>Entérate de nuevas piezas al instante.</p>
          </div>
        </article>

        <article>
          <div className="benefit-icon">
            <img src={tagIcon} alt="" />
          </div>
          <div>
            <h3>Experiencia personalizada</h3>
            <p>Recomendaciones pensadas para ti.</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default LoginPage;