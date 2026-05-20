// src/pages/SuccessStories.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessStories.css';

// Custom Reveal Wrapper to handle dynamic fade-in on scroll
const ScrollRevealCard = ({ children }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Ek baar animation chalne ke baad process detached
        }
      },
      { threshold: 0.1 } // Jab 10% card screen par aaye tab reveal logic run ho
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className={`reveal-wrapper ${isVisible ? 'fade-in-active' : ''}`}>
      {children}
    </div>
  );
};

const SuccessStories = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Premium Portraits Array for verified imagery load
  const validPortraits = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300"
  ];

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        const enrichedStories = data.map((user, idx) => ({
          ...user,
          photo: validPortraits[idx % validPortraits.length],
          targetCountry: idx % 3 === 0 ? "United Kingdom" : idx % 3 === 1 ? "Canada" : "Germany",
          applyDate: `2026-01-${10 + idx}`,
          issueDate: `2026-02-${20 + idx}`,
          flightDate: `2026-05-${25 + idx}`,
          flightDetails: `Flight PA-78${idx} - Standard Direct Route`
        }));
        setUsers(enrichedStories);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader-screen"><div className="spinner"></div><p>Syncing Registry Documents...</p></div>;

  return (
    <div className="stories-page-container">
      <div className="stories-master-card">
        <div className="stories-header">
          <h2><u>Our Successful Track Record</u></h2>
          <p>Real profiles of clients who successfully processed their dynamic global transitions.</p>
        </div>

        <div className="stories-grid">
          {users.map(u => (
            <ScrollRevealCard key={u.id}>
              <div className="story-profile-node">
                <img src={u.photo} alt={u.name} className="story-node-avatar" />
                <div className="story-node-body">
                  <h3>{u.name}</h3>
                  <span className="success-badge">Visa Approved</span>
                  <p className="target-lbl">Destination: <strong>{u.targetCountry}</strong></p>
                  <button 
                    className="inspect-btn" 
                    onClick={() => navigate(`/member/${u.id}`, { state: { member: u } })}
                  >
                    View Case Details
                  </button>
                </div>
              </div>
            </ScrollRevealCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;