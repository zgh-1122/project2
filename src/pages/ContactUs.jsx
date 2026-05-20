// src/pages/ContactUs.jsx
import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [done, setDone] = useState(false);

  return (
    <div className="contact-page-wrapper">
      <div className="contact-card-box">
        <div className="contact-split-grid">
          <div className="contact-branding-side">
            <h2>Secure Comms Interface</h2>
            <p>Establish a telemetry connection handshake directly with corporate compliance administrators.</p>
            <div className="contact-node-list">
              <p>📍 <strong>Base:</strong> Grid Station 9, Gateway Tower, Capital Circle</p>
              <p>📧 <strong>Secure Ingest:</strong> protocols@visasync.global</p>
            </div>
          </div>
          <div className="contact-fields-side">
            {done ? (
              <div className="form-success-alert">
                <h3>Handshake Verified</h3>
                <p>Transmission payload synced with master operations routers.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="contact-actual-form">
                <div className="field-block">
                  <label>Legal Name Signature</label>
                  <input type="text" required placeholder="Marcus Vance" />
                </div>
                <div className="field-block">
                  <label>Network Return Relay (Email)</label>
                  <input type="email" required placeholder="marcus@domain.com" />
                </div>
                <div className="field-block">
                  <label>Transmission Message Payload</label>
                  <textarea rows="4" required placeholder="Type operational specifications..."></textarea>
                </div>
                <button type="submit" className="submit-form-btn">Deploy Payload Packets</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;