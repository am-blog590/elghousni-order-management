import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🫒</span>
          Coopérative Elghousni
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
              Tableau de Bord
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className={`nav-link ${isActive("/orders") ? "active" : ""}`}>
              Commandes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className={`nav-link ${isActive("/products") ? "active" : ""}`}>
              Produits
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
