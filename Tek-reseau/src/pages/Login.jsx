import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'tekreseau2025') {
            localStorage.setItem('tek_reseau_auth', 'true');
            setAuth(true);
            navigate('/admin');
        } else {
            alert('Identifiants invalides');
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
                        <label><User size={16} /> Identifiant</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ex: admin"
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

            <style jsx>{`
        .login-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .login-card {
          width: 100%;
          max-width: 450px;
          padding: 3.5rem;
          text-align: center;
        }

        .login-header {
          margin-bottom: 2.5rem;
        }

        .icon-primary {
          color: var(--primary);
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 10px var(--primary-glow));
        }

        .login-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .login-header p {
          color: var(--text-dim);
          font-size: 0.95rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.6rem;
          font-size: 0.85rem;
          color: var(--text-dim);
        }

        input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 1rem;
          border-radius: 12px;
          color: white;
          font-family: inherit;
          transition: var(--transition);
        }

        input:focus {
          border-color: var(--primary);
          outline: none;
          background: rgba(255, 255, 255, 0.1);
        }

        .login-btn {
          margin-top: 1rem;
          width: 100%;
          justify-content: center;
        }
      `}</style>
        </div>
    );
};

export default Login;
