import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="coffee-icon">☕</span>
        <h2>The Daily Cup</h2>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/staff-dashboard">Staff Dashboard</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <Link to="/cart" className="cart-button">
        🛒 Cart ({cartCount})
      </Link>
    </nav>
  );
}

export default Navbar;