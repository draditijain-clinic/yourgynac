import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialVideosData } from '../src/data/videos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://yourgynac.vercel.app';

// Static public indexable pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-08-14' },
  { url: '/about', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-14' },
  { url: '/services', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-14' },
  { url: '/online-consultation', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-14' },
  { url: '/health-library', priority: '0.8', changefreq: 'weekly', lastmod: '2026-08-14' },
  { url: '/book', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-14' },
  { url: '/faq', priority: '0.7', changefreq: 'monthly', lastmod: '2026-08-14' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-14' },
  { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly', lastmod: '2026-08-14' },
  { url: '/medical-disclaimer', priority: '0.3', changefreq: 'yearly', lastmod: '2026-08-14' }
];

// Published dynamic health library items (published === true)
const publishedVideos = initialVideosData
  .filter(v => v.published)
  .map(v => ({
    url: `/health-library/${v.slug || v.id}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: v.publishedDate || '2026-08-14'
  }));

const allPages = [...staticPages, ...publishedVideos];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`✓ Dynamic sitemap generated with ${allPages.length} indexable URLs at public/sitemap.xml`);
