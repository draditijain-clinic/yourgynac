import React, { useState, useEffect } from 'react';
import { Search, Play, ArrowLeft, ArrowUpRight, ExternalLink, Eye } from 'lucide-react';
import { initialVideosData, formatStat } from '../data/videos';
import SEO from './SEO';

export default function HealthLibrary({ setPage }) {
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(null);

  useEffect(() => {
    // Check hash for direct video link
    const hash = window.location.hash;
    if (hash.startsWith('#/health-library/')) {
      setActiveSlug(hash.replace('#/health-library/', ''));
    }

    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash.startsWith('#/health-library/')) {
        setActiveSlug(newHash.replace('#/health-library/', ''));
      } else {
        setActiveSlug(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Load from localStorage if edited by admin, else use seed
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

  const publishedVideos = videos.filter(v => v.published).sort((a, b) => a.displayOrder - b.displayOrder);
  const featuredVideos = publishedVideos.filter(v => v.views >= 100000).slice(0, 3);
  
  // Extract unique categories that actually have published videos
  const availableCategories = ["ALL", ...new Set(publishedVideos.map(v => v.category))];

  // Filter videos based on category and search
  const filteredVideos = publishedVideos.filter(v => {
    const matchesCategory = activeCategory === "ALL" || v.category === activeCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVideoClick = (slug) => {
    window.location.hash = `#/health-library/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLibrary = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedVideo = videos.find(v => v.id === activeSlug);

  if (selectedVideo) {
    return (
      <VideoDetailView 
        video={selectedVideo} 
        onBack={handleBackToLibrary} 
        allVideos={publishedVideos} 
        onVideoClick={handleVideoClick} 
        setPage={setPage} 
      />
    );
  }

  return (
    <div className="health-library-wrapper">
      <SEO 
        title="Women's Health Library & Education | Dr. Aditi Jain"
        description="Short, practical health education from Dr. Aditi Jain covering pregnancy, women's health, nutrition and common questions."
      />
      {/* 1. HERO */}
      <section className="hl-hero">
        <div className="container hl-hero-content">
          <span className="eyebrow">HEALTH LIBRARY</span>
          <h1>Women's health, explained simply.</h1>
          <p className="hl-hero-sub">Short, practical health education from Dr. Aditi Jain covering pregnancy, women's health, nutrition and common questions.</p>
          <div className="hl-hero-actions">
            <button className="btn btn-primary" onClick={() => document.getElementById('hl-explore').scrollIntoView({ behavior: 'smooth' })}>
              EXPLORE HEALTH LIBRARY
            </button>
            <a href="https://www.instagram.com/draditi_explains_women/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              FOLLOW ON INSTAGRAM <ArrowUpRight size={16} style={{ marginLeft: '6px' }} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. POPULAR WITH OUR COMMUNITY */}
      {featuredVideos.length > 0 && (
        <section className="hl-featured-section">
          <div className="container">
            <div className="hl-section-header">
              <h2>Popular with our community</h2>
              <p>Some of Dr. Aditi Jain's most-viewed educational videos.</p>
            </div>
            <div className="hl-grid">
              {featuredVideos.map(v => (
                <VideoCard key={v.id} video={v} onClick={() => handleVideoClick(v.id)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. EXPLORE BY TOPIC (Filters) */}
      <section className="hl-explore-section" id="hl-explore">
        <div className="container">
          <div className="hl-filters-header">
            <h2>Explore by Topic</h2>
            <div className="hl-search-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search women's health topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="hl-categories">
            {availableCategories.map(cat => (
              <button 
                key={cat}
                className={`hl-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4. ALL VIDEOS GRID */}
          <div className="hl-grid mt-40">
            {filteredVideos.length > 0 ? (
              filteredVideos.map(v => (
                <VideoCard key={v.id} video={v} onClick={() => handleVideoClick(v.id)} />
              ))
            ) : (
              <div className="hl-no-results">
                <p>No videos found matching your search.</p>
                <button className="btn-text" onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. FOLLOW DR ADITI */}
      <section className="hl-social-section">
        <div className="container text-center">
          <h2>Daily health tips on your feed</h2>
          <p>Join our community on Instagram for evidence-based advice and clinic updates.</p>
          <a href="https://www.instagram.com/draditi_explains_women/" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-20">
            Follow Dr. Aditi Jain <ExternalLink size={16} style={{ marginLeft: '6px' }} />
          </a>
        </div>
      </section>

      {/* 6. BOOK A CONSULTATION */}
      <section className="hl-cta-section">
        <div className="container text-center">
          <p className="cta-eyebrow">Have questions about your health?</p>
          <h2>Let's start with a conversation.</h2>
          <div className="hl-cta-actions">
            <button className="btn btn-primary" onClick={() => setPage('appointment')}>
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      </section>

      <Styles />
    </div>
  );
}

// --- SUB-COMPONENTS ---

function VideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    setIsPlaying(true);
  };

  return (
    <div className="hl-video-card">
      <div className="hl-card-thumb-wrapper" style={{ aspectRatio: '9/16', background: '#000', maxHeight: '480px' }}>
        {isPlaying && video.videoUrl ? (
          <video 
            src={video.videoUrl} 
            controls 
            autoPlay 
            preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            <img src={video.thumbnailUrl || '/images/library-thumbnail.png'} alt={video.title} className="hl-card-thumb" loading="lazy" />
            <div className="hl-play-overlay" style={{ opacity: 1 }} onClick={handlePlayClick}>
              <div className="play-btn-circle" style={{ background: 'var(--primary-color)', border: 'none', width: '56px', height: '56px', boxShadow: '0 4px 15px rgba(92,29,36,0.3)' }}><Play fill="white" size={24} color="white" style={{ marginLeft: '4px' }} /></div>
            </div>
            <div className="hl-duration-badge">{video.duration}</div>
          </>
        )}
      </div>
      
      <div className="hl-card-content">
        <div className="hl-card-meta">
          <span className="hl-cat-badge">{video.category}</span>
          {video.views ? (
            <span className={`hl-stat-views ${video.views >= 100000 ? 'viral-views' : ''}`}>
              <Eye size={12} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle', marginTop: '-2px' }} />
              {formatStat(video.views)} views
            </span>
          ) : video.featured ? (
            <span className="hl-stat-featured">FEATURED VIDEO</span>
          ) : null}
        </div>
        <h3 className="hl-card-title">{video.title}</h3>
        <p className="hl-card-desc">{video.shortDescription}</p>
        
        <div className="hl-card-footer">
          {!isPlaying ? (
            <button className="btn-text" onClick={handlePlayClick} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
              Play Video <Play size={12} style={{ marginLeft: '4px' }} />
            </button>
          ) : (
            <span className="btn-text" style={{ color: '#16a34a' }}>Playing...</span>
          )}
          <a href={video.instagramUrl} target="_blank" rel="noopener noreferrer" className="hl-insta-link">
            INSTAGRAM <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

function VideoDetailView({ video, onBack, allVideos, onVideoClick, setPage }) {
  // Find related videos in the same category
  const relatedVideos = allVideos
    .filter(v => v.category === video.category && v.id !== video.id)
    .slice(0, 3);

  return (
    <div className="hl-detail-wrapper">
      <SEO 
        title={`${video.title} | Dr. Aditi Jain Health Library`}
        description={video.quickAnswer || video.shortDescription}
        path={`/library#${video.slug || video.id}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": video.title,
          "description": video.quickAnswer || video.shortDescription,
          "thumbnailUrl": `https://yourgynac.vercel.app${video.thumbnailUrl}`,
          "uploadDate": video.publishedDate || "2026-08-10",
          "author": {
            "@type": "Person",
            "name": "Dr. Aditi Jain",
            "jobTitle": "Gynaecologist in Jaipur"
          }
        }}
      />
      <div className="container hl-detail-container">
        
        {/* Breadcrumb */}
        <button className="btn-text hl-back-btn" onClick={onBack}>
          <ArrowLeft size={16} style={{ marginRight: '6px' }} /> Back to Health Library
        </button>

        <div className="hl-detail-header">
          <span className="hl-cat-badge">{video.category}</span>
          <h1>{video.title}</h1>
          <div className="hl-detail-meta">
            <span>{video.topic}</span>
            {video.doctorReviewed && <span className="reviewed-badge">✓ Physician Reviewed by Dr. Aditi Jain</span>}
            {video.views && <span>• {formatStat(video.views)} views</span>}
            {video.publishedDate && <span>• {new Date(video.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>}
          </div>
        </div>

        <div className="hl-video-player-container">
          {video.videoUrl ? (
            <video 
              src={video.videoUrl} 
              controls 
              preload="metadata"
              poster={video.thumbnailUrl}
              className="hl-video-player"
            />
          ) : (
            <div className="hl-video-fallback">
              <img src={video.thumbnailUrl} alt={video.title} />
              <div className="fallback-overlay">
                <a href={video.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  WATCH ON INSTAGRAM <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="hl-detail-content">
          {video.quickAnswer && (
            <div className="quick-answer-box" style={{
              background: '#fcfaf6',
              border: '1px solid #e9dede',
              borderLeft: '4px solid var(--primary-color)',
              padding: '20px 24px',
              borderRadius: '8px',
              marginBottom: '30px'
            }}>
              <h4 style={{ color: 'var(--primary-color)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                ⚡ QUICK ANSWER
              </h4>
              <p style={{ fontSize: '1rem', color: 'var(--primary-dark)', margin: 0, lineHeight: '1.6', fontWeight: 500 }}>
                {video.quickAnswer}
              </p>
            </div>
          )}

          <h3>About this video</h3>
          <p>{video.shortDescription}</p>
          
          <div className="hl-medical-disclaimer">
            <strong>Medical Disclaimer:</strong> Educational information only. This content is not a substitute for personalised medical advice, diagnosis or treatment. 
            {video.category.includes('PREGNANCY') && " If you have concerns about your pregnancy, speak with your healthcare professional."}
            {" If you are experiencing a medical emergency, seek immediate medical care."}
          </div>

          <div className="hl-original-source mt-40">
            <h4>Watch the original Reel</h4>
            <a href={video.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              OPEN INSTAGRAM <ArrowUpRight size={16} style={{ marginLeft: '8px' }} />
            </a>
          </div>
        </div>

        {relatedVideos.length > 0 && (
          <div className="hl-related-section mt-60">
            <h3>More from the Health Library</h3>
            <div className="hl-grid mt-20">
              {relatedVideos.map(v => (
                <VideoCard key={v.id} video={v} onClick={() => onVideoClick(v.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Detail CTA */}
        <section className="hl-cta-section detail-cta mt-60">
          <p className="cta-eyebrow">Have questions about your health?</p>
          <h2>Book a consultation with Dr. Aditi Jain.</h2>
          <div className="hl-cta-actions">
            <button className="btn btn-primary" onClick={() => setPage('appointment')}>
              BOOK APPOINTMENT
            </button>
          </div>
        </section>
      </div>
      <Styles />
    </div>
  );
}

// --- CSS STYLES ---

function Styles() {
  return (
    <style>{`
      .health-library-wrapper, .hl-detail-wrapper {
        background-color: var(--white);
        min-height: 100vh;
      }
      
      .eyebrow, .cta-eyebrow {
        font-size: 0.85rem;
        color: var(--accent-color);
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        display: block;
        margin-bottom: 15px;
      }

      /* Hero */
      .hl-hero {
        padding: 100px 0 80px;
        background-color: var(--bg-color);
        text-align: center;
        border-bottom: 1px solid rgba(0,0,0,0.05);
      }
      .hl-hero h1 {
        font-family: var(--font-serif);
        font-size: 3.5rem;
        color: var(--primary-color);
        margin-bottom: 20px;
      }
      .hl-hero-sub {
        font-size: 1.15rem;
        color: var(--text-light);
        max-width: 600px;
        margin: 0 auto 35px;
        line-height: 1.6;
      }
      .hl-hero-actions {
        display: flex;
        justify-content: center;
        gap: 15px;
      }

      /* Sections */
      .hl-featured-section, .hl-explore-section, .hl-social-section {
        padding: 80px 0;
      }
      
      .hl-social-section {
        background-color: var(--primary-light);
        margin-top: 40px;
      }

      .hl-section-header h2, .hl-filters-header h2, .hl-social-section h2, .hl-cta-section h2 {
        font-family: var(--font-serif);
        font-size: 2.2rem;
        color: var(--primary-color);
        margin-bottom: 10px;
      }
      .hl-section-header p {
        color: var(--text-light);
        margin-bottom: 40px;
      }

      /* Grid */
      .hl-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
      }

      /* Video Card */
      .hl-video-card {
        background: var(--white);
        border: 1px solid rgba(0,0,0,0.06);
        border-radius: 16px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        display: flex;
        flex-direction: column;
      }
      .hl-video-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        border-color: var(--accent-color);
      }
      .hl-card-thumb-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 9/16;
        background: #000;
        overflow: hidden;
      }
      .hl-card-thumb {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.85;
        transition: opacity 0.3s ease, transform 0.5s ease;
      }
      .hl-video-card:hover .hl-card-thumb {
        opacity: 0.6;
        transform: scale(1.05);
      }
      .hl-play-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .hl-video-card:hover .hl-play-overlay {
        opacity: 1;
      }
      .play-btn-circle {
        width: 50px;
        height: 50px;
        background: rgba(255,255,255,0.25);
        backdrop-filter: blur(4px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255,255,255,0.5);
      }
      .hl-duration-badge {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        color: #fff;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 600;
      }
      .hl-card-content {
        padding: 24px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
      .hl-card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      .hl-cat-badge {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--primary-color);
        background: var(--bg-color);
        padding: 4px 8px;
        border-radius: 4px;
      }
      .hl-stat-views {
        font-size: 0.75rem;
        color: var(--text-light);
        font-weight: 500;
        display: inline-flex;
        align-items: center;
      }
      .hl-stat-views.viral-views {
        color: #d97706;
        font-weight: 700;
        background: #fef3c7;
        padding: 2px 8px;
        border-radius: 12px;
        border: 1px solid rgba(217, 119, 6, 0.15);
      }
      .hl-stat-featured {
        font-size: 0.7rem;
        color: var(--accent-color);
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      .hl-card-title {
        font-family: var(--font-serif);
        font-size: 1.25rem;
        color: var(--primary-color);
        margin-bottom: 10px;
        line-height: 1.3;
      }
      .hl-card-desc {
        font-size: 0.9rem;
        color: var(--text-light);
        line-height: 1.5;
        margin-bottom: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .hl-card-footer {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(0,0,0,0.05);
        padding-top: 15px;
      }
      .hl-insta-link {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--text-light);
        display: flex;
        align-items: center;
        gap: 4px;
        transition: color 0.2s ease;
      }
      .hl-insta-link:hover { color: var(--accent-color); }

      /* Filters & Search */
      .hl-filters-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 25px;
      }
      .hl-search-box {
        position: relative;
        width: 300px;
      }
      .hl-search-box input {
        width: 100%;
        padding: 12px 16px 12px 40px;
        border: 1px solid #ddd;
        border-radius: 30px;
        font-family: var(--font-sans);
        font-size: 0.9rem;
        outline: none;
        transition: border-color 0.3s ease;
      }
      .hl-search-box input:focus { border-color: var(--primary-color); }
      .search-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
      }
      .hl-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 40px;
      }
      .hl-cat-btn {
        padding: 8px 16px;
        border: 1px solid #eee;
        background: var(--white);
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-color);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .hl-cat-btn:hover { border-color: #ccc; }
      .hl-cat-btn.active {
        background: var(--primary-color);
        color: var(--white);
        border-color: var(--primary-color);
      }

      .hl-no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 0;
        color: var(--text-light);
      }

      /* CTA */
      .hl-cta-section {
        background-color: var(--bg-color);
        padding: 80px 0;
        border-top: 1px solid #f1ece1;
      }
      .detail-cta {
        border-radius: 20px;
        margin-bottom: 80px;
        background-color: var(--primary-light);
      }
      .hl-cta-actions {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 30px;
      }

      /* --- DETAIL VIEW --- */
      .hl-detail-container {
        max-width: 900px;
        padding: 60px 20px;
      }
      .hl-back-btn {
        display: inline-flex;
        align-items: center;
        margin-bottom: 30px;
        color: var(--text-light);
      }
      .hl-back-btn:hover { color: var(--primary-color); }
      
      .hl-detail-header { text-align: center; margin-bottom: 40px; }
      .hl-detail-header h1 {
        font-family: var(--font-serif);
        font-size: 2.8rem;
        color: var(--primary-color);
        margin: 15px 0;
      }
      .hl-detail-meta {
        display: flex;
        justify-content: center;
        gap: 10px;
        color: var(--text-light);
        font-size: 0.95rem;
        flex-wrap: wrap;
      }
      .reviewed-badge {
        color: var(--accent-color);
        font-weight: 600;
      }
      
      .hl-video-player-container {
        width: 100%;
        max-width: 380px;
        margin: 0 auto 40px;
        border-radius: 16px;
        overflow: hidden;
        background: #000;
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        aspect-ratio: 9/16;
        border: 1px solid rgba(0,0,0,0.1);
      }
      .hl-video-player {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .hl-video-fallback {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .hl-video-fallback img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.6;
      }
      .fallback-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hl-detail-content h3, .hl-detail-content h4 {
        font-family: var(--font-serif);
        font-size: 1.6rem;
        color: var(--primary-color);
        margin-bottom: 15px;
      }
      .hl-detail-content p {
        font-size: 1.1rem;
        line-height: 1.7;
        color: var(--text-color);
        margin-bottom: 30px;
      }
      .hl-medical-disclaimer {
        background: var(--bg-color);
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid var(--accent-color);
        font-size: 0.9rem;
        color: var(--text-light);
        line-height: 1.5;
      }

      /* Utils */
      .mt-20 { margin-top: 20px; }
      .mt-40 { margin-top: 40px; }
      .mt-60 { margin-top: 60px; }
      .text-center { text-align: center; }

      /* Responsive */
      @media (max-width: 992px) {
        .hl-grid { grid-template-columns: repeat(2, 1fr); }
        .hl-filters-header { flex-direction: column; align-items: flex-start; gap: 20px; }
        .hl-search-box { width: 100%; }
      }
      @media (max-width: 768px) {
        .hl-hero h1 { font-size: 2.5rem; }
        .hl-hero-actions, .hl-cta-actions { flex-direction: column; }
        .hl-grid { grid-template-columns: 1fr; }
        .hl-detail-header h1 { font-size: 2rem; }
      }
    `}</style>
  );
}
