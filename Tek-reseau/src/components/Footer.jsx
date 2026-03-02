import React from 'react';
import { Network, Mail, Linkedin, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Network size={28} className="logo-icon" />
            <span className="gradient-text">Tek-Reseau</span>
          </Link>
          <p className="footer-tagline">
            Démocratiser l'accès aux technologies réseau à Epitech Bénin.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <Link to="/">Accueil</Link>
          <Link to="/about">À Propos</Link>
          <Link to="/board">Bureau</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-legal">
          <h4>Admin</h4>
          <Link to="/admin" className="admin-link">
            <Shield size={16} /> Espace Admin
          </Link>
          <div className="footer-social">
            <a href="#"><Mail size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 - 2026 Tek-Reseau Epitech Bénin. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
