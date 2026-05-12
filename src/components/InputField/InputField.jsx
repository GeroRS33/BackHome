import "./InputField.css";

function InputField({ label, type = "text", placeholder, icon, rightIcon }) {
  return (
    <div className="input-field">
      <label>{label}</label>

      <div className="input-box">
        {icon && <img className="input-icon" src={icon} alt="" />}

        <input type={type} placeholder={placeholder} />

        {rightIcon && (
          <img className="input-right-icon" src={rightIcon} alt="" />
        )}
      </div>
    </div>
  );
}

export default InputField;