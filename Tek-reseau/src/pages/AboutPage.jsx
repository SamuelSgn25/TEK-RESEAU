import React from 'react';
import { History, Calendar, Layout, Users } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const milestones = [
    {
      date: 'Mars 2024',
      title: 'Fondation & Premier Bureau',
      desc: "Création de l'association Tek-Reseau. Établissement de son premier bureau exécutif comptant au total 40 membres motivés par la démocratisation des technologies réseau."
    },
    {
      date: 'Septembre 2024',
      title: 'Nouveau Bureau Exécutif',
      desc: "Mise en place d'un bureau stratégique composé de Hodavia BANGBOLA (Fondatrice & Présidente), Andy SAGBO (Secrétaire Général), Samuel SOGLOHOUN (Chargé d'évènements) et James GBETCHEDJI (Chargé de projets). L'association compte alors une vingtaine de membres actifs."
    },
    {
      date: 'Septembre 2025',
      title: 'Transition vers la Promo 2029',
      desc: "Passage de relais au nouveau Bureau composé d'étudiants de deuxième année (Bachelor 2029) pour poursuivre la mission d'excellence technique et d'entraide."
    }
  ];

  return (
    <div className="aboutpage animate-fade">
      <section className="about-hero">
        <h1 className="hero-title">Notre <span className="gradient-text">Histoire</span></h1>
        <p className="hero-subtitle">Bâtir une communauté d'experts réseau au cœur d'Epitech Bénin.</p>
      </section>

      <section className="timeline">
        {milestones.map((m, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="glass-card timeline-content">
              <div className="timeline-date">{m.date}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mission-vision">
        <div className="glass-card">
          <Layout className="section-icon" />
          <h3>La Mission</h3>
          <p>
            Permettre à chaque étudiant d'Epitech Bénin d'accéder à des connaissances approfondies en administration système,
            programmation réseau et cybersécurité, au-delà du cursus standard.
          </p>
        </div>
        <div className="glass-card">
          <Users className="section-icon" />
          <h3>L'Esprit Tek-Reseau</h3>
          <p>
            Une communauté soudée où les anciens (Alumni Promo 2027, 2028) guident la nouvelle génération (Promo 2029)
            par le partage d'expérience et la réalisation de projets ambitieux.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
