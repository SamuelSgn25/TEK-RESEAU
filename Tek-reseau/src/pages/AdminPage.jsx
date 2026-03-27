import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Plus, Calendar, Clock, Check, X, LogOut, Users, Trash, Activity, FileText, Search, ChevronRight } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import './AdminPage.css';

// Set up worker for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const AdminPage = ({ setAuth }) => {
    const [activeTab, setActiveTab] = useState('members'); // members, activities, attendance
    const [members, setMembers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [currentActivity, setCurrentActivity] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [newActivity, setNewActivity] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        description: ''
    });

    const [rawUpload, setRawUpload] = useState('');
    const [isProcessingPdf, setIsProcessingPdf] = useState(false);
    const [manualMemberName, setManualMemberName] = useState('');

    const token = localStorage.getItem('tek_reseau_token');
    const apiBase = 'http://localhost:3000';

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [mResp, aResp] = await Promise.all([
                fetch(`${apiBase}/members`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${apiBase}/activities`, { headers: { Authorization: `Bearer ${token}` } })
            ]);
            
            if (mResp.ok) setMembers(await mResp.json());
            if (aResp.ok) setActivities(await aResp.json());
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleLogout = () => {
        localStorage.removeItem('tek_reseau_token');
        localStorage.removeItem('tek_reseau_user');
        setAuth(false);
    };

    const handleUploadMembers = async () => {
        if (!rawUpload.trim()) return;

        const lines = rawUpload.split('\n').filter(l => l.trim() !== '');
        const membersToImport = lines.map(line => ({
            name: line.trim(),
            status: 'ACTIVE'
        }));

        try {
            const resp = await fetch(`${apiBase}/members/import`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ members: membersToImport })
            });

            if (resp.ok) {
                setRawUpload('');
                fetchData();
                alert('Membres importés !');
            }
        } catch (err) {
            alert('Erreur lors de l\'import.');
        }
    };

    const handlePdfImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsProcessingPdf(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
            }

            const potentialMembers = fullText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 3 && !line.includes('Page'));

            setRawUpload(prev => prev + (prev ? '\n' : '') + potentialMembers.join('\n'));
        } catch (error) {
            alert('Erreur PDF.');
        } finally {
            setIsProcessingPdf(false);
            e.target.value = '';
        }
    };

    const handleCreateActivity = async () => {
        if (!newActivity.name || !newActivity.date) {
            alert('Informations incomplètes.');
            return;
        }

        try {
            const resp = await fetch(`${apiBase}/activities`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newActivity)
            });

            if (resp.ok) {
                setShowCreateModal(false);
                setNewActivity({ name: '', date: '', startTime: '', endTime: '', description: '' });
                fetchData();
            }
        } catch (err) {
            alert('Erreur creation activité.');
        }
    };

    const updateAttendance = async (activityId, memberId, status) => {
        try {
            const resp = await fetch(`${apiBase}/attendance`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ activityId, memberId, status })
            });
            
            if (resp.ok) {
                if (currentActivity && currentActivity.id === activityId) {
                   const attResp = await fetch(`${apiBase}/attendance/activity/${activityId}`, {
                       headers: { Authorization: `Bearer ${token}` }
                   });
                   const newAttendances = await attResp.json();
                   setCurrentActivity({ ...currentActivity, attendances: newAttendances });
                }
                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openAttendance = async (act) => {
        setLoading(true);
        try {
            const resp = await fetch(`${apiBase}/attendance/activity/${act.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const attendances = await resp.json();
            setCurrentActivity({ ...act, attendances });
            setActiveTab('attendance');
        } catch (err) {
            alert('Erreur chargement présences.');
        } finally {
            setLoading(false);
        }
    };

    const filteredMembers = members.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="adminpage animate-fade">
            <header className="admin-header">
                <div className="header-left">
                    <h1>Espace <span className="gradient-text">Administration</span></h1>
                    <p>Gestion centrale de l'association TEK-RESEAU</p>
                </div>
                <div className="header-tabs">
                    <button className={activeTab === 'members' ? 'active' : ''} onClick={() => setActiveTab('members')}>
                        <Users size={18} /> Membres
                    </button>
                    <button className={activeTab === 'activities' ? 'active' : ''} onClick={() => setActiveTab('activities')}>
                        <Activity size={18} /> Activités
                    </button>
                    <button className={activeTab === 'attendance' ? 'active' : ''} onClick={() => {
                        if (currentActivity) setActiveTab('attendance');
                        else alert('Sélectionnez d\'abord une activité.');
                    }}>
                        <Check size={18} /> Pointage
                    </button>
                </div>
                <button className="btn-logout" onClick={handleLogout}>
                    <LogOut size={18} /> Quitter
                </button>
            </header>

            <main className="admin-main">
                {activeTab === 'members' && (
                    <div className="tab-content members-tab">
                        <section className="glass-card members-management">
                            <div className="card-header">
                                <h2>Liste des Membres ({members.length})</h2>
                                <div className="search-bar">
                                    <Search size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Rechercher un membre..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="members-scroll">
                                {filteredMembers.map(m => (
                                    <div key={m.id} className="member-row">
                                        <div className="member-info">
                                            <span className="m-name">{m.name}</span>
                                            <span className="m-id">{m.registrationNumber || 'No ID'}</span>
                                        </div>
                                        <div className="member-status-tag">{m.status}</div>
                                        <button className="btn-icon" onClick={async () => {
                                            if (confirm('Supprimer ce membre ?')) {
                                                await fetch(`${apiBase}/members/${m.id}`, {
                                                    method: 'DELETE',
                                                    headers: { Authorization: `Bearer ${token}` }
                                                });
                                                fetchData();
                                            }
                                        }}>
                                            <Trash size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="glass-card member-import">
                            <h2>Importation Liste</h2>
                            <div className="import-box">
                                <p>Collez une liste de noms ou importez un PDF.</p>
                                <textarea 
                                    value={rawUpload}
                                    onChange={(e) => setRawUpload(e.target.value)}
                                    placeholder="Jean Dupont\nAlice Martin..."
                                />
                                <div className="import-actions">
                                    <label className="btn-secondary btn-small file-input-label">
                                        <FileText size={16} /> 
                                        {isProcessingPdf ? '...' : 'PDF'}
                                        <input type="file" accept=".pdf" onChange={handlePdfImport} style={{display:'none'}} />
                                    </label>
                                    <button className="btn-primary" onClick={handleUploadMembers}>
                                        <Upload size={18} /> Importer
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'activities' && (
                    <div className="tab-content activities-tab">
                        <div className="activities-header">
                            <h2>Activités de l'Association</h2>
                            <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
                                <Plus size={18} /> Nouvelle Séance
                            </button>
                        </div>
                        <div className="activities-grid">
                            {activities.map(act => (
                                <div key={act.id} className="glass-card activity-card">
                                    <div className="act-header">
                                        <h3>{act.name}</h3>
                                        <span className="act-date">{new Date(act.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="act-time"><Clock size={14} /> {act.startTime} - {act.endTime}</p>
                                    <div className="act-stats">
                                        <div className="stat">
                                            <span>Présents</span>
                                            <strong>{act._count?.attendances || 0}</strong>
                                        </div>
                                    </div>
                                    <div className="act-actions">
                                        <button className="btn-accent" onClick={() => openAttendance(act)}>
                                            Faire le Pointage <ChevronRight size={16} />
                                        </button>
                                        <button className="btn-icon-danger" onClick={async () => {
                                            if (confirm('Supprimer ?')) {
                                                await fetch(`${apiBase}/activities/${act.id}`, {
                                                    method: 'DELETE',
                                                    headers: { Authorization: `Bearer ${token}` }
                                                });
                                                fetchData();
                                            }
                                        }}>
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'attendance' && currentActivity && (
                    <div className="tab-content attendance-tab">
                        <section className="attendance-control glass-card">
                            <div className="att-info">
                                <button className="btn-back" onClick={() => setActiveTab('activities')}>← Retour</button>
                                <h2>Pointage : {currentActivity.name}</h2>
                                <p>{new Date(currentActivity.date).toLocaleDateString()} | {currentActivity.startTime} - {currentActivity.endTime}</p>
                            </div>
                            
                            <div className="attendance-search">
                                <Search size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Chercher un membre pour marquer..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="attendance-list">
                                {filteredMembers.map(m => {
                                    const attendance = currentActivity.attendances?.find(a => a.memberId === m.id);
                                    const status = attendance?.status || 'NONE';
                                    
                                    return (
                                        <div key={m.id} className={`att-row ${status.toLowerCase()}`}>
                                            <span className="m-name">{m.name}</span>
                                            <div className="att-btns">
                                                <button 
                                                    className={`btn-att present ${status === 'PRESENT' ? 'active' : ''}`}
                                                    onClick={() => updateAttendance(currentActivity.id, m.id, 'PRESENT')}
                                                >
                                                    <Check size={16} /> Présent
                                                </button>
                                                <button 
                                                    className={`btn-att absent ${status === 'ABSENT' ? 'active' : ''}`}
                                                    onClick={() => updateAttendance(currentActivity.id, m.id, 'ABSENT')}
                                                >
                                                    <X size={16} /> Absent
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                )}
            </main>

            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="glass-card modal-content">
                        <h2>Nouvelle Activité</h2>
                        <input 
                            type="text" 
                            placeholder="Nom de l'activité" 
                            value={newActivity.name}
                            onChange={e => setNewActivity({...newActivity, name: e.target.value})}
                        />
                        <div className="form-row">
                            <input type="date" value={newActivity.date} onChange={e => setNewActivity({...newActivity, date: e.target.value})} />
                            <input type="time" value={newActivity.startTime} onChange={e => setNewActivity({...newActivity, startTime: e.target.value})} />
                            <input type="time" value={newActivity.endTime} onChange={e => setNewActivity({...newActivity, endTime: e.target.value})} />
                        </div>
                        <div className="modal-btns">
                            <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Annuler</button>
                            <button className="btn-primary" onClick={handleCreateActivity}>Créer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
