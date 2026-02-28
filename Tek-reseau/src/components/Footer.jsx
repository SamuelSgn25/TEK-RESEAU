import React from 'react';
import { Network, Mail, Linkedin, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

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

            <style jsx>{`
        .footer-container {
          background: rgba(5, 11, 24, 0.9);
          border-top: 1px solid var(--glass-border);
          padding-top: 4rem;
          margin-top: 6rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4rem;
          padding: 0 2rem 4rem 2rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .logo-icon {
          color: var(--primary);
        }

        .footer-tagline {
          color: var(--text-dim);
          max-width: 300px;
          line-height: 1.6;
        }

        .footer-links, .footer-legal {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-links h4, .footer-legal h4 {
          color: var(--white);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .footer-links a, .footer-legal a {
          color: var(--text-dim);
          text-decoration: none;
          transition: var(--transition);
        }

        .footer-links a:hover, .footer-legal a:hover {
          color: var(--primary);
        }

        .admin-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-social {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }

        .footer-bottom {
          border-top: 1px solid var(--glass-border);
          padding: 2rem;
          text-align: center;
          color: var(--text-dim);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
