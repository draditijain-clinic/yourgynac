import React from 'react';
import { Sparkles, MessageCircle, HeartPulse } from 'lucide-react';

export default function Features() {
  const cards = [
    {
      icon: <Sparkles size={24} color="var(--primary-color)" />,
      title: "Private & Comfortable",
      desc: "Our secure video consultations offer a private, confidential, and comfortable remote environment where you can discuss your health challenges with peace of mind."
    },
    {
      icon: <MessageCircle size={24} color="var(--primary-color)" />,
      title: "Personalised Consultation",
      desc: "Every consultation is custom-tailored to the individual patient, allowing ample time for education, discussion, and clear answers."
    },
    {
      icon: <HeartPulse size={24} color="var(--primary-color)" />,
      title: "Evidence-Based Care",
      desc: "All clinical recommendations, diagnostic protocols, and treatments align with verified medical guidelines and standard clinical practices."
    }
  ];

  return (
    <section className="listening-section">
      <div className="container">
        <div className="section-header">
          <span className="tagline">Clinical Philosophy</span>
          <h2>Care that starts with listening</h2>
          <p>
            We believe that high-quality women's healthcare requires time, attention, and a patient-first clinical environment.
          </p>
        </div>

        <div className="listening-grid">
          {cards.map((card, idx) => (
            <div key={idx} className="listening-card">
              <div className="card-icon-wrapper">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .listening-section {
          background-color: var(--white);
          padding: 100px 0;
          text-align: center;
        }

        .listening-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .listening-card {
          padding: 40px 30px;
          border-radius: var(--border-radius);
          background-color: var(--bg-color);
          border: 1px solid #f1ece1;
          text-align: left;
          transition: var(--transition-smooth);
        }

        .listening-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary-light);
        }

        .card-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .listening-card h3 {
          font-size: 1.25rem;
          font-family: var(--font-serif);
          color: var(--primary-color);
          font-weight: 600;
          margin-bottom: 12px;
        }

        .listening-card p {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
