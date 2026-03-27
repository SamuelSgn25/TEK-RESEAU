import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await resp.json();
      
      if (resp.ok) {
        localStorage.setItem('tek_reseau_token', data.access_token);
        localStorage.setItem('tek_reseau_user', JSON.stringify(data.user));
        setAuth(true);
        navigate('/admin');
      } else {
        alert(data.message || 'Identifiants invalides.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="login-container animate-fade">
      <div className="glass-card login-card">
        <div className="login-header">
          <Shield size={48} className="icon-primary" />
          <h1>Admin Access</h1>
          <p>Connectez-vous pour gérer les membres et présences.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label><Mail size={16} /> Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.nom@epitech.eu"
              required
            />
          </div>
          <div className="form-group">
            <label><Lock size={16} /> Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary login-btn">
            Se Connecter <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
