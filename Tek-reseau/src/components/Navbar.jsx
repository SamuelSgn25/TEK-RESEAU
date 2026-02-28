import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Network, Users, ShieldCheck, Home, Info, Mail, LogOut } from 'lucide-react';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Network size={32} className="logo-icon" />
          <span className="gradient-text">Tek-Reseau</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home size={18} />
            Accueil
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            <Info size={18} />
            À Propos
          </Link>
          <Link to="/board" className={`nav-link ${isActive('/board') ? 'active' : ''}`}>
            <Users size={18} />
            Bureau
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            <Mail size={18} />
            Contact
          </Link>

          {!isAuthenticated ? (
            <Link to="/admin" className={`nav-link admin-btn ${isActive('/admin') ? 'active' : ''}`}>
              <ShieldCheck size={18} />
              Admin
            </Link>
          ) : (
            <button className="nav-link logout-btn" onClick={onLogout}>
              <LogOut size={18} />
              Déconnexion
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(5, 11, 24, 0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--glass-border);
          padding: 0.8rem 0;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 700;
          transition: var(--transition);
        }

        .nav-logo:hover {
          transform: scale(1.02);
        }

        .logo-icon {
          color: var(--primary);
          filter: drop-shadow(0 0 8px var(--primary-glow));
        }

        .nav-links {
          display: flex;
          gap: 0.8rem;
          align-items: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-dim);
          font-size: 0.9rem;
          font-weight: 500;
          transition: var(--transition);
          padding: 0.6rem 1rem;
          border-radius: 10px;
          border: 1px solid transparent;
        }

        .nav-link:hover {
          color: var(--white);
          background: var(--surface);
          border-color: var(--glass-border);
        }

        .nav-link.active {
          color: var(--primary);
          background: var(--glass-bg);
          border-color: var(--primary);
          box-shadow: 0 0 15px var(--primary-glow);
        }

        .admin-btn {
          margin-left: 1rem;
          background: var(--surface);
        }

        .logout-btn {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          cursor: pointer;
          font-family: inherit;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        @media (max-width: 1024px) {
          .nav-link span { display: none; }
          .nav-link { font-size: 0; padding: 0.8rem; }
        }

        @media (max-width: 768px) {
          .nav-container { padding: 0 1rem; }
          .nav-logo span { display: none; }
          .nav-links { gap: 0.4rem; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
