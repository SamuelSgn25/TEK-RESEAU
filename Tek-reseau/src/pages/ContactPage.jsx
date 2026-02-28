import React from 'react';
import { Mail, Phone, MapPin, Send, Globe, Linkedin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="contactpage animate-fade">
      <section className="contact-hero">
        <h1 className="hero-title">Contactez-<span className="gradient-text">Tek-Reseau</span></h1>
        <p className="hero-subtitle">Des questions sur nos projets ou envie de rejoindre l'association ?</p>
      </section>

      <div className="contact-grid">
        {/* Contact Info */}
        <div className="contact-info">
          <div className="glass-card info-item">
            <Mail className="info-icon" />
            <h3>Email</h3>
            <p>tek-reseau@epitech.eu</p>
          </div>
          <div className="glass-card info-item">
            <Phone className="info-icon" />
            <h3>Téléphone</h3>
            <p>+229 00 00 00 00</p>
          </div>
          <div className="glass-card info-item">
            <MapPin className="info-icon" />
            <h3>Localisation</h3>
            <p>Epitech Bénin, Cotonou</p>
          </div>
          <div className="glass-card info-item">
            <Linkedin className="info-icon" />
            <h3>LinkedIn</h3>
            <p>Tek-Reseau Epitech</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card contact-form-container">
          <h2>Envoyez-nous un Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label>Nom Complet</label>
              <input type="text" placeholder="Ex: Jean Dupont" required />
            </div>
            <div className="form-group">
              <label>Identifiant Epitech</label>
              <input type="email" placeholder="Ex: jean.dupont@epitech.eu" required />
            </div>
            <div className="form-group">
              <label>Sujet</label>
              <input type="text" placeholder="Ex: Demande d'adhésion" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Votre message ici..." required></textarea>
            </div>
            <button type="submit" className="btn-primary">
              <Send size={18} /> Envoyer
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .contactpage {
          padding-top: 8rem;
          max-width: 1100px;
          margin: 0 auto;
          padding-bottom: 5rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .contact-hero {
          text-align: center;
          margin-bottom: 5rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
        }

        .contact-info {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .info-item {
          padding: 1.5rem;
          text-align: center;
        }

        .info-icon {
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .info-item h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .info-item p {
          color: var(--text-dim);
          font-size: 0.95rem;
        }

        .contact-form-container {
          padding: 3rem;
        }

        .contact-form-container h2 {
          margin-bottom: 2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        input, textarea {
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--glass-border);
          padding: 1rem;
          border-radius: 12px;
          color: white;
          font-family: inherit;
          transition: var(--transition);
        }

        input:focus, textarea:focus {
          border-color: var(--primary);
          outline: none;
          background: rgba(255, 255, 255, 0.05);
        }

        textarea {
          height: 150px;
          resize: none;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-form-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
