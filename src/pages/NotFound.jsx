// src/pages/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-canvas">
      <div className="notfound-glass-card">
        {/* Error Code Descriptor */}
        <div className="error-badge-core">
          <span>Error Code: 404</span>
        </div>

        {/* Core Main Message */}
        <h1 className="notfound-title">Oops! Page Not Found</h1>
        <p className="notfound-subtitle">
          The destination route you are looking for does not exist or has been shifted across the VisaSync ecosystem grid.
        </p>

        {/* Minimalist Interactive Navigation Buttons */}
        <div className="notfound-actions-group">
          <button className="nf-btn-primary" onClick={() => navigate('/')}>
            Go Back Home
          </button>
          <button className="nf-btn-secondary" onClick={() => navigate(-1)}>
            ← Previous Screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;