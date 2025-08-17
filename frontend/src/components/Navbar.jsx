import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";
import "../styles/Navbar.css";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMenu(null);
  }, [location]);

  return (
    <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <img src={logo} alt="ABACUS Logo" className="logo" />
          <span className="event-year">ABACUS 2025</span>
        </Link>

        <button 
          className="mobile-menu-button" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Navigation menu"
        >
          <span className="hamburger">
            <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
            <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
            <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
          </span>
        </button>

        <div className={`nav-links ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
          <div className="dropdown">
            <button 
              className={`nav-button ${openMenu === "events" ? "active" : ""}`}
              onClick={() => toggleMenu("events")}
              aria-expanded={openMenu === "events"}
            >
              Events <span className="dropdown-arrow">▼</span>
            </button>
            {openMenu === "events" && (
              <div className="dropdown-content">
                <Link to="/events/upcoming" className="dropdown-item">Upcoming Events</Link>
                <Link to="/events/past" className="dropdown-item">Past Events</Link>
                <Link to="/events/workshops" className="dropdown-item">Workshops</Link>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button 
              className={`nav-button ${openMenu === "about" ? "active" : ""}`}
              onClick={() => toggleMenu("about")}
              aria-expanded={openMenu === "about"}
            >
              About <span className="dropdown-arrow">▼</span>
            </button>
            {openMenu === "about" && (
              <div className="dropdown-content">
                <Link to="/about/team" className="dropdown-item">Our Team</Link>
                <Link to="/about/mission" className="dropdown-item">Mission</Link>
                
              </div>
            )}
          </div>

          <div className="dropdown">
            <button 
              className={`nav-button ${openMenu === "contact" ? "active" : ""}`}
              onClick={() => toggleMenu("contact")}
              aria-expanded={openMenu === "contact"}
            >
              Contact <span className="dropdown-arrow">▼</span>
            </button>
            {openMenu === "contact" && (
              <div className="dropdown-content">
                <Link to="/contact/email" className="dropdown-item">Email Us</Link>
                <Link to="/contact/phone" className="dropdown-item">Phone</Link>
                
              </div>
            )}
          </div>

         
        </div>
      </nav>
    </header>
  );
}