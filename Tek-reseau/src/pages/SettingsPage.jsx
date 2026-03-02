import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SettingsPage.css';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: 'Administrateur'
    });

    useEffect(() => {
        const user = localStorage.getItem('tek_reseau_user');
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem('tek_reseau_user', JSON.stringify(userData));
        alert('Paramètres mis à jour avec succès !');
        // We need to refresh the page or use a global state to update the Navbar
        window.location.reload();
    };

    return (
        <div className="settings-page animate-fade">
            <div className="settings-container">
                <div className="settings-nav">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} /> Retour
                    </button>
                    <button className="btn-secondary btn-small" onClick={() => navigate('/admin')}>
                        Dashboard Admin
                    </button>
                </div>

                <div className="glass-card settings-card">
                    <div className="settings-header">
                        <h1>Paramètres du <span className="gradient-text">Profil</span></h1>
                        <p>Gérez vos informations personnelles et d'accès.</p>
                    </div>

                    <form onSubmit={handleSave} className="settings-form">
                        <div className="form-group">
                            <label><User size={18} /> Nom / Prénom</label>
                            <input
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                placeholder="Votre nom"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label><Mail size={18} /> Adresse Email</label>
                            <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                placeholder="votre.nom@epitech.eu"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label><Shield size={18} /> Rôle</label>
                            <input
                                type="text"
                                value={userData.role}
                                disabled
                                className="disabled-input"
                            />
                        </div>

                        <button type="submit" className="btn-primary save-btn">
                            <Save size={18} /> Enregistrer les modifications
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
