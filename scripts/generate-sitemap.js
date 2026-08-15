import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialVideosData } from '../src/data/videos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://yourgynac.vercel.app';

const currentDate = new Date().toISOString().split('T')[0];

// Static public indexable pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily', lastmod: currentDate, image: '/images/p1.png', title: 'Dr. Aditi Jain Gynaecologist Jaipur' },
  { url: '/about', priority: '0.9', changefreq: 'weekly', lastmod: currentDate, image: '/images/p2.png', title: 'Dr. Aditi Jain Qualifications & Experience' },
  { url: '/services', priority: '0.9', changefreq: 'weekly', lastmod: currentDate, image: '/images/pic.png', title: 'Gynaecology & Infertility Services Jaipur' },
  { url: '/online-consultation', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
  { url: '/health-library', priority: '0.9', changefreq: 'daily', lastmod: currentDate },
  { url: '/book', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
  { url: '/faq', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
  { url: '/contact', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
  { url: '/privacy-policy', priority: '0.3', changefreq: 'monthly', lastmod: currentDate },
  { url: '/medical-disclaimer', priority: '0.3', changefreq: 'monthly', lastmod: currentDate }
];

// Published dynamic health library items (published === true)
const publishedVideos = initialVideosData
  .filter(v => v.published)
  .map(v => ({
    url: `/health-library/${v.slug || v.id}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: v.publishedDate || currentDate,
    image: v.thumbnailUrl,
    title: v.title
  }));

const allPages = [...staticPages, ...publishedVideos];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.image ? `
    <image:image>
      <image:loc>${BASE_URL}${page.image}</image:loc>
      <image:title>${page.title || 'Dr. Aditi Jain Clinic'}</image:title>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`✓ Dynamic sitemap with Image Schema generated (${allPages.length} indexable URLs) at public/sitemap.xml`);
