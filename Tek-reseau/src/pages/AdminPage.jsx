import React, { useState, useEffect } from 'react';
import { Upload, Plus, Calendar, Clock, Check, X, LogOut, Users, Trash } from 'lucide-react';

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
                // Remove from members
                setMembers(members.filter(m => m.id !== memberId));
                // Also remove from all current activities attendance
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
                        <label>Ajouter des membres (un nom par ligne)</label>
                        <textarea
                            value={rawUpload}
                            onChange={(e) => setRawUpload(e.target.value)}
                            placeholder="Ex: ALLADASSI Marc-Aurel"
                        />
                        <button className="btn-primary" onClick={handleUploadMembers}>
                            <Upload size={18} /> Importer la liste
                        </button>
                    </div>
                    <div className="members-list">
                        {members.map(m => (
                            <div key={m.id} className="member-item">
                                <span>{m.name}</span>
                                <button className="btn-icon" onClick={() => setMembers(members.filter(mem => mem.id !== m.id))}>
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
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Attendance Modal / View */}
            {currentActivity && (
                <div className="attendance-view glass-card animate-fade">
                    <div className="attendance-header">
                        <h3>Présence : {currentActivity.name}</h3>
                        <button className="btn-secondary" onClick={() => setCurrentActivity(null)}>Fermer</button>
                    </div>
                    <div className="attendance-list">
                        <div className="attendance-row header-row">
                            <span>Étudiant</span>
                            <div className="action-labels">
                                <span>Présent</span>
                                <span>Absent</span>
                                <span>Abandon</span>
                            </div>
                        </div>
                        {members.map(m => (
                            <div key={m.id} className="attendance-row">
                                <span className="student-name">{m.name}</span>
                                <div className="attendance-actions">
                                    <button
                                        className={`btn-check ${currentActivity.attendance[m.id] === 'present' ? 'active-present' : ''}`}
                                        onClick={() => updateAttendance(currentActivity.id, m.id, 'present')}
                                    >
                                        <Check size={18} />
                                    </button>
                                    <button
                                        className={`btn-check ${currentActivity.attendance[m.id] === 'absent' ? 'active-absent' : ''}`}
                                        onClick={() => updateAttendance(currentActivity.id, m.id, 'absent')}
                                    >
                                        <X size={18} />
                                    </button>
                                    <button
                                        className={`btn-check ${currentActivity.attendance[m.id] === 'abandon' ? 'active-abandon' : ''}`}
                                        onClick={() => updateAttendance(currentActivity.id, m.id, 'abandon')}
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
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

            <style jsx>{`
        .adminpage {
          padding: 8rem 2rem 5rem 2rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        .admin-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
        }

        .admin-section {
          height: fit-content;
        }

        .admin-section h2 {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .icon-blue { color: #4facfe; }
        .icon-cyan { color: #00f2fe; }

        .upload-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        textarea, input {
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--glass-border);
          padding: 1rem;
          border-radius: 12px;
          color: white;
          font-family: inherit;
        }

        textarea { height: 120px; resize: none; }

        .members-list {
          max-height: 250px;
          overflow-y: auto;
          background: rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 1rem;
        }

        .member-item {
          display: flex;
          justify-content: space-between;
          padding: 0.8rem;
          border-bottom: 1px solid var(--glass-border);
          align-items: center;
        }

        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: var(--transition);
          border: 1px solid transparent;
        }

        .activity-item:hover {
          background: var(--surface-hover);
          border-color: var(--primary);
        }

        .activity-info h3 { font-size: 1.25rem; margin-bottom: 0.3rem; }
        .activity-info span { font-size: 0.85rem; color: var(--text-dim); display: flex; align-items: center; gap: 0.5rem; }

        .activity-stats {
          background: var(--glass-bg);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: var(--primary);
        }

        /* Attendance View */
        .attendance-view {
          position: fixed;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 800px;
          max-height: 80%;
          z-index: 1001;
          background: var(--background);
          padding: 2.5rem;
          overflow-y: auto;
        }

        .attendance-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .attendance-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .attendance-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          padding: 1rem;
          background: var(--surface);
          border-radius: 10px;
          gap: 2rem;
        }

        .header-row {
          background: transparent;
          font-weight: 700;
          color: var(--text-dim);
          font-size: 0.8rem;
          text-transform: uppercase;
        }

        .action-labels {
          display: flex;
          gap: 2rem;
          min-width: 200px;
          justify-content: center;
        }

        .attendance-actions {
          display: flex;
          gap: 1.5rem;
          min-width: 200px;
          justify-content: center;
        }

        .btn-check {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--glass-bg);
          color: var(--text-dim);
          border: 1px solid var(--glass-border);
          justify-content: center;
        }

        .btn-check:hover { background: var(--surface-hover); }

        .active-present { background: rgba(34, 197, 94, 0.2); color: #22c55e; border-color: #22c55e; }
        .active-absent { background: rgba(239, 68, 68, 0.2); color: #ef4444; border-color: #ef4444; }
        .active-abandon { background: rgba(168, 85, 247, 0.2); color: #a855f7; border-color: #a855f7; }

        /* Modals */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1002;
        }

        .modal-content {
          width: 90%;
          max-width: 600px;
        }

        .form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }

        .btn-icon {
          padding: 0.4rem;
          background: transparent;
          color: var(--text-dim);
        }
        .btn-icon:hover { color: #ef4444; }
      `}</style>
        </div>
    );
};

export default AdminPage;
