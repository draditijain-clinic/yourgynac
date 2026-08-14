import React, { useState, useEffect } from 'react';
import { initialVideosData } from '../../data/videos';

export default function AdminLibrary() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('health_library_videos');
    if (saved) {
      try {
        const parsedSaved = JSON.parse(saved);
        const merged = initialVideosData.map(seedVideo => {
          const savedVideo = parsedSaved.find(v => v.id === seedVideo.id);
          if (savedVideo) {
            return {
              ...seedVideo,
              views: savedVideo.views !== undefined ? savedVideo.views : seedVideo.views,
              likes: savedVideo.likes !== undefined ? savedVideo.likes : seedVideo.likes,
              comments: savedVideo.comments !== undefined ? savedVideo.comments : seedVideo.comments,
              shares: savedVideo.shares !== undefined ? savedVideo.shares : seedVideo.shares,
              featured: savedVideo.featured !== undefined ? savedVideo.featured : seedVideo.featured,
              published: savedVideo.published !== undefined ? savedVideo.published : seedVideo.published
            };
          }
          return seedVideo;
        });
        setVideos(merged);
        localStorage.setItem('health_library_videos', JSON.stringify(merged));
      } catch (_) {
        setVideos(initialVideosData);
        localStorage.setItem('health_library_videos', JSON.stringify(initialVideosData));
      }
    } else {
      setVideos(initialVideosData);
      localStorage.setItem('health_library_videos', JSON.stringify(initialVideosData));
    }
  }, []);

  const saveVideos = (newVideos) => {
    setVideos(newVideos);
    localStorage.setItem('health_library_videos', JSON.stringify(newVideos));
  };

  const handleStatChange = (id, field, value) => {
    const newVideos = videos.map(v => {
      if (v.id === id) {
        return { ...v, [field]: value === '' ? null : Number(value) };
      }
      return v;
    });
    saveVideos(newVideos);
  };

  const toggleFeatured = (id) => {
    const newVideos = videos.map(v => {
      if (v.id === id) {
        return { ...v, featured: !v.featured };
      }
      return v;
    });
    saveVideos(newVideos);
  };

  const togglePublished = (id) => {
    const newVideos = videos.map(v => {
      if (v.id === id) {
        return { ...v, published: !v.published };
      }
      return v;
    });
    saveVideos(newVideos);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Health Library Management</h2>
          <p>Update Instagram performance metrics and video statuses.</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Video</th>
                <th>Category</th>
                <th>Views (Manual)</th>
                <th>Likes (Manual)</th>
                <th>Status</th>
                <th>Featured</th>
              </tr>
            </thead>
            <tbody>
              {videos.map(v => (
                <tr key={v.id}>
                  <td>
                    <div className="video-cell">
                      <img src={v.thumbnailUrl || '/images/library-thumbnail.png'} alt="" className="admin-thumb" />
                      <div className="video-cell-info">
                        <strong>{v.title}</strong>
                        <span>{v.topic}</span>
                      </div>
                    </div>
                  </td>
                  <td>{v.category}</td>
                  <td>
                    <input 
                      type="number" 
                      className={`admin-input-small ${v.views >= 100000 ? 'highlight-views' : ''}`}
                      value={v.views || ''} 
                      onChange={(e) => handleStatChange(v.id, 'views', e.target.value)} 
                      placeholder="e.g. 15000"
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      className="admin-input-small"
                      value={v.likes || ''} 
                      onChange={(e) => handleStatChange(v.id, 'likes', e.target.value)} 
                      placeholder="e.g. 800"
                    />
                  </td>
                  <td>
                    <button 
                      className={`status-badge ${v.published ? 'confirmed' : 'cancelled'}`}
                      onClick={() => togglePublished(v.id)}
                    >
                      {v.published ? 'PUBLISHED' : 'DRAFT'}
                    </button>
                  </td>
                  <td>
                    <button 
                      className={`status-badge ${v.featured ? 'completed' : 'pending'}`}
                      onClick={() => toggleFeatured(v.id)}
                    >
                      {v.featured ? 'FEATURED' : 'NORMAL'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <style>{`
        .video-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .admin-thumb {
          width: 60px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
        }
        .video-cell-info {
          display: flex;
          flex-direction: column;
        }
        .video-cell-info strong {
          color: var(--primary-color);
          font-size: 0.9rem;
          margin-bottom: 2px;
        }
        .video-cell-info span {
          color: var(--text-light);
          font-size: 0.75rem;
        }
        .admin-input-small {
          width: 100px;
          padding: 6px 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }
        .admin-input-small.highlight-views {
          border-color: #d97706;
          background-color: #fffbeb;
          color: #b45309;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
