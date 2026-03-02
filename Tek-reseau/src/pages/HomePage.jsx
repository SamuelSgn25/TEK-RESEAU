import React from 'react';
import { Network, Server, Code, History, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const testimonials = [
    { name: "Hodavia BANGBOLA", role: "Fondatrice & Ex-Présidente", text: "Tek-Reseau est la concrétisation d'une vision : celle d'une communauté où chaque étudiant peut s'épanouir techniquement à Epitech Bénin." },
    { name: "ALLADASSI Marc-Aurel", text: "Une association qui m'a permis de comprendre les fondamentaux du réseau de manière pratique." },
    { name: "Stella GBENOU", text: "Tek-Reseau est le meilleur endroit pour apprendre l'administration système à Epitech." },
    { name: "Flavio KOUGBADI", text: "Des projets concrets et une équipe passionnée par la technologie." }
  ];

  return (
    <div className="homepage animate-fade">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Fondée en Mars 2024 à Epitech Bénin</div>
          <h1 className="hero-title">Démocratiser l'accès aux <span className="gradient-text">Technologies Réseau</span></h1>
          <p className="hero-subtitle">
            L'association Tek-Reseau accompagne les étudiants dans l'exploration de l'administration système,
            la programmation réseau et les infrastructures informatiques modernes.
          </p>
          <div className="hero-actions">
            <Link to="/about" className="btn-primary">Notre Histoire</Link>
            <Link to="/contact" className="btn-secondary">Nous Contacter</Link>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="story">
        <div className="section-header">
          <History className="section-icon" />
          <h2>Nos Origines</h2>
          <p>Une initiative née de la passion pour le réseau au sein d'Epitech Bénin.</p>
        </div>

        <div className="story-grid">
          <div className="glass-card founder-card">
            <h3>Les Fondateurs</h3>
            <p>
              L'association a été fondée en mars 2024 sous l'initiative de <strong>Hodavia BANGBOLA</strong> (Alumni Promo Bachelor 2027),
              première Présidente pendant deux ans, et <strong>Michael GBEKAN</strong> (Alumni Epitech, Ingénieur Réseau & Fullstack Dev),
              premier Vice-Président.
            </p>
          </div>
          <div className="glass-card founder-card">
            <h3>L'Appui Stratégique</h3>
            <p>
              Avec l'appui de <strong>Andy SAGBO</strong> (Bachelor 2028), premier Secrétaire Général pendant deux mandats, et
              <strong> Samuel SOGLOHOUN</strong> (Alumni Bachelor 2027, Fullstack Dev & Data Analyst), qui a planifié les projets de programmation réseau.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="focus-areas">
        <div className="focus-grid">
          <div className="glass-card focus-item">
            <Server className="focus-icon" />
            <h4>Admin Système</h4>
            <p>Maîtrisez la gestion des serveurs, des services de messagerie et de la sécurité des infrastructures.</p>
          </div>
          <div className="glass-card focus-item">
            <Code className="focus-icon" />
            <h4>Prog. Réseau</h4>
            <p>Apprenez à développer des applications communicantes via sockets, protocoles et API bas niveau.</p>
          </div>
          <div className="glass-card focus-item">
            <Network className="focus-icon" />
            <h4>Topologies Réseau</h4>
            <p>Comprenez le routage, le switching et la mise en place de réseaux complexes et résilients.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <MessageSquare className="section-icon" />
          <h2>Témoignages</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card testimonial-card">
              {t.role && <span className="testimonial-role">{t.role}</span>}
              <p className="testimonial-text">"{t.text}"</p>
              <h5 className="testimonial-author">— {t.name}</h5>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
