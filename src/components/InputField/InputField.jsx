import { useState } from "react";
import "./InputField.css";

function InputField({
  label,
  type = "text",
  placeholder,
  icon,
  rightIcon,
  register,
  nombre,
  reglas,
  error,
}) {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const esCampoPassword = type === "password";

  const cambiarVisibilidad = () => {
    if (esCampoPassword) {
      setMostrarPassword((valorActual) => !valorActual);
    }
  };

  const manejarTeclado = (event) => {
    if (
      esCampoPassword &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      cambiarVisibilidad();
    }
  };

  return (
    <div className="input-field">
      <label>{label}</label>

      <div className="input-box">
        {icon && <img className="input-icon" src={icon} alt="" />}

        <input
          type={
            esCampoPassword && mostrarPassword
              ? "text"
              : type
          }
          placeholder={placeholder}
          {...(register && nombre ? register(nombre, reglas) : {})}
        />

        {rightIcon && (
          <img
            className="input-right-icon"
            src={rightIcon}
            alt={
              mostrarPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
            role={esCampoPassword ? "button" : undefined}
            tabIndex={esCampoPassword ? 0 : undefined}
            onClick={cambiarVisibilidad}
            onKeyDown={manejarTeclado}
          />
        )}
      </div>

      <p className="input-error">{error?.message || " "}</p>
    </div>
  );
}

export default InputField;