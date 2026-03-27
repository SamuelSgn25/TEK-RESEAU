import React from 'react';
import { Award, Briefcase, Mail, User, Image as ImageIcon } from 'lucide-react';
import './BoardPage.css';

const BoardPage = () => {
  const boardMembers = [
    {
      role: 'Présidente Fondatrice, Autorité Suprême',
      name: 'Hodavia BANGBOLA',
      badge: 'Visionary',
      desc: 'Inspiratrice et pilier central de Tek-Reseau, garante de la vision et de la pérennité de l\'association.'
    },
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
    </div>
  );
};

export default BoardPage;
