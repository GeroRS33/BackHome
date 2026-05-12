import "./Navbar.css";

import logo from "../../assets/images/Logo BackHome.svg";

function Navbar() {
  return (
    <header className="navbar">
      <a className="navbar-logo" href="/">
        <img src={logo} alt="BackHome retro living" />
      </a>

      <nav className="navbar-links">
        <a className="active" href="/">
          Inicio
        </a>
        <a href="/productos">Catálogo</a>
        <a href="/productos">Décadas</a>
        <a href="/perfil">Favoritos</a>
      </nav>
    </header>
  );
}

export default Navbar;