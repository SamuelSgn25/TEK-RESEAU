import React from 'react';
import { Mail, Phone, MapPin, Send, Globe, Linkedin } from 'lucide-react';
import './ContactPage.css';

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
    </div>
  );
};

export default ContactPage;
