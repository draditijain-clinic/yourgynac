import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      stars: 5,
      quote: "Dr. Aditi Jain provided exceptional care during my high-risk pregnancy. She answered all my concerns patiently and kept me calm throughout. Highly recommend her clinic.",
      author: "Priya Sharma",
      label: "Maternity Patient"
    },
    {
      stars: 5,
      quote: "The clinical environment is warm and very professional. Dr. Aditi took her time to educate me about my PCOS treatment plan. I feel so much better now.",
      author: "Anjali Mehta",
      label: "Gynaecology Consultation"
    },
    {
      stars: 5,
      quote: "We are incredibly grateful to Dr. Aditi Jain for her fertility guidance. Her medical expertise, combined with genuine empathy, made our dream come true.",
      author: "Renu & Amit K.",
      label: "Infertility Patient"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const total = reviews.length;
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setActiveIdx((prevIndex) => (prevIndex === total - 1 ? 0 : prevIndex + 1)),
      6000
    );
    return () => resetTimeout();
  }, [activeIdx, total]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="tagline">Patient Stories</span>
          <h2>What Our Patients Say</h2>
        </div>

        <div className="testimonials-carousel">
          <div className="testimonials-viewport">
            <div 
              className="testimonials-slider"
              style={{ transform: `translateX(-${activeIdx * 100}%)` }}
            >
              {reviews.map((rev, idx) => (
                <div key={idx} className="testimonial-slide">
                  <div className="testimonial-stars">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} size={16} fill="#ffb703" stroke="#ffb703" style={{ marginRight: '2px' }} />
                    ))}
                  </div>
                  <p className="testimonial-quote">"{rev.quote}"</p>
                  <h4 className="testimonial-author">{rev.author}</h4>
                  <span className="testimonial-label">{rev.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-btn prev-btn" 
            onClick={handlePrev} 
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            className="carousel-btn next-btn" 
            onClick={handleNext} 
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>

          <div className="carousel-dots">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot ${idx === activeIdx ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-section {
          padding: 100px 0;
          background-color: var(--bg-color);
          overflow: hidden;
          text-align: center;
        }

        .testimonials-carousel {
          position: relative;
          max-width: 800px;
          margin: 40px auto 0;
          padding: 0 20px;
        }

        .testimonials-viewport {
          overflow: hidden;
          width: 100%;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
        }

        .testimonials-slider {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .testimonial-slide {
          min-width: 100%;
          padding: 50px 40px;
          background-color: var(--white);
          border-radius: var(--border-radius);
          border: 1px solid #f1ece1;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .testimonial-quote {
          font-size: 1.15rem;
          font-style: italic;
          color: var(--text-color);
          margin-bottom: 25px;
          line-height: 1.7;
          max-width: 650px;
        }

        .testimonial-author {
          font-size: 1.05rem;
          font-family: var(--font-serif);
          font-weight: 600;
          color: var(--text-color);
          margin-bottom: 4px;
        }

        .testimonial-label {
          font-size: 0.8rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .testimonial-stars {
          margin-bottom: 20px;
          display: flex;
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--white);
          border: 1px solid rgba(0, 0, 0, 0.08);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-color);
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-sm);
          z-index: 10;
        }

        .carousel-btn:hover {
          background-color: var(--primary-light);
          border-color: var(--primary-color);
          color: var(--primary-color);
          transform: translateY(-50%) scale(1.05);
        }

        .carousel-btn.prev-btn {
          left: -10px;
        }

        .carousel-btn.next-btn {
          right: -10px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 25px;
        }

        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #d1d1d1;
          cursor: pointer;
          transition: var(--transition-smooth);
          border: none;
          padding: 0;
        }

        .carousel-dot.active {
          background-color: var(--primary-color);
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .carousel-btn {
            display: none;
          }
          .testimonial-slide {
            padding: 35px 20px;
          }
          .testimonial-quote {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
