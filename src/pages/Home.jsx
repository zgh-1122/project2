// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const ScrollReveal = ({ children }) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`home-reveal-wrapper ${isVisible ? 'home-visible' : ''}`}>
      {children}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-layout">
      {/* Hero Showcase Section */}
      <ScrollReveal>
        <div className="hero-showcase">
          <div className="hero-content-cover">
            <h1>Your Gateway to the World Starts Here.</h1>
            <p>Seamless global immigration consultancy, real-time visa telemetry registries, and trusted travel architecture.</p>
            
            {/* BUTTONS GROUP: Fixed to ensure both buttons stay intact */}
            <div className="hero-btn-group">
              <button className="cta-btn-main" onClick={() => navigate('/visas')}>
                Explore Visas Offered →
              </button>
              <button className="cta-btn-secondary" onClick={() => navigate('/journey')}>
                Our Journey
              </button>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* Features Intro Section */}
      <ScrollReveal>
        <div className="features-intro">
          <h2>Why Corporate Entities Trust VisaSync?</h2>
          <div className="features-strip-grid">
            <div className="feat-block">
              <div className="feat-icon">🌐</div>
              <h3>99.2% Success Rate</h3>
              <p>Validated tracking processing systems ensure flawless clearance results.</p>
            </div>
            <div className="feat-block">
              <div className="feat-icon">⚡</div>
              <h3>Real-time Sync</h3>
              <p>Direct API synchronization updates clients on every stage of deployment.</p>
            </div>
            <div className="feat-block">
              <div className="feat-icon">🛡️</div>
              <h3>Government Verified</h3>
              <p>Full legal authentication compliance across 45+ destination nations.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Home;