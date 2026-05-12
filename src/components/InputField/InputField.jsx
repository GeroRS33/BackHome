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
  return (
    <div className="input-field">
      <label>{label}</label>

      <div className="input-box">
        {icon && <img className="input-icon" src={icon} alt="" />}

        <input
          type={type}
          placeholder={placeholder}
          {...(register && nombre ? register(nombre, reglas) : {})}
        />

        {rightIcon && (
          <img className="input-right-icon" src={rightIcon} alt="" />
        )}
      </div>

      <p className="input-error">{error?.message || " "}</p>
    </div>
  );
}

export default InputField;