import React, { useState, useEffect } from 'react';
import { Star, ExternalLink, X } from 'lucide-react';
import { getMarqueeReviews, GOOGLE_MAPS_URL } from '../data/reviews';

export default function Reviews({ setPage }) {
  const [reviews, setReviews] = useState([]);
  const [modalReview, setModalReview] = useState(null);

  useEffect(() => {
    // Generate extended array for infinite scroll
    const data = getMarqueeReviews();
    setReviews(data);
  }, []);

  // Split into 3 arrays to have different rows
  // Shuffle logic for rows (just basic shifts)
  const row1 = reviews.slice(0, 12);
  const row2 = [...reviews].reverse().slice(0, 12);
  const row3 = [...reviews.slice(4, 16)];

  const handleCardClick = (r) => {
    setModalReview(r);
  };

  const closeModal = () => setModalReview(null);

  // Stats - placeholder, should be loaded from admin
  const stats = {
    rating: "5.0",
    count: "117" // Placeholder - "Do not hard-code fake numbers. Make these editable" - MVP fallback
  };

  return (
    <section className="reviews-section">
      <div className="container reviews-header">
        <span className="eyebrow">PATIENT EXPERIENCES</span>
        <h2>Kind words from our patients.</h2>
        <p className="reviews-subtext">
          Real experiences shared by patients on Google.
        </p>

        <div className="google-stats">
          <div className="stars-row">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)}
          </div>
          <span className="stats-text">
            <strong>{stats.rating}</strong> on <span style={{ fontWeight: 700, letterSpacing: '-0.3px', margin: '0 2px', display: 'inline-flex' }}><span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span></span> • {stats.count} reviews
          </span>
        </div>

        <a 
          href={GOOGLE_MAPS_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-outline small-btn mt-10"
        >
          VIEW ALL REVIEWS ON GOOGLE <ExternalLink size={14} style={{ marginLeft: '6px' }} />
        </a>
      </div>

      <div className="marquee-wrapper">
        {/* ROW 1: Left -> Right */}
        <div className="marquee-track-container track-left">
          <div className="marquee-track track-1">
            {row1.map((r, i) => (
              <ReviewCard key={`r1-${i}`} review={r} onClick={() => handleCardClick(r)} />
            ))}
            {/* Duplicate for seamless infinite loop */}
            {row1.map((r, i) => (
              <ReviewCard key={`r1-dup-${i}`} review={r} onClick={() => handleCardClick(r)} />
            ))}
          </div>
        </div>

        {/* ROW 2: Right -> Left */}
        <div className="marquee-track-container track-right">
          <div className="marquee-track track-2">
            {row2.map((r, i) => (
              <ReviewCard key={`r2-${i}`} review={r} onClick={() => handleCardClick(r)} />
            ))}
            {row2.map((r, i) => (
              <ReviewCard key={`r2-dup-${i}`} review={r} onClick={() => handleCardClick(r)} />
            ))}
          </div>
        </div>

        {/* ROW 3: Left -> Right */}
        <div className="marquee-track-container track-left desktop-only">
          <div className="marquee-track track-3">
            {row3.map((r, i) => (
              <ReviewCard key={`r3-${i}`} review={r} onClick={() => handleCardClick(r)} />
            ))}
            {row3.map((r, i) => (
              <ReviewCard key={`r3-dup-${i}`} review={r} onClick={() => handleCardClick(r)} />
            ))}
          </div>
        </div>
      </div>

      <div className="reviews-footer container">
        <p className="footer-ask">Have questions about your health?</p>
        <h3 className="footer-cta-head">Let's start with a conversation.</h3>
        <div className="footer-actions">
          <button className="btn btn-primary" onClick={() => setPage('appointment')}>
            BOOK APPOINTMENT
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalReview && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content review-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={20} />
            </button>
            <div className="stars-row mb-15">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="modal-review-text">"{modalReview.text}"</p>
            <div className="modal-review-meta">
              <span className="reviewer-name"> {modalReview.author}</span>
              {modalReview.date && <span className="review-date">{modalReview.date}</span>}
            </div>
            <div className="modal-google-brand">
              <span className="google-icon">
                <svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              </span>
              <span>Google Review</span>
            </div>
            <a 
              href={modalReview.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary modal-out-btn"
            >
              VIEW ON GOOGLE <ExternalLink size={14} style={{ marginLeft: '6px' }} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        .reviews-section {
          padding: 80px 0;
          background-color: var(--bg-color);
          overflow: hidden;
        }

        .reviews-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .reviews-header h2 {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          color: var(--primary-color);
          margin-bottom: 15px;
        }

        .reviews-subtext {
          font-size: 1.1rem;
          color: var(--text-light);
          margin-bottom: 25px;
        }

        .google-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .stars-row {
          display: flex;
          gap: 2px;
        }

        .stats-text {
          font-size: 1.05rem;
          color: var(--text-color);
        }

        .small-btn {
          padding: 10px 20px;
          font-size: 0.85rem;
          border-radius: 20px;
        }
        .mt-10 { margin-top: 10px; }
        .mb-15 { margin-bottom: 15px; }

        /* Marquee Styles */
        .marquee-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px 0;
        }

        .marquee-track-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
        }

        .track-1 { animation: marquee-left 35s linear infinite; }
        .track-2 { animation: marquee-right 42s linear infinite; }
        .track-3 { animation: marquee-left 38s linear infinite; }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        /* Review Card */
        .review-card {
          width: 380px;
          background: var(--white);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 20px;
          padding: 24px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .card-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-color);
          margin: 15px 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-author {
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 10px;
          margin-top: auto;
        }

        .google-brand {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .google-icon {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          border: 1px solid #e2e8f0;
        }

        .reviews-footer {
          text-align: center;
          margin-top: 60px;
          padding-top: 50px;
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        .footer-ask {
          color: var(--text-light);
          font-weight: 500;
          margin-bottom: 10px;
        }

        .footer-cta-head {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: var(--primary-color);
          margin-bottom: 30px;
        }

        .footer-actions {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .review-modal {
          max-width: 500px;
          text-align: left;
          padding: 40px;
        }

        .modal-review-text {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-color);
          margin-bottom: 25px;
        }

        .modal-review-meta {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }

        .reviewer-name {
          font-weight: 600;
          color: var(--primary-color);
        }

        .review-date {
          color: var(--text-light);
          font-size: 0.9rem;
        }

        .modal-google-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-light);
          margin-bottom: 25px;
          font-weight: 500;
        }
        
        .modal-out-btn {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* Accessibility: Prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            overflow-x: auto;
            flex-wrap: nowrap;
          }
          .marquee-track-container {
            mask-image: none;
            -webkit-mask-image: none;
            overflow-x: auto;
          }
        }

        @media (max-width: 992px) {
          .review-card { width: 320px; }
          .desktop-only { display: none; }
        }

        @media (max-width: 768px) {
          .review-card { width: 290px; }
          .reviews-header h2 { font-size: 2.2rem; }
          .footer-cta-head { font-size: 1.8rem; }
          .footer-actions { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}

function ReviewCard({ review, onClick }) {
  return (
    <div className="review-card" onClick={onClick}>
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
      </div>
      <p className="card-text">"{review.text}"</p>
      <span className="card-author"> {review.author}</span>
      <div className="google-brand">
        <span className="google-icon">
          <svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
        </span>
        <span>Google Review</span>
      </div>
    </div>
  );
}
