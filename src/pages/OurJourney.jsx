// src/pages/OurJourney.jsx
import React from 'react';
import './OurJourney.css';

const OurJourney = () => {
  const narrativeNodes = [
    { 
      year: "2021", 
      title: "The Inception of VisaSync", 
      desc: "Started as a dedicated advisory board with a vision to simplify cross-border migration channels and legal verification setups for students and young professionals.", 
      // Relatable Pic 1: Deep professional visa consultancy, maps, and document planning session
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600" 
    },
    { 
      year: "2023", 
      title: "Expanding Global Reach", 
      desc: "Partnered directly with international education networks and migration chambers, securing custom immigration pipelines for over 10,000+ applicants.", 
      // Relatable Pic 2: Authentic closeup of international passports, visa stamps, and globes
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600" 
    },
    { 
      year: "2026", 
      title: "Digital Ecosystem Transition", 
      desc: "Fully automated our visa tracking and profile confirmation architecture, providing clear end-to-end processing transparency for worldwide destinations.", 
      // Relatable Pic 3: Modern dynamic airport terminal and digital airline tracking vibe
      img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600" 
    }
  ];

  return (
    <div className="journey-page-wrapper">
      <div className="journey-content-box">
        <div className="journey-header">
          <h1><u>Our Path to Global Excellence</u></h1>
          <p>How we evolved from a regional consultancy into a trusted international processing hub.</p>
        </div>

        <div className="timeline-layout">
          {narrativeNodes.map((node, index) => (
            <div key={index} className={`timeline-segment ${index % 2 === 0 ? 'left-align' : 'right-align'}`}>
              <div className="segment-badge">{node.year}</div>
              <div className="segment-card">
                <img src={node.img} alt={node.title} className="segment-img" />
                <div className="segment-body">
                  <h3>{node.title}</h3>
                  <p>{node.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurJourney;