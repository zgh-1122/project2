// src/pages/MemberDetail.jsx
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './MemberDetail.css';

const MemberDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // SuccessStories se pass kiya hua member data grab karna
  const memberData = location.state?.member;

  // Fallback data agar koi direct URL enter kare
  const member = memberData || {
    id: id,
    name: "Verified Client Profile",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500",
    targetCountry: "United Kingdom",
    applyDate: "2026-01-15",
    issueDate: "2026-02-24",
    flightDate: "2026-05-28",
    flightDetails: "Flight PA-781 - Standard Route"
  };

  return (
    <div className="member-detail-container">
      <div className="member-detail-card">
        
        {/* Left Side: Portrait Photo Section */}
        <div className="member-image-section">
          <img src={member.photo} alt={member.name} />
          <div className="status-ribbon">Visa Clearance Absolute</div>
        </div>

        {/* Right Side: Case Study Timeline & Data */}
        <div className="member-info-section">
          <button className="back-to-stories-btn" onClick={() => navigate(-1)}>
            ← Back to Success Stories
          </button>

          <div className="profile-main-header">
            <h1>{member.name}</h1>
            <p className="case-id-tag">Official Case Ref: #VS-2026-{id}</p>
          </div>

          <div className="case-details-grid">
            <div className="case-data-row">
              <span className="data-label">Target Destination:</span>
              <span className="data-value highlight">{member.targetCountry}</span>
            </div>
            
            <div className="case-data-row">
              <span className="data-label">Application Submitted:</span>
              <span className="data-value">{member.applyDate}</span>
            </div>

            <div className="case-data-row">
              <span className="data-label">Visa Issuance Date:</span>
              <span className="data-value">{member.issueDate}</span>
            </div>

            <div className="case-data-row">
              <span className="data-label">Scheduled Flight Date:</span>
              <span className="data-value">{member.flightDate}</span>
            </div>

            <div className="case-data-row">
              <span className="data-label">Assigned Carrier Track:</span>
              <span className="data-value">{member.flightDetails}</span>
            </div>
          </div>

          <div className="verification-footer-note">
            <span className="verified-check-mark">✓</span>
            <p>This immigration profile data has been securely verified by the VisaSync processing system ledger.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MemberDetail;