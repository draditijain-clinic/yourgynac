import React, { useState, useEffect } from 'react';
import { initialReviewsData } from '../../data/reviews';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ rating: 5.0, count: 117 });

  useEffect(() => {
    const saved = localStorage.getItem('google_reviews_data');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(initialReviewsData);
      localStorage.setItem('google_reviews_data', JSON.stringify(initialReviewsData));
    }
  }, []);

  const saveReviews = (newReviews) => {
    setReviews(newReviews);
    localStorage.setItem('google_reviews_data', JSON.stringify(newReviews));
  };

  const togglePublished = (id) => {
    const newReviews = reviews.map(r => {
      if (r.id === id) {
        return { ...r, published: !r.published };
      }
      return r;
    });
    saveReviews(newReviews);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Patient Reviews Management</h2>
          <p>Control the Google Reviews displayed on the website marquee.</p>
        </div>
      </div>

      <div className="admin-grid" style={{ marginBottom: '30px' }}>
        <div className="admin-card">
          <h3>Google Listing Statistics</h3>
          <p className="text-light" style={{ marginBottom: '15px' }}>
            Update these to match your actual Google Maps listing.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Rating (e.g. 5.0)</label>
              <input 
                type="number" 
                className="admin-input-small" 
                value={stats.rating} 
                onChange={(e) => setStats({...stats, rating: e.target.value})}
                step="0.1"
                min="0"
                max="5"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Total Reviews</label>
              <input 
                type="number" 
                className="admin-input-small" 
                value={stats.count} 
                onChange={(e) => setStats({...stats, count: e.target.value})}
              />
            </div>
            <div style={{ alignSelf: 'flex-end' }}>
              <button className="btn btn-outline" style={{ padding: '7px 15px', fontSize: '0.85rem' }}>Save Stats</button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Rating</th>
                <th>Review Snippet</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.author}</strong></td>
                  <td>{r.rating} Stars</td>
                  <td>
                    <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.text}
                    </div>
                  </td>
                  <td>
                    <button 
                      className={`status-badge ${r.published ? 'confirmed' : 'cancelled'}`}
                      onClick={() => togglePublished(r.id)}
                    >
                      {r.published ? 'PUBLISHED' : 'HIDDEN'}
                    </button>
                  </td>
                  <td>
                    <button className="btn-text">Edit Metadata</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .admin-input-small {
          width: 120px;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
