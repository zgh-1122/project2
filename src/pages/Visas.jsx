// src/pages/Visas.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Visas.css';

// Custom Animated Wrapper Component using Intersection Observer
const ScrollRevealCard = ({ children }) => {
  const cardRef = useRef(null);
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

const Visas = () => {
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Expanded Form State parameters for explicit validation tracking
  const [formData, setFormData] = useState({ 
    fullName: '', 
    passport: '', 
    travelDate: '',
    email: '',
    phone: '',
    qualification: '',
    profession: '',
    financialStatus: '',
    passportScan: '',
    biometricPhotographs: '',
    financialProofs: '',
    feesPaymentVerified: false
  });
  const [errors, setErrors] = useState({});

  const visaCollection = [
    { id: 1, country: "United Kingdom", price: "Rs 245,000", time: "15-20 Days", type: "Tier 4 Student", img: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?q=80&w=400" },
    { id: 2, country: "Canada", price: "Rs 310,000", time: "4-6 Weeks", type: "Express Entry", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400" },
    { id: 3, country: "Germany", price: "Rs 195,000", time: "10-15 Days", type: "Job Seeker", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=400" },
    { id: 4, country: "Australia", price: "Rs 285,000", time: "30 Days", type: "Skilled Migration", img: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=400" },
    { id: 5, country: "United Arab Emirates", price: "Rs 65,000", time: "3-5 Days", type: "Express Tourist", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400" },
    { id: 6, country: "Turkey", price: "Rs 110,000", time: "7-10 Days", type: "Business Sticker", img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=400" },
    { id: 7, country: "United States", price: "Rs 350,000", time: "60-90 Days", type: "B1/B2 Executive", img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=400" },
    { id: 8, country: "Japan", price: "Rs 140,000", time: "8-12 Days", type: "Short Term Scholar", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400" },
    { id: 9, country: "Malaysia", price: "Rs 55,000", time: "3 Days", type: "eVisa Clearance", img: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=400" },
    { id: 10, country: "Singapore", price: "Rs 95,000", time: "5-7 Days", type: "ICA Tourist", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=400" },
    { id: 11, country: "Saudi Arabia", price: "Rs 180,000", time: "2 Days", type: "Umrah Multi-Entry", img: "https://images.unsplash.com/photo-1586724237569-f38559db835c?q=80&w=400" },
    { id: 12, country: "Switzerland", price: "Rs 220,000", time: "14 Days", type: "Premium Business Nomad", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=400" },
    { id: 13, country: "France", price: "Rs 205,000", time: "12-15 Days", type: "Cultural Exchange", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400" },
    { id: 14, country: "New Zealand", price: "Rs 290,000", time: "25 Days", type: "Work Conversion Track", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400" },
    { id: 15, country: "South Korea", price: "Rs 125,000", time: "10 Days", type: "Talent Permit", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400" }
  ];

  const handleOpenModal = (visa) => {
    setSelectedVisa(visa);
    setBookingSuccess(false);
    setFormData({ 
      fullName: '', passport: '', travelDate: '', email: '', phone: '',
      qualification: '', profession: '', financialStatus: '', passportScan: '',
      biometricPhotographs: '', financialProofs: '', feesPaymentVerified: false
    });
    setErrors({});
  };

  const handleValidationSubmit = (e) => {
    e.preventDefault();
    let currentErrors = {};

    // 1. Full Legal Name Validation Matrix
    if (formData.fullName.trim().length < 3) {
      currentErrors.fullName = "Signature identity requires minimum 3 valid characters.";
    } else if (/[0-9]/.test(formData.fullName)) {
      currentErrors.fullName = "Numerical elements are invalid in legal signature blocks.";
    }

    // 2. Alpha-Numeric Passport Mapping check
    const passportRegex = /^[A-Z]{1,2}[0-9]{6,8}$/i;
    if (!passportRegex.test(formData.passport.trim())) {
      currentErrors.passport = "Invalid passport structure. Example standard formatting: PK1234567";
    }

    // 3. Chronological Future Date Target check
    if (!formData.travelDate) {
      currentErrors.travelDate = "Target scheduling parameters must be designated.";
    } else {
      const chosenDate = new Date(formData.travelDate);
      const systemToday = new Date();
      systemToday.setHours(0, 0, 0, 0); 

      if (chosenDate < systemToday) {
        currentErrors.travelDate = "Chronological error. Deployment cannot target a past index timeline.";
      }
    }

    // 4. Strict Compliance Mandatory Checkbox Validation
    if (!formData.feesPaymentVerified) {
      currentErrors.feesPaymentVerified = "You must accept consular portal execution fee rules to submit.";
    }

    // Checking validation execution status
    if (Object.keys(currentErrors).length === 0) {
      setBookingSuccess(true);
      setErrors({});
    } else {
      setErrors(currentErrors);
    }
  };

  return (
    <div className="visas-page-wrapper">
      <div className="visas-content-card">
        <div className="visas-header">
          <h2>Global Visa Programs Directory</h2>
          <p>Select your destination node to process corporate immigration and ticket options.</p>
        </div>

        <div className="visas-compact-grid">
          {visaCollection.map(v => (
            <ScrollRevealCard key={v.id}>
              <div className="visa-compact-card">
                <div className="visa-img-container">
                  <img src={v.img} alt={v.country} />
                  <span className="visa-type-tag">{v.type}</span>
                </div>
                <div className="visa-compact-body">
                  <h3>{v.country}</h3>
                  <div className="visa-mini-specs">
                    <p><strong>Consultancy Cost:</strong> {v.price}</p>
                    <p><strong>Standard Timeline:</strong> {v.time}</p>
                  </div>
                  <button className="initiate-btn" onClick={() => handleOpenModal(v)}>
                    Initiate Application
                  </button>
                </div>
              </div>
            </ScrollRevealCard>
          ))}
        </div>
      </div>

      {selectedVisa && (
        <div className="modal-overlay">
          <div className="modal-box extended-visa-form-box">
            <button className="close-modal" onClick={() => setSelectedVisa(null)}>×</button>
            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                <span style={{ fontSize: '4rem' }}>🎉</span>
                <h3 style={{ color: '#0f766e', margin: '1rem 0', fontWeight: '800', fontSize: '1.6rem' }}>Application File Verified!</h3>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto' }}>
                  Your comprehensive dossier record for <strong>{selectedVisa.country}</strong> has been completely logged. All verified credentials matching biometric nodes have been synchronized successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleValidationSubmit} className="visa-modal-scrollable-form">
                <h3 style={{ color: '#0f766e', marginBottom: '0.2rem', fontWeight: '800', fontSize: '1.5rem' }}>Official Visa Dossier Entry</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600', marginBottom: '1.5rem' }}>Target Track: {selectedVisa.country} | {selectedVisa.type}</p>
                
                {/* 1. Core Profile Segment (Dual Column) */}
                <div className="form-grid-row">
                  <div className="form-input-block">
                    <label>Full Legal Name (as in Passport) *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className={errors.fullName ? 'input-error-border' : ''}
                      placeholder="John Doe" 
                    />
                    {errors.fullName && <span className="validation-error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-input-block">
                    <label>Passport Number (Valid Only) *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.passport}
                      onChange={(e) => setFormData({...formData, passport: e.target.value})}
                      className={errors.passport ? 'input-error-border' : ''}
                      placeholder="PK1234567" 
                    />
                    {errors.passport && <span className="validation-error-text">{errors.passport}</span>}
                  </div>
                </div>

                {/* 2. Contact Points Segment (Dual Column) */}
                <div className="form-grid-row">
                  <div className="form-input-block">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="johndoe@example.com" 
                    />
                  </div>

                  <div className="form-input-block">
                    <label>Phone / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+92 300 1234567" 
                    />
                  </div>
                </div>

                {/* 3. Background Metrics Segment (Dual Column) */}
                <div className="form-grid-row">
                  <div className="form-input-block">
                    <label>Highest Degree / Qualification *</label>
                    <select 
                      required
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    >
                      <option value="">Select Highest Qualification</option>
                      <option value="Matric / O-Levels">Matric / O-Levels</option>
                      <option value="Intermediate / A-Levels">Intermediate / A-Levels</option>
                      <option value="Bachelors Graduate">Bachelors Graduate (4 Years)</option>
                      <option value="Masters / MPhil Expert">Masters / MPhil Expert</option>
                    </select>
                  </div>

                  <div className="form-input-block">
                    <label>Current Profession / Status *</label>
                    <select 
                      required
                      value={formData.profession}
                      onChange={(e) => setFormData({...formData, profession: e.target.value})}
                    >
                      <option value="">Select Profession</option>
                      <option value="Salaried Employee">Salaried Employee / Corporate Officer</option>
                      <option value="Business Enterprise Owner">Business Enterprise Owner</option>
                      <option value="Independent Freelancer">Independent Freelancer</option>
                      <option value="Active Student Node">Active Student Node</option>
                    </select>
                  </div>
                </div>

                {/* 4. Financials & Future Timeline Matrix (Dual Column) */}
                <div className="form-grid-row">
                  <div className="form-input-block">
                    <label>Bank Balance / Financial Status *</label>
                    <select 
                      required
                      value={formData.financialStatus}
                      onChange={(e) => setFormData({...formData, financialStatus: e.target.value})}
                    >
                      <option value="">Select Verified Balance Range</option>
                      <option value="Below 1.5 Million PKR">Below 1.5 Million PKR</option>
                      <option value="1.5 to 3.5 Million PKR">1.5 to 3.5 Million PKR</option>
                      <option value="3.5 to 7.0 Million PKR">3.5 to 7.0 Million PKR</option>
                      <option value="Above 7.0 Million PKR">Above 7.0 Million PKR</option>
                    </select>
                  </div>

                  <div className="form-input-block">
                    <label>Expected Travel Deployment Date *</label>
                    <input 
                      type="date" 
                      required
                      value={formData.travelDate}
                      onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                      className={errors.travelDate ? 'input-error-border' : ''}
                    />
                    {errors.travelDate && <span className="validation-error-text">{errors.travelDate}</span>}
                  </div>
                </div>

                {/* 5. Document & Telemetry File Attachment Blocks (Split Rows) */}
                <div className="form-document-upload-matrix">
                  <div className="upload-node">
                    <label>Digital Scans (Passport First & Last Page) *</label>
                    <input 
                      type="file" 
                      required
                      accept=".pdf, .png, .jpg, .jpeg"
                      onChange={(e) => setFormData({...formData, passportScan: e.target.value})}
                    />
                  </div>

                  <div className="upload-node">
                    <label>Biometric Verification Photo (Embassy Standard) *</label>
                    <input 
                      type="file" 
                      required
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => setFormData({...formData, biometricPhotographs: e.target.value})}
                    />
                  </div>

                  <div className="upload-node full-width-node">
                    <label>Financial Proofs (Bank Statement / Tax Returns / Sponsorship Docs) *</label>
                    <input 
                      type="file" 
                      required
                      accept=".pdf"
                      onChange={(e) => setFormData({...formData, financialProofs: e.target.value})}
                    />
                  </div>
                </div>

                {/* 6. Consular Processing Fee Checkbox Guarantee */}
                <div className="fees-checkbox-block">
                  <input 
                    type="checkbox" 
                    id="feesPaymentVerified"
                    checked={formData.feesPaymentVerified}
                    onChange={(e) => setFormData({...formData, feesPaymentVerified: e.target.checked})}
                  />
                  <label htmlFor="feesPaymentVerified">
                    <strong>Official Fees Payment Compliance:</strong> I understand that processing require submitting consular filing fees via international checkout gateways before visa deployment integration. *
                  </label>
                </div>
                {errors.feesPaymentVerified && <span className="validation-error-text" style={{marginTop: '-0.5rem'}}>{errors.feesPaymentVerified}</span>}

                <button type="submit" className="visa-submit-master-btn">
                  Submit Official Verified Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Visas;