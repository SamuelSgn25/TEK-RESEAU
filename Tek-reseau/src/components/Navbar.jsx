import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Network, Users, ShieldCheck, Home, Info, Mail, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const user = localStorage.getItem('tek_reseau_user');
      setUserData(user ? JSON.parse(user) : null);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('tek_reseau_token');
    localStorage.removeItem('tek_reseau_user');
    setIsAuthenticated(false);
    setShowProfileMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setShowProfileMenu(false)}>
          <Network size={32} className="logo-icon" />
          <span className="gradient-text">Tek-Reseau</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setShowProfileMenu(false)}>
            <Home size={18} />
            Accueil
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setShowProfileMenu(false)}>
            <Info size={18} />
            À Propos
          </Link>
          <Link to="/board" className={`nav-link ${isActive('/board') ? 'active' : ''}`} onClick={() => setShowProfileMenu(false)}>
            <Users size={18} />
            Bureau
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => setShowProfileMenu(false)}>
            <Mail size={18} />
            Contact
          </Link>

          {!isAuthenticated ? (
            <Link to="/admin" className={`nav-link admin-btn ${isActive('/admin') ? 'active' : ''}`}>
              <ShieldCheck size={18} />
              Admin
            </Link>
          ) : (
            <div className="profile-wrapper">
              <button
                className={`nav-link profile-btn ${showProfileMenu ? 'active' : ''}`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="avatar">
                  <User size={16} />
                </div>
                <span className="user-name">{userData?.name || 'Admin'}</span>
                <ChevronDown size={14} className={`chevron ${showProfileMenu ? 'rotate' : ''}`} />
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown animate-fade-in">
                  <div className="dropdown-header">
                    <p className="email-hint">{userData?.email}</p>
                    <p className="role-hint">{userData?.role}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/settings" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                    <Settings size={16} />
                    Paramètres
                  </Link>
                  <button
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
