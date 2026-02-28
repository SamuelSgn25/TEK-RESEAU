import React from 'react';
import { Award, Briefcase, Mail, User, Image as ImageIcon } from 'lucide-react';

const BoardPage = () => {
  const boardMembers = [
    {
      role: 'Président',
      name: 'Joachim GOEH-AKUE',
      badge: 'Leadership',
      desc: 'Expert en coordination et vision stratégique pour la promotion des technos réseau.'
    },
    {
      role: 'Vice-Président & Ambassadeur',
      name: 'Sedjro OROUNLA',
      badge: 'External Relations',
      desc: 'Représente Tek-Reseau et forge des partenariats techniques durables.'
    },
    {
      role: 'Secrétaire Générale',
      name: 'Olaife ALAO',
      badge: 'Organization',
      desc: 'Garante de la structure administrative et de la communication interne.'
    },
    {
      role: 'Trésorier',
      name: 'Darryl NOUMONVI',
      badge: 'Finance',
      desc: 'Gestion rigoureuse des ressources pour le financement de nos projets techniques.'
    },
    {
      role: 'Chargé des Projets',
      name: 'Karryl SOUMAILA',
      badge: 'Projects',
      desc: 'Supervise la planification et l\'exécution des labs et projets réseau.'
    },
    {
      role: 'Community Manager',
      name: 'Shanya ONILOUDE',
      badge: 'Communication',
      desc: 'Fait rayonner l\'association sur les réseaux et au sein d\'Epitech Bénin.'
    }
  ];

  return (
    <div className="boardpage animate-fade">
      <section className="board-hero">
        <h1 className="hero-title">Le Bureau <span className="gradient-text">2025-2026</span></h1>
        <p className="hero-subtitle">
          Une équipe d'étudiants de la <strong>Promotion Bachelor 2029</strong> (Epitech Bénin),
          engagée pour l'excellence et le partage de connaissances réseau.
        </p>
      </section>

      <div className="board-grid">
        {boardMembers.map((m, idx) => (
          <div key={idx} className="glass-card board-card">
            <div className="board-card-header">
              <div className="board-role">{m.role}</div>
              <div className="board-badge">{m.badge}</div>
            </div>

            <div className="board-photo-placeholder">
              <ImageIcon size={48} className="placeholder-icon" />
              <span>Photo à venir</span>
            </div>

            <div className="board-name">{m.name}</div>
            <p className="board-desc">{m.desc}</p>

            <div className="board-contact">
              <div className="contact-item">
                <Briefcase size={16} /> Promo 2029
              </div>
              <div className="contact-item">
                <User size={16} /> Epitech Bénin
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .boardpage {
          padding-top: 8rem;
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 5rem;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .board-hero {
          text-align: center;
          margin-bottom: 5rem;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-dim);
          max-width: 700px;
          margin: 0 auto;
        }

        .board-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
        }

        .board-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .board-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .board-role {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary);
        }

        .board-badge {
          font-size: 0.75rem;
          background: rgba(0, 242, 254, 0.1);
          border: 1px solid rgba(0, 242, 254, 0.2);
          color: var(--primary);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }

        .board-photo-placeholder {
          height: 200px;
          background: rgba(0,0,0,0.2);
          border: 1px dashed var(--glass-border);
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          color: var(--text-dim);
          margin: 0.5rem 0;
        }

        .placeholder-icon {
          opacity: 0.3;
        }

        .board-name {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--white);
        }

        .board-desc {
          color: var(--text-dim);
          font-size: 1rem;
          line-height: 1.6;
        }

        .board-contact {
          display: flex;
          gap: 1.5rem;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-dim);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BoardPage;
