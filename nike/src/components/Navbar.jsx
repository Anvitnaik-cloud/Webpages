import { useState } from 'react';
import './Navbar.css';

const SearchIcon = () => (
  <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CartIcon = () => (
  <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const UserIcon = () => (
  <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = ({ isOpen }) => (
  <svg className="navbar-icon mobile-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {isOpen ? (
      <path d="M18 6L6 18M6 6l12 12" />
    ) : (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-inner">
        <a href="#" className="navbar-logo" onClick={closeMenu}>
          AIR MAX <span className="logo-accent">CORE</span>
        </a>
        
        <div className="navbar-links">
          <a href="#" className="active">Shop</a>
          <a href="#new-arrivals">New Arrivals</a>
          <a href="#featured">Featured</a>
          <a href="#science">Science</a>
          <a href="#story">Technology</a>
          <a href="#join">Join Squad</a>
        </div>

        <div className="navbar-icons">
          <SearchIcon />
          <CartIcon />
          <UserIcon />
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle Navigation Menu"
          >
            <MenuIcon isOpen={mobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`navbar-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="navbar-mobile-links">
          <a href="#" className="active" onClick={closeMenu}>Shop</a>
          <a href="#new-arrivals" onClick={closeMenu}>New Arrivals</a>
          <a href="#featured" onClick={closeMenu}>Featured</a>
          <a href="#science" onClick={closeMenu}>Science</a>
          <a href="#story" onClick={closeMenu}>Technology</a>
          <a href="#join" onClick={closeMenu}>Join Squad</a>
        </div>
      </div>
    </nav>
  );
}
