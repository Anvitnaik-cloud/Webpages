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

export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          AIR MAX <span className="logo-accent">CORE</span>
        </div>
        <div className="navbar-links">
          <a href="#" className="active">Shop</a>
          <a href="#featured">New Arrivals</a>
          <a href="#science">Launch</a>
          <a href="#story">Technology</a>
          <a href="#join">Story</a>
        </div>
        <div className="navbar-icons">
          <SearchIcon />
          <CartIcon />
          <UserIcon />
        </div>
      </div>
    </nav>
  );
}
