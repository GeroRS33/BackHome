import "./Navbar.css";
import logo from "../../assets/images/Logo BackHome.svg";

function Navbar({ activePage = "inicio" }) {
  return (
    <header className="navbar">
      <a className="navbar-logo" href="/home">
        <img src={logo} alt="BackHome" />
      </a>

      <nav className="navbar-links">
        <a className={activePage === "inicio" ? "active" : ""} href="/home">
          Inicio
        </a>

        <a
          className={activePage === "decadas" ? "active" : ""}
          href="/productos"
        >
          Décadas
        </a>

        <a
          className={activePage === "favoritos" ? "active" : ""}
          href="/favoritos"
        >
          Favoritos
        </a>

        <a className={activePage === "carrito" ? "active" : ""} href="/carrito">
          Carrito
        </a>

        <a className={activePage === "perfil" ? "active" : ""} href="/perfil">
          Perfil
        </a>
      </nav>
    </header>
  );
}

export default Navbar;