import React from 'react';
import { History, Calendar, Layout, Users } from 'lucide-react';

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

            <style jsx>{`
        .aboutpage {
          padding-top: 8rem;
          max-width: 1000px;
          margin: 0 auto;
          padding-bottom: 5rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .about-hero {
          text-align: center;
          margin-bottom: 5rem;
        }

        .timeline {
          position: relative;
          padding-left: 2rem;
          border-left: 2px solid var(--glass-border);
          margin-bottom: 6rem;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 4rem;
        }

        .timeline-dot {
          position: absolute;
          left: -2.7rem;
          top: 0;
          width: 20px;
          height: 20px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .timeline-date {
          display: inline-block;
          background: rgba(0, 242, 254, 0.1);
          color: var(--primary);
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .timeline-content h3 {
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .timeline-content p {
          color: var(--text-dim);
          line-height: 1.7;
        }

        .mission-vision {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .section-icon {
          color: var(--primary);
          margin-bottom: 1.5rem;
          width: 40px;
          height: 40px;
        }

        @media (max-width: 768px) {
          .mission-vision {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default AboutPage;
