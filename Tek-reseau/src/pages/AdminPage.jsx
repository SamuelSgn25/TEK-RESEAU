import React, { useState, useEffect } from 'react';
import { Upload, Plus, Calendar, Clock, Check, X, LogOut, Users, Trash, Activity, FileText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import './AdminPage.css';

// Set up worker for PDF.js - using a CDN worker is often easier in these environments
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const AdminPage = () => {
    const [members, setMembers] = useState(() => {
        const saved = localStorage.getItem('tek_reseau_members');
        return saved ? JSON.parse(saved) : [];
    });

    const [activities, setActivities] = useState(() => {
        const saved = localStorage.getItem('tek_reseau_activities');
        return saved ? JSON.parse(saved) : [];
    });

    const [currentActivity, setCurrentActivity] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newActivity, setNewActivity] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        attendance: {}
    });

    const [rawUpload, setRawUpload] = useState('');
    const [isProcessingPdf, setIsProcessingPdf] = useState(false);

    useEffect(() => {
        localStorage.setItem('tek_reseau_members', JSON.stringify(members));
    }, [members]);

    useEffect(() => {
        localStorage.setItem('tek_reseau_activities', JSON.stringify(activities));
    }, [activities]);

    const handleUploadMembers = () => {
        if (!rawUpload.trim()) return;

        const lines = rawUpload.split('\n').filter(l => l.trim() !== '');
        const newMembers = lines.map(line => ({
            id: Math.random().toString(36).substr(2, 9),
            name: line.trim()
        }));

        setMembers([...members, ...newMembers]);
        setRawUpload('');
        alert('Membres ajoutés avec succès !');
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

            // Cleanup text: remove multiple spaces, handle line breaks
            // This is a naive implementation that assumes names are distinct or separated
            const potentialMembers = fullText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 3); // Basic filter for short/junk lines

            setRawUpload(prev => prev + (prev ? '\n' : '') + potentialMembers.join('\n'));
            alert('Texte extrait du PDF ! Vérifiez la liste ci-dessous avant d\'importer.');
        } catch (error) {
            console.error('Erreur PDF:', error);
            alert('Erreur lors de la lecture du PDF.');
        } finally {
            setIsProcessingPdf(false);
            e.target.value = '';
        }
    };

    const handleCreateActivity = () => {
        if (!newActivity.name || !newActivity.date) {
            alert('Veuillez remplir les informations de base.');
            return;
        }

        const activity = {
            ...newActivity,
            id: Date.now(),
            attendance: members.reduce((acc, member) => {
                acc[member.id] = 'none'; // none, present, absent, abandon
                return acc;
            }, {})
        };

        setActivities([...activities, activity]);
        setShowCreateModal(false);
        setNewActivity({ name: '', date: '', startTime: '', endTime: '', attendance: {} });
    };

    const updateAttendance = (activityId, memberId, status) => {
        if (status === 'abandon') {
            const confirmAbandon = window.confirm(`Voulez-vous vraiment retirer définitivement ${members.find(m => m.id === memberId)?.name} de l'association ?`);
            if (confirmAbandon) {
                setMembers(members.filter(m => m.id !== memberId));
                setActivities(activities.map(act => {
                    const newAttendance = { ...act.attendance };
                    delete newAttendance[memberId];
                    return { ...act, attendance: newAttendance };
                }));
                if (currentActivity && currentActivity.id === activityId) {
                    const newAttendance = { ...currentActivity.attendance };
                    delete newAttendance[memberId];
                    setCurrentActivity({ ...currentActivity, attendance: newAttendance });
                }
                return;
            } else {
                return;
            }
        }

        const updatedActivities = activities.map(act => {
            if (act.id === activityId) {
                return {
                    ...act,
                    attendance: { ...act.attendance, [memberId]: status }
                };
            }
            return act;
        });

        setActivities(updatedActivities);
        if (currentActivity && currentActivity.id === activityId) {
            setCurrentActivity({
                ...currentActivity,
                attendance: { ...currentActivity.attendance, [memberId]: status }
            });
        }
    };

    const addMemberToActivity = (member) => {
        if (!currentActivity) return;

        const updatedActivities = activities.map(act => {
            if (act.id === currentActivity.id) {
                return {
                    ...act,
                    attendance: { ...act.attendance, [member.id]: 'none' }
                };
            }
            return act;
        });

        setActivities(updatedActivities);
        setCurrentActivity({
            ...currentActivity,
            attendance: { ...currentActivity.attendance, [member.id]: 'none' }
        });
    };

    const removeMemberFromActivity = (memberId) => {
        if (!currentActivity) return;

        const updatedActivities = activities.map(act => {
            if (act.id === currentActivity.id) {
                const newAttendance = { ...act.attendance };
                delete newAttendance[memberId];
                return { ...act, attendance: newAttendance };
            }
            return act;
        });

        setActivities(updatedActivities);
        const newAttendance = { ...currentActivity.attendance };
        delete newAttendance[memberId];
        setCurrentActivity({ ...currentActivity, attendance: newAttendance });
    };

    return (
        <div className="adminpage animate-fade">
            <header className="admin-header">
                <h1>Espace <span className="gradient-text">Administration</span></h1>
                <p>Gérez les membres et suivez les présences aux activités.</p>
            </header>

            <div className="admin-grid">
                {/* Members Management */}
                <section className="glass-card admin-section">
                    <h2><Users size={24} className="icon-blue" /> Gestion des Membres ({members.length})</h2>

                    <div className="upload-container">
                        <div className="upload-header">
                            <label>Ajouter des membres</label>
                            <div className="upload-actions">
                                <label className="btn-secondary btn-small file-input-label">
                                    <FileText size={16} />
                                    {isProcessingPdf ? 'Extraction...' : 'PDF'}
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handlePdfImport}
                                        style={{ display: 'none' }}
                                        disabled={isProcessingPdf}
                                    />
                                </label>
                            </div>
                        </div>
                        <textarea
                            value={rawUpload}
                            onChange={(e) => setRawUpload(e.target.value)}
                            placeholder="Un nom par ligne..."
                        />
                        <button className="btn-primary" onClick={handleUploadMembers}>
                            <Upload size={18} /> Importer la liste
                        </button>
                    </div>

                    <div className="members-list">
                        {members.length === 0 && <p className="empty-msg">Aucun membre.</p>}
                        {members.map(m => (
                            <div key={m.id} className="member-item">
                                <span>{m.name}</span>
                                <button className="btn-icon" onClick={() => {
                                    if (window.confirm('Supprimer ce membre ?')) setMembers(members.filter(mem => mem.id !== m.id));
                                }}>
                                    <Trash size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Activities Section */}
                <section className="glass-card admin-section">
                    <div className="section-title-row">
                        <h2><Activity size={24} className="icon-cyan" /> Activités</h2>
                        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
                            <Plus size={18} /> Nouvelle
                        </button>
                    </div>

                    <div className="activities-list">
                        {activities.length === 0 && <p className="empty-msg">Aucune activité enregistrée.</p>}
                        {activities.map(act => (
                            <div key={act.id} className="activity-item" onClick={() => setCurrentActivity(act)}>
                                <div className="activity-info">
                                    <h3>{act.name}</h3>
                                    <span><Calendar size={14} /> {act.date} | <Clock size={14} /> {act.startTime} - {act.endTime}</span>
                                </div>
                                <div className="activity-stats">
                                    {Object.values(act.attendance).filter(v => v === 'present').length} Présents
                                </div>
                                <button className="btn-icon trash-activity" onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm('Supprimer cette activité ?')) setActivities(activities.filter(a => a.id !== act.id));
                                }}>
                                    <Trash size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Attendance View */}
            {currentActivity && (
                <div className="modal-overlay">
                    <div className="attendance-view glass-card animate-fade">
                        <div className="attendance-header">
                            <div>
                                <h3>{currentActivity.name}</h3>
                                <p className="date-subtitle">{currentActivity.date} • {currentActivity.startTime} - {currentActivity.endTime}</p>
                            </div>
                            <button className="btn-secondary" onClick={() => setCurrentActivity(null)}>
                                <X size={18} /> Fermer
                            </button>
                        </div>

                        <div className="attendance-registration">
                            <label>Inscrire un membre à cette séance :</label>
                            <div className="registration-controls">
                                <select
                                    className="member-select"
                                    onChange={(e) => {
                                        const member = members.find(m => m.id === e.target.value);
                                        if (member) addMemberToActivity(member);
                                        e.target.value = "";
                                    }}
                                    value=""
                                >
                                    <option value="" disabled>Sélectionner un membre...</option>
                                    {members
                                        .filter(m => !currentActivity.attendance[m.id])
                                        .map(m => (
                                            <option key={m.id} value={m.id}>{m.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="attendance-list">
                            <div className="attendance-summary">
                                <span className="stat-tag present">Présents: {Object.values(currentActivity.attendance).filter(v => v === 'present').length}</span>
                                <span className="stat-tag absent">Absents: {Object.values(currentActivity.attendance).filter(v => v === 'absent').length}</span>
                                <span className="stat-tag total">Total inscrits: {Object.keys(currentActivity.attendance).length}</span>
                            </div>

                            <div className="attendance-scroll-area">
                                {Object.keys(currentActivity.attendance).length === 0 ? (
                                    <p className="empty-msg">Personne n'est inscrit à cette séance.</p>
                                ) : (
                                    Object.keys(currentActivity.attendance).map(memberId => {
                                        const member = members.find(m => m.id === memberId);
                                        if (!member) return null;
                                        const status = currentActivity.attendance[memberId];

                                        return (
                                            <div key={memberId} className={`attendance-card ${status}`}>
                                                <div className="member-info">
                                                    <span className="member-name">{member.name}</span>
                                                    <span className="status-label">{status !== 'none' ? status : 'Non marqué'}</span>
                                                </div>
                                                <div className="attendance-actions">
                                                    <button
                                                        className={`action-btn present ${status === 'present' ? 'active' : ''}`}
                                                        title="Présent"
                                                        onClick={() => updateAttendance(currentActivity.id, memberId, 'present')}
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        className={`action-btn absent ${status === 'absent' ? 'active' : ''}`}
                                                        title="Absent"
                                                        onClick={() => updateAttendance(currentActivity.id, memberId, 'absent')}
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                    <button
                                                        className={`action-btn abandon ${status === 'abandon' ? 'active' : ''}`}
                                                        title="Retirer définitivement"
                                                        onClick={() => updateAttendance(currentActivity.id, memberId, 'abandon')}
                                                    >
                                                        <LogOut size={18} />
                                                    </button>
                                                    <button
                                                        className="action-btn remove"
                                                        title="Désinscrire de cette séance"
                                                        onClick={() => removeMemberFromActivity(memberId)}
                                                    >
                                                        <Trash size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Activity Modal */}
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="glass-card modal-content animate-fade">
                        <h2>Créer une Activité</h2>
                        <div className="form-group">
                            <label>Nom de l'activité</label>
                            <input
                                type="text"
                                value={newActivity.name}
                                onChange={e => setNewActivity({ ...newActivity, name: e.target.value })}
                                placeholder="Ex: TP Sockets C"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={newActivity.date}
                                    onChange={e => setNewActivity({ ...newActivity, date: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Début</label>
                                <input
                                    type="time"
                                    value={newActivity.startTime}
                                    onChange={e => setNewActivity({ ...newActivity, startTime: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Fin</label>
                                <input
                                    type="time"
                                    value={newActivity.endTime}
                                    onChange={e => setNewActivity({ ...newActivity, endTime: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Annuler</button>
                            <button className="btn-primary" onClick={handleCreateActivity}>Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
