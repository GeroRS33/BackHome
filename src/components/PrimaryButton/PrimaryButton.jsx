import "./PrimaryButton.css";

function PrimaryButton({ children, type = "button", onClick, disabled }) {
  return (
    <button
      className="primary-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;