import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="coffee-icon">☕</span>
        <h2>The Daily Cup</h2>
      </div>

      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <a href="#cart" className="cart-button">
        🛒 Cart ({cartCount})
      </a>
    </nav>
  );
}

export default Navbar;