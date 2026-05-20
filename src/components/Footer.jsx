// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Visa<span>Sync</span> Global</h3>
          <p>Automated telemetry routers tracking worldwide authorization clearance pipelines securely.</p>
        </div>
        <div className="footer-links-group">
          <h4>System Shortcuts</h4>
          <Link to="/">Home Base</Link>
          <Link to="/visas">Visas Matrix</Link>
          <Link to="/stories">Clearance Registry</Link>
          <Link to="/journey">Our Trajectory</Link>
        </div>
        <div className="footer-meta">
          <h4>Operational Status</h4>
          <p>📡 All Core Systems Operational</p>
          <p>© 2026 VisaSync. Automated Data Node.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;