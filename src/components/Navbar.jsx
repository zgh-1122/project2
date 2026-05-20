// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  // Active link check karne ke liye helper function
  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        
        {/* Left Side: Brand Logo */}
        <div className="navbar-brand">
          <Link to="/">VisaSync <span>Global</span></Link>
        </div>

        {/* Right Side: Navigation Links Line */}
        <div className="navbar-links">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/visas" className={isActive('/visas')}>Visas Offered</Link>
          <Link to="/stories" className={isActive('/stories')}>Success Stories</Link>
          <Link to="/journey" className={isActive('/journey')}>Our Journey</Link>
          <Link to="/contact" className={isActive('/contact')}>Contact Us</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;