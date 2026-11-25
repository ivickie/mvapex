import { writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { SITE, PORTFOLIO_CATEGORIES } from '../src/data/site.mjs';
import { PROJECTS } from '../src/data/projects.mjs';
import { SERVICES } from '../src/data/services.mjs';
import { ARTICLES } from '../src/data/articles.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function writePage(relPath, content) {
  const fullPath = resolve(ROOT, relPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content, 'utf8');
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const ICONS = {
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`,
  code: `<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/></svg>`,
  monitor: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  building: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  trend: `<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  map: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>`
};

const SERVICE_ICONS = {
  'custom-software-development': ICONS.code,
  'saas-development': ICONS.cloud,
  'enterprise-software-development': ICONS.layers,
  'website-design-and-development': ICONS.globe,
  'ai-application-development': ICONS.cpu,
  'desktop-application-development': ICONS.monitor,
  'church-management-software': ICONS.building,
  'it-consulting': ICONS.compass,
  'digital-marketing-and-seo': ICONS.trend,
  'product-strategy-and-management': ICONS.map
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}${SITE.logo}`,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phoneHref,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.countryCode
  },
  areaServed: [
    { '@type': 'Country', name: 'Nigeria' },
    { '@type': 'Place', name: 'Global' }
  ],
  sameAs: [SITE.socials.facebook, SITE.socials.github]
};

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`
    }))
  };
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };
}

function renderHeader(activeNav) {
  const navItems = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/services', label: 'Services', key: 'services' },
    { href: '/portfolio', label: 'Portfolio', key: 'portfolio' },
    { href: '/insights', label: 'Insights', key: 'insights' },
    { href: '/cost-calculator', label: 'Cost Calculator', key: 'calculator' },
    { href: '/about', label: 'About', key: 'about' }
  ];

  const desktopLinks = navItems
    .map(
      (n) =>
        `<a href="${n.href}" class="nav-link${activeNav === n.key ? ' active' : ''}"${
          activeNav === n.key ? ' aria-current="page"' : ''
        }>${n.label}</a>`
    )
    .join('\n          ');

  const mobileLinks = navItems
    .map(
      (n) =>
        `<a href="${n.href}" class="nav-link${activeNav === n.key ? ' active' : ''}">${n.label}</a>`
    )
    .join('\n      ');

  return `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header class="header" id="header">
    <div class="container header-inner">
      <a href="/" class="brand-logo" aria-label="MV-Apex Digital Solutions Home">
        <img src="${SITE.logo}" alt="MV-Apex Digital Solutions Logo" width="150" height="40">
      </a>

      <nav class="nav-desktop" aria-label="Primary Navigation">
        ${desktopLinks}
      </nav>

      <div class="header-actions">
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle color theme" aria-pressed="false">
          <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 17a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1ZM4.22 5.64a1 1 0 0 1 1.42-1.42l1.41 1.42a1 1 0 0 1-1.41 1.41L4.22 5.64Zm12.73 12.73a1 1 0 0 1 1.41-1.41l1.42 1.41a1 1 0 0 1-1.42 1.42l-1.41-1.42ZM2 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm17 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM5.64 19.78a1 1 0 0 1-1.42-1.42l1.42-1.41a1 1 0 1 1 1.41 1.41l-1.41 1.42ZM18.36 7.05a1 1 0 0 1-1.41-1.41l1.41-1.42a1 1 0 1 1 1.42 1.42l-1.42 1.41Z"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.3 22c5.42 0 9.8-4.38 9.8-9.8 0-3.08-1.42-5.83-3.66-7.63-.3-.24-.74-.06-.79.33-.59 4.14-4.17 7.28-8.47 7.28-2.6 0-4.94-1.15-6.53-2.96-.24-.28-.68-.21-.82.12C1.3 10.37 1 11.66 1 13c0 4.97 4.03 9 9 9 .79 0 1.5-.1 2.3-.3Z"/></svg>
        </button>
        <a href="/contact" class="btn btn-primary btn-sm header-cta">Start a Project</a>
        <button class="menu-toggle" id="menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-drawer">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <nav class="mobile-drawer" id="mobile-drawer" aria-label="Mobile Navigation">
    ${mobileLinks}
    <div class="mobile-cta-group">
      <a href="/contact" class="btn btn-primary">Start a Project</a>
      <a href="${SITE.whatsappHref}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">Chat on WhatsApp</a>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="brand-logo" aria-label="MV-Apex Digital Solutions">
            <img src="${SITE.logo}" alt="MV-Apex Digital Solutions Logo" width="150" height="40" loading="lazy">
          </a>
          <p>${SITE.legalName} (${SITE.rcNumber}) is a Nigerian software engineering and digital transformation company serving businesses and institutions locally and globally from Abuja, Nigeria.</p>
          <div class="footer-socials">
            <a href="${SITE.socials.github}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="MV-Apex on GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12Z"/></svg>
            </a>
            <a href="${SITE.socials.facebook}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="MV-Apex on Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0Z"/></svg>
            </a>
            <a href="${SITE.whatsappHref}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Chat with MV-Apex on WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.55 4.16 1.6 5.98L0 24l6.23-1.63a11.9 11.9 0 0 0 5.83 1.49h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.24-6.2-3.51-8.42Zm-8.46 18.36h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.7.97.99-3.6-.24-.37a9.9 9.9 0 0 1-1.52-5.28c0-5.48 4.46-9.94 9.95-9.94 2.66 0 5.15 1.03 7.03 2.91a9.88 9.88 0 0 1 2.91 7.03c0 5.49-4.46 9.94-9.95 9.94Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h3>Engineering</h3>
          <div class="footer-links">
            <a href="/services/custom-software-development">Custom Software</a>
            <a href="/services/saas-development">SaaS Development</a>
            <a href="/services/enterprise-software-development">Enterprise Software</a>
            <a href="/services/ai-application-development">AI Applications</a>
            <a href="/services/desktop-application-development">Desktop Software</a>
            <a href="/services/church-management-software">Church Management Systems</a>
          </div>
        </div>

        <div class="footer-col">
          <h3>Strategy &amp; Growth</h3>
          <div class="footer-links">
            <a href="/services/website-design-and-development">Web Design &amp; Development</a>
            <a href="/services/it-consulting">IT Consulting</a>
            <a href="/services/digital-marketing-and-seo">Digital Marketing &amp; SEO</a>
            <a href="/services/product-strategy-and-management">Product Strategy</a>
            <a href="/cost-calculator">Cost Calculator</a>
            <a href="/insights">Insights &amp; Articles</a>
          </div>
        </div>

        <div class="footer-col">
          <h3>Company</h3>
          <div class="footer-links">
            <a href="/about">About MV-Apex</a>
            <a href="/portfolio">Portfolio &amp; Case Studies</a>
            <a href="/contact">Start a Project</a>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
            <a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a>
            <a href="/llms.txt">AI / LLMs Guide</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 ${SITE.legalName} (${SITE.rcNumber}). Abuja, FCT, Nigeria. Serving clients globally.</p>
        <div class="footer-bottom-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function renderLayout({
  title,
  description,
  path,
  activeNav = '',
  ogType = 'website',
  ogImage = SITE.ogImage,
  schemas = [],
  body
}) {
  const canonical = `${SITE.url}${path === '/' ? '/' : path}`;
  const schemaScripts = schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n  ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeAttr(title)}</title>
  <meta name="description" content="${escapeAttr(description)}">
  <meta name="author" content="${SITE.name}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">

  <!-- Search Verification Placeholders (Configure with verified property tokens) -->
  <!-- <meta name="google-site-verification" content="YOUR_GSC_TOKEN"> -->
  <!-- <meta name="msvalidate.01" content="YOUR_BING_TOKEN"> -->

  <link rel="icon" type="image/png" href="${SITE.favicon}">
  <link rel="apple-touch-icon" href="${SITE.favicon}">

  <!-- Open Graph -->
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:image" content="${ogImage}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(title)}">
  <meta name="twitter:description" content="${escapeAttr(description)}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">

  <!-- Prevent Theme Flash -->
  <script>
    (function () {
      try {
        var saved = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
      } catch (e) {}
    })();
  </script>

  <link rel="stylesheet" href="/style.css">
  ${schemaScripts}
</head>
<body>
  ${renderHeader(activeNav)}
  <main id="main-content">
    ${body}
  </main>
  ${renderFooter()}
  <script type="module" src="/main.js"></script>
</body>
</html>`;
}

function renderProjectVisual(project, loading = 'lazy') {
  if (project.image) {
    return `<img src="${project.image}" alt="${escapeAttr(project.imageAlt)}" loading="${loading}" width="800" height="500">`;
  }
  const modulesHtml = (project.previewModules || [])
    .map(
      (m) => `
      <div class="preview-module">
        <strong>${m.title}</strong>
        <span>${m.desc}</span>
      </div>`
    )
    .join('');

  return `
    <div class="product-preview-frame ${project.previewTheme || ''}" role="img" aria-label="${escapeAttr(project.imageAlt)}">
      <div class="preview-topbar">
        <span>${project.previewHeader}</span>
        <span>Architecture Preview</span>
      </div>
      <div class="preview-modules">${modulesHtml}</div>
      <div class="preview-caption">
        <span>${project.productType}</span>
        <span>Visual schematic · Live UI screens available on request</span>
      </div>
    </div>`;
}

function renderPortfolioCard(project) {
  return `
    <article class="card portfolio-card portfolio-item" data-categories="${project.categories.join(',')}">
      <div class="portfolio-media">
        <div class="portfolio-badges">
          ${project.categoryLabels.map((l) => `<span class="badge badge-primary">${l}</span>`).join('')}
        </div>
        ${renderProjectVisual(project)}
      </div>
      <div class="portfolio-body">
        <div class="portfolio-meta">${project.industry} · ${project.productType}</div>
        <h3><a href="/portfolio/${project.slug}">${project.name}</a></h3>
        <p>${project.summary}</p>
        <div class="portfolio-footer">
          <a href="/portfolio/${project.slug}" class="card-link">Read Case Study ${ICONS.arrow}</a>
          ${
            project.liveUrl
              ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Live Site</a>`
              : ''
          }
        </div>
      </div>
    </article>`;
}

function renderEstimatorSection() {
  return `
  <div class="estimator-shell" id="cost-estimator-app">
    <div class="estimator-grid">
      <div>
        <div class="estimator-step">
          <h3 class="estimator-step-title">1. Select Core Capability</h3>
          <div class="estimator-options-grid">
            <label class="est-option est-service-option active">
              <input type="radio" name="est-service" value="saas" checked> SaaS Platform
            </label>
            <label class="est-option est-service-option">
              <input type="radio" name="est-service" value="custom-software"> Custom Software
            </label>
            <label class="est-option est-service-option">
              <input type="radio" name="est-service" value="enterprise"> Enterprise / Church System
            </label>
            <label class="est-option est-service-option">
              <input type="radio" name="est-service" value="ai"> AI Application
            </label>
            <label class="est-option est-service-option">
              <input type="radio" name="est-service" value="desktop"> Desktop Software
            </label>
            <label class="est-option est-service-option">
              <input type="radio" name="est-service" value="web"> Website &amp; Booking
            </label>
            <label class="est-option est-service-option">
              <input type="radio" name="est-service" value="consulting"> IT Consulting
            </label>
            <label class="est-option est-service-option">
              <input type="radio" name="est-service" value="marketing"> Digital Marketing &amp; SEO
            </label>
            <label class="est-option est-service-option">
              <input type="radio" name="est-service" value="product"> Product Strategy
            </label>
          </div>
        </div>

        <div class="estimator-step">
          <div class="estimator-step-title">
            <label for="est-scale">2. Project Complexity &amp; Scale</label>
            <span class="badge badge-primary" id="est-scale-label">Standard Commercial</span>
          </div>
          <input type="range" id="est-scale" class="range-slider" min="0" max="3" step="1" value="1">
          <div class="scale-labels">
            <span>MVP</span>
            <span>Standard</span>
            <span>Multi-Module</span>
            <span>Enterprise</span>
          </div>
        </div>

        <div class="estimator-step">
          <h3 class="estimator-step-title">3. Technical Capabilities Needed</h3>
          <div class="estimator-options-grid">
            <label class="est-option active"><input type="checkbox" name="est-feature" value="auth" checked> Auth &amp; Role Access</label>
            <label class="est-option active"><input type="checkbox" name="est-feature" value="db" checked> Cloud DB &amp; API</label>
            <label class="est-option"><input type="checkbox" name="est-feature" value="payment"> Payment Gateway</label>
            <label class="est-option"><input type="checkbox" name="est-feature" value="admin"> Admin &amp; Reporting</label>
            <label class="est-option"><input type="checkbox" name="est-feature" value="ai_module"> AI / LLM Module</label>
            <label class="est-option"><input type="checkbox" name="est-feature" value="seo"> Technical SEO &amp; GA4</label>
          </div>
        </div>

        <div class="estimator-step">
          <label for="est-timeline" class="estimator-step-title">4. Target Delivery Pace</label>
          <select id="est-timeline" class="form-control">
            <option value="relaxed">Flexible Timeline (Cost-optimized pace)</option>
            <option value="standard" selected>Standard Delivery (Recommended engineering cadence)</option>
            <option value="urgent">Accelerated Delivery (Priority sprint allocation)</option>
          </select>
        </div>
      </div>

      <aside class="estimator-summary" aria-label="Preliminary Cost Projection">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <h3 style="font-size:1.15rem;">Preliminary Projection</h3>
          <div class="currency-switch" role="group" aria-label="Display currency">
            <button type="button" class="currency-btn active" data-currency="USD" aria-pressed="true">USD</button>
            <button type="button" class="currency-btn" data-currency="NGN" aria-pressed="false">NGN</button>
          </div>
        </div>

        <div class="summary-rows">
          <div class="summary-row"><span>Base Capability</span><strong id="out-base">$0</strong></div>
          <div class="summary-row"><span>Scale Multiplier</span><strong id="out-scale">Standard</strong></div>
          <div class="summary-row"><span>Selected Modules</span><strong id="out-features">$0</strong></div>
          <div class="summary-row"><span>Delivery Pace</span><strong id="out-timeline">Standard</strong></div>
        </div>

        <div class="summary-total">
          <div class="summary-total-label">Estimated Budget Range</div>
          <div class="summary-total-value" id="out-total">$0 – $0</div>
          <div class="summary-duration">Projected Timeline: <strong id="out-duration">0 Weeks</strong></div>
        </div>

        <p class="estimate-disclaimer">
          <strong>Important:</strong> Figures shown are preliminary planning projections—not binding quotations. Final pricing and delivery milestones are confirmed after technical discovery and scoping.
        </p>

        <div class="summary-actions">
          <button type="button" class="btn btn-primary" id="estimator-proposal-btn">Request Detailed Proposal</button>
          <a href="${SITE.whatsappHref}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" id="estimator-whatsapp-btn">Share Projection on WhatsApp</a>
        </div>
      </aside>
    </div>
  </div>`;
}

function renderContactSection(heading = 'Start a Project With MV-Apex') {
  return `
  <section class="section" id="contact">
    <div class="container">
      <div class="section-header center">
        <span class="eyebrow">Start a Conversation</span>
        <h2>${heading}</h2>
        <p>Tell us about the software system, SaaS product, website, or digital transformation goal you are planning. Our senior engineering team responds within one business day.</p>
      </div>

      <div class="contact-grid">
        <div class="contact-cards">
          <div class="contact-card">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div>
              <h3>Direct Email</h3>
              <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
              <p><a href="mailto:${SITE.supportEmail}">${SITE.supportEmail}</a></p>
            </div>
          </div>

          <div class="contact-card">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <h3>Phone &amp; WhatsApp</h3>
              <p><a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a></p>
              <p><a href="${SITE.whatsappHref}" target="_blank" rel="noopener noreferrer" style="color:var(--success);font-weight:600;">Chat directly on WhatsApp &rarr;</a></p>
              <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;">${SITE.hours}</p>
            </div>
          </div>

          <div class="contact-card">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <h3>Headquarters &amp; Coverage</h3>
              <p>${SITE.address.full}</p>
              <p style="font-size:0.84rem;color:var(--text-muted);margin-top:4px;">Serving organizations across Nigeria, Africa, and international markets remotely.</p>
            </div>
          </div>
        </div>

        <div class="form-panel">
          <div class="form-feedback" id="form-feedback" role="status" aria-live="polite" tabindex="-1"></div>
          <form id="contact-form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="contact-name" class="form-label">Full Name *</label>
                <input type="text" id="contact-name" class="form-control" placeholder="e.g. Chinedu Okafor" required autocomplete="name">
              </div>
              <div class="form-group">
                <label for="contact-email" class="form-label">Work Email *</label>
                <input type="email" id="contact-email" class="form-control" placeholder="name@company.com" required autocomplete="email">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="contact-company" class="form-label">Organization / Company</label>
                <input type="text" id="contact-company" class="form-control" placeholder="Company or Institution name" autocomplete="organization">
              </div>
              <div class="form-group">
                <label for="contact-service" class="form-label">Primary Capability</label>
                <select id="contact-service" class="form-control">
                  <option value="custom-software">Custom Software Development</option>
                  <option value="saas">SaaS Platform Development</option>
                  <option value="enterprise">Enterprise / Church Management System</option>
                  <option value="ai">AI Application Development</option>
                  <option value="desktop">Desktop Application Development</option>
                  <option value="web">Website Design &amp; Development</option>
                  <option value="consulting">IT Consulting &amp; Architecture</option>
                  <option value="marketing">Digital Marketing &amp; SEO</option>
                  <option value="product">Product Strategy &amp; Management</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="contact-message" class="form-label">Project Brief &amp; Goals *</label>
              <textarea id="contact-message" class="form-control" rows="5" placeholder="Describe the problem you want to solve, key users, desired timeline, or any integrations needed..." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;">Submit Project Enquiry</button>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

/* ==========================================================================
   1. HOMEPAGE
   ========================================================================== */
const HOME_FAQS = [
  {
    q: 'What types of software does MV-Apex Digital Solutions build?',
    a: 'MV-Apex engineers custom business software, multi-tenant SaaS platforms, enterprise and church management systems (such as FPM Global), AI-powered desktop applications (such as GloryBeam), and commercial booking/e-commerce web platforms (such as Susse Wellness Spa).'
  },
  {
    q: 'Where is MV-Apex located and do you work with international clients?',
    a: 'MV-Apex Digital Solutions LTD (RC 9587441) is headquartered in Abuja, FCT, Nigeria, and partners with businesses, startups, and institutions across Nigeria, Africa, Europe, and North America through structured remote delivery.'
  },
  {
    q: 'Is GloryBeam a website or a desktop software product?',
    a: 'GloryBeam is a native desktop software application engineered by MV-Apex for AI-assisted church presentations and live media operations—designed to run reliably offline in media booths rather than as a browser-dependent web app.'
  },
  {
    q: 'How can I estimate the budget and timeline for my software project?',
    a: 'Use our interactive Project Cost & Timeline Estimator on this website to generate a preliminary USD or NGN range, then request a discovery session for a formal scoped engineering proposal.'
  }
];

function buildHomePage() {
  const featuredServices = SERVICES.slice(0, 6);
  const body = `
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <span class="eyebrow">Software Engineering &amp; Digital Transformation · Nigeria &amp; Global</span>
        <h1 class="hero-title">Transforming Complex Ideas Into <span>Powerful Digital Software</span></h1>
        <p class="hero-subtitle">
          MV-Apex Digital Solutions is a Nigerian software engineering partner building custom enterprise systems, multi-tenant SaaS platforms, AI-powered desktop applications, and high-converting commercial web platforms.
        </p>
        <div class="hero-actions">
          <a href="/contact" class="btn btn-primary btn-lg">Start a Project ${ICONS.arrow}</a>
          <a href="/portfolio" class="btn btn-secondary btn-lg">Explore Our Work</a>
        </div>
        <div class="hero-meta">
          <span class="hero-meta-item">${ICONS.check} Registered Entity (${SITE.rcNumber})</span>
          <span class="hero-meta-item">${ICONS.check} Web, SaaS, Enterprise, AI &amp; Desktop</span>
          <span class="hero-meta-item">${ICONS.check} Abuja HQ · Global Delivery</span>
        </div>
      </div>

      <div class="hero-visual">
        <div class="system-window" aria-label="Overview of MV-Apex software engineering systems">
          <div class="window-bar">
            <div class="window-dots"><span></span><span></span><span></span></div>
            <div class="window-url">mvapex.engineering / systems-overview</div>
          </div>
          <div class="window-body">
            <a href="/portfolio/fpm-global" class="arch-card">
              <div class="arch-card-info">
                <h3>FPM Global — Enterprise Management</h3>
                <p>Multi-department institutional administration, RBAC governance, and operational workflows.</p>
              </div>
              <span class="badge badge-primary">Enterprise</span>
            </a>
            <a href="/portfolio/glorybeam" class="arch-card">
              <div class="arch-card-info">
                <h3>GloryBeam — AI Desktop Software</h3>
                <p>AI-assisted church presentation desktop application engineered for live media booths.</p>
              </div>
              <span class="badge badge-accent">AI · Desktop</span>
            </a>
            <a href="/portfolio/susse-wellness-spa" class="arch-card">
              <div class="arch-card-info">
                <h3>Susse Wellness Spa — Booking &amp; Payments</h3>
                <p>Live 4-step reservation platform with Moniepoint/Monnify checkout and OTP guest portal.</p>
              </div>
              <span class="badge badge-success">Live Web</span>
            </a>
            <div class="arch-metrics">
              <div class="arch-metric">
                <strong>SaaS &amp; Cloud</strong>
                <span>Multi-Tenant APIs</span>
              </div>
              <div class="arch-metric">
                <strong>Applied AI</strong>
                <span>Desktop &amp; Web</span>
              </div>
              <div class="arch-metric">
                <strong>Payments</strong>
                <span>Monnify · Paystack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="trust-strip" aria-label="Platforms and engineering standards">
    <div class="container">
      <p class="trust-label">Organizations &amp; Platforms Supported by MV-Apex</p>
      <div class="partners-row">
        <div class="partner-item"><img src="/assets/SusseSpaLogo.png" alt="Susse Wellness Spa" loading="lazy" width="140" height="38"></div>
        <div class="partner-item"><img src="/assets/schoolmanagr-logo.png" alt="SchoolManagr" loading="lazy" width="140" height="38"></div>
        <div class="partner-item"><img src="/assets/realtocreast-logo.png" alt="Realtorcrest" loading="lazy" width="140" height="38"></div>
        <div class="partner-item"><img src="/assets/careerimpactlab-Logos.webp" alt="Career Impact Lab" loading="lazy" width="140" height="38"></div>
      </div>

      <div class="pillars-grid">
        <div class="pillar-card">
          <strong>Engineering Beyond Templates</strong>
          <span>Custom architectures across web, cloud SaaS, enterprise portals, and native desktop software.</span>
        </div>
        <div class="pillar-card">
          <strong>Local &amp; Global Readiness</strong>
          <span>Native Nigerian payment integrations (Monnify, Paystack) alongside international cloud standards.</span>
        </div>
        <div class="pillar-card">
          <strong>Full Code Ownership</strong>
          <span>Clean, documented codebases with transparent IP handoff and zero restrictive vendor lock-in.</span>
        </div>
        <div class="pillar-card">
          <strong>Direct Senior Engineering</strong>
          <span>Work directly with product architects and engineers from discovery through production launch.</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="services">
    <div class="container">
      <div class="section-header center">
        <span class="eyebrow">Core Engineering &amp; Advisory</span>
        <h2>End-to-End Software &amp; Digital Capabilities</h2>
        <p>We partner with founders, enterprises, and institutions to architect, build, and scale dependable technology products.</p>
      </div>

      <div class="grid grid-3">
        ${featuredServices
          .map(
            (s) => `
        <article class="card reveal">
          <div class="service-icon">${SERVICE_ICONS[s.slug] || ICONS.code}</div>
          <h3><a href="/services/${s.slug}">${s.name}</a></h3>
          <p>${s.summary}</p>
          <a href="/services/${s.slug}" class="card-link">Explore ${s.shortName} ${ICONS.arrow}</a>
        </article>`
          )
          .join('')}
      </div>

      <div style="text-align:center;margin-top:40px;">
        <a href="/services" class="btn btn-secondary btn-lg">View All 10 Specialized Services ${ICONS.arrow}</a>
      </div>
    </div>
  </section>

  <section class="section section-alt" id="portfolio">
    <div class="container">
      <div class="section-header center">
        <span class="eyebrow">Selected Portfolio &amp; Case Studies</span>
        <h2>Real Software Delivered Across Industries</h2>
        <p>From commercial booking platforms with live payment gateways to AI-powered desktop software and enterprise church management systems.</p>
      </div>

      <div class="filter-bar" role="group" aria-label="Filter portfolio by category">
        ${PORTFOLIO_CATEGORIES.map(
          (c, i) =>
            `<button type="button" class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${c.key}" aria-pressed="${
              i === 0 ? 'true' : 'false'
            }">${c.label}</button>`
        ).join('')}
      </div>

      <div class="grid grid-2">
        ${PROJECTS.map((p) => renderPortfolioCard(p)).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header center">
        <span class="eyebrow">How We Deliver</span>
        <h2>Structured Engineering From Discovery to Production</h2>
        <p>Every engagement follows a transparent, milestone-driven lifecycle that minimizes technical risk and keeps stakeholders informed.</p>
      </div>
      <div class="process-grid">
        <div class="process-step reveal">
          <span class="step-num">01 / DISCOVERY</span>
          <h3>Architecture &amp; Scope</h3>
          <p>We map business rules, user roles, integrations, and technical risks before writing a single line of production code.</p>
        </div>
        <div class="process-step reveal">
          <span class="step-num">02 / DESIGN</span>
          <h3>UX &amp; System Design</h3>
          <p>Interactive workflows, database schemas, and accessible responsive interfaces aligned with real user habits.</p>
        </div>
        <div class="process-step reveal">
          <span class="step-num">03 / BUILD</span>
          <h3>Iterative Engineering</h3>
          <p>Clean, modular software developed in transparent sprints with regular demos and stakeholder reviews.</p>
        </div>
        <div class="process-step reveal">
          <span class="step-num">04 / LAUNCH</span>
          <h3>QA, Security &amp; Scale</h3>
          <p>Cross-device testing, performance hardening, production deployment, documentation, and ongoing support.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt" id="estimator">
    <div class="container">
      <div class="section-header center">
        <span class="eyebrow">Interactive Planning Tool</span>
        <h2>Project Cost &amp; Timeline Estimator</h2>
        <p>Model your software requirements to generate a preliminary USD or NGN budget range and delivery timeline before scheduling a discovery call.</p>
      </div>
      ${renderEstimatorSection()}
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header center">
        <span class="eyebrow">Engineering &amp; Strategy Insights</span>
        <h2>Practical Guides for Technology Decision-Makers</h2>
        <p>Original technical articles covering software budgets in Nigeria, SaaS architecture, enterprise systems, and applied AI.</p>
      </div>
      <div class="grid grid-3">
        ${ARTICLES.slice(0, 3)
          .map(
            (a) => `
        <article class="card reveal">
          <div style="margin-bottom:14px;display:flex;gap:8px;align-items:center;">
            <span class="badge badge-neutral">${a.category}</span>
            <span style="font-size:0.8rem;color:var(--text-muted);">${a.readTime}</span>
          </div>
          <h3><a href="/insights/${a.slug}">${a.title}</a></h3>
          <p>${a.excerpt}</p>
          <a href="/insights/${a.slug}" class="card-link">Read Article ${ICONS.arrow}</a>
        </article>`
          )
          .join('')}
      </div>
      <div style="text-align:center;margin-top:36px;">
        <a href="/insights" class="btn btn-secondary">Browse All ${ARTICLES.length} Insights ${ICONS.arrow}</a>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-header center">
        <span class="eyebrow">Direct Answers</span>
        <h2>Frequently Asked Questions</h2>
        <p>Clear, factual answers about working with MV-Apex Digital Solutions.</p>
      </div>
      <div class="faq-list">
        ${HOME_FAQS.map(
          (f, idx) => `
        <details class="faq-item"${idx === 0 ? ' open' : ''}>
          <summary>${f.q}</summary>
          <div class="faq-answer">${f.a}</div>
        </details>`
        ).join('')}
      </div>
    </div>
  </section>

  ${renderContactSection('Ready to Build Reliable Software?')}`;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { '@id': `${SITE.url}/#organization` }
  };

  return renderLayout({
    title: 'MV-Apex Digital Solutions | Software Engineering, SaaS, AI & Enterprise Systems in Nigeria',
    description:
      'MV-Apex Digital Solutions is a Nigerian software engineering and digital transformation company building custom software, SaaS platforms, enterprise church management systems, AI desktop apps, and commercial web platforms.',
    path: '/',
    activeNav: 'home',
    schemas: [ORGANIZATION_SCHEMA, websiteSchema, faqSchema(HOME_FAQS)],
    body
  });
}

/* ==========================================================================
   2. SERVICES HUB & 10 DEDICATED SERVICE PAGES
   ========================================================================== */
function buildServicesHub() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' }
  ];

  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <span aria-current="page">Services</span>
      </nav>
      <span class="eyebrow">10 Core Capabilities</span>
      <h1>Software Engineering, AI &amp; Digital Transformation Services</h1>
      <p class="page-hero-lead">We architect and deliver reliable software systems—from custom business applications and multi-tenant SaaS platforms to AI-powered desktop software and enterprise management solutions.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid grid-3">
        ${SERVICES.map(
          (s) => `
        <article class="card">
          <div class="service-icon">${SERVICE_ICONS[s.slug] || ICONS.code}</div>
          <span class="badge badge-neutral" style="align-self:flex-start;margin-bottom:12px;">${s.eyebrow}</span>
          <h3><a href="/services/${s.slug}">${s.name}</a></h3>
          <p>${s.summary}</p>
          <a href="/services/${s.slug}" class="card-link">View Full Service Details ${ICONS.arrow}</a>
        </article>`
        ).join('')}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="cta-banner">
        <h2>Not Sure Which Architecture Fits Your Goal?</h2>
        <p>Start with our interactive Cost &amp; Timeline Estimator or speak directly with our senior engineers for an honest technical recommendation.</p>
        <div class="cta-banner-actions">
          <a href="/contact" class="btn btn-primary btn-lg">Start a Project</a>
          <a href="/cost-calculator" class="btn btn-secondary btn-lg">Open Cost Calculator</a>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'Software Development & IT Services in Nigeria | MV-Apex Digital Solutions',
    description:
      'Explore MV-Apex services: Custom Software Development, SaaS Development, Enterprise Software, AI Applications, Desktop Software, Church Management Systems, Web Development, IT Consulting, SEO, and Product Strategy.',
    path: '/services',
    activeNav: 'services',
    schemas: [ORGANIZATION_SCHEMA, breadcrumbSchema(crumbs)],
    body
  });
}

function buildServicePage(service) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path: `/services/${service.slug}` }
  ];

  const related = PROJECTS.filter((p) => service.relatedProjects.includes(p.slug));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: ['Nigeria', 'Global'],
    url: `${SITE.url}/services/${service.slug}`
  };

  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <a href="/services">Services</a> <span>/</span> <span aria-current="page">${service.name}</span>
      </nav>
      <span class="eyebrow">${service.eyebrow}</span>
      <h1>${service.heroHeadline}</h1>
      <p class="page-hero-lead">${service.intro}</p>
      <div class="hero-actions">
        <a href="/contact" class="btn btn-primary btn-lg">Start a ${service.shortName} Project ${ICONS.arrow}</a>
        <a href="/cost-calculator" class="btn btn-secondary btn-lg">Estimate Project Cost</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid grid-2" style="gap:40px;align-items:start;">
        <div class="prose">
          <h2 style="margin-top:0;">How MV-Apex Delivers ${service.name}</h2>
          ${service.details.map((p) => `<p>${p}</p>`).join('')}
          <h3>Business Benefits</h3>
          <ul class="check-list">
            ${service.benefits.map((b) => `<li>${b}</li>`).join('')}
          </ul>
        </div>

        <div class="card">
          <h2 style="font-size:1.35rem;margin-bottom:16px;">Core Technical Capabilities</h2>
          <ul class="check-list" style="margin-bottom:24px;">
            ${service.capabilities.map((c) => `<li>${c}</li>`).join('')}
          </ul>
          <a href="/contact" class="btn btn-primary" style="width:100%;">Request Technical Consultation</a>
        </div>
      </div>
    </div>
  </section>

  ${
    related.length
      ? `
  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Relevant Experience</span>
        <h2>Related Projects &amp; Case Studies</h2>
        <p>Verified software solutions demonstrating our experience in ${service.name.toLowerCase()}.</p>
      </div>
      <div class="grid grid-2">
        ${related.map((p) => renderPortfolioCard(p)).join('')}
      </div>
    </div>
  </section>`
      : ''
  }

  <section class="section">
    <div class="container">
      <div class="section-header center">
        <span class="eyebrow">Service FAQs</span>
        <h2>Common Questions About ${service.name}</h2>
      </div>
      <div class="faq-list">
        ${service.faqs
          .map(
            (f, i) => `
        <details class="faq-item"${i === 0 ? ' open' : ''}>
          <summary>${f.q}</summary>
          <div class="faq-answer">${f.a}</div>
        </details>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="cta-banner">
        <h2>Ready to Discuss Your ${service.shortName} Requirements?</h2>
        <p>Share your objectives with our Abuja-based engineering team for a clear architecture plan and realistic delivery timeline.</p>
        <div class="cta-banner-actions">
          <a href="/contact" class="btn btn-primary btn-lg">Start a Project</a>
          <a href="${SITE.whatsappHref}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">Chat on WhatsApp</a>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    activeNav: 'services',
    schemas: [ORGANIZATION_SCHEMA, serviceSchema, breadcrumbSchema(crumbs), faqSchema(service.faqs)],
    body
  });
}

/* ==========================================================================
   3. PORTFOLIO HUB & 7 DEDICATED CASE-STUDY PAGES
   ========================================================================== */
function buildPortfolioHub() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' }
  ];

  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <span aria-current="page">Portfolio</span>
      </nav>
      <span class="eyebrow">Engineering Portfolio</span>
      <h1>Case Studies Across Enterprise, SaaS, AI, Desktop &amp; Web</h1>
      <p class="page-hero-lead">Real software systems engineered by MV-Apex Digital Solutions—spanning commercial booking and payments, AI-powered desktop software, enterprise church management, and EdTech SaaS.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="filter-bar" role="group" aria-label="Filter portfolio by category">
        ${PORTFOLIO_CATEGORIES.map(
          (c, i) =>
            `<button type="button" class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${c.key}" aria-pressed="${
              i === 0 ? 'true' : 'false'
            }">${c.label}</button>`
        ).join('')}
      </div>

      <div class="grid grid-2">
        ${PROJECTS.map((p) => renderPortfolioCard(p)).join('')}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="cta-banner">
        <h2>Have a Complex Product or Operational Challenge?</h2>
        <p>Tell us what you are building and we will walk you through how we would architect and deliver it.</p>
        <div class="cta-banner-actions">
          <a href="/contact" class="btn btn-primary btn-lg">Start a Project</a>
          <a href="/cost-calculator" class="btn btn-secondary btn-lg">Estimate Project Cost</a>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'Software Engineering Portfolio & Case Studies | MV-Apex Digital Solutions',
    description:
      'Explore MV-Apex case studies: Susse Wellness Spa booking platform, GloryBeam AI desktop software, FPM Global enterprise church management, SchoolManagr SaaS, Realtorcrest, Career Impact Lab, and Lumina CRM.',
    path: '/portfolio',
    activeNav: 'portfolio',
    schemas: [ORGANIZATION_SCHEMA, breadcrumbSchema(crumbs)],
    body
  });
}

function buildCaseStudyPage(project) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: project.name, path: `/portfolio/${project.slug}` }
  ];

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': project.schemaType || 'SoftwareApplication',
    name: project.name,
    applicationCategory: project.productType,
    operatingSystem: project.operatingSystem,
    description: project.summary,
    creator: { '@id': `${SITE.url}/#organization` },
    ...(project.liveUrl ? { url: project.liveUrl } : { url: `${SITE.url}/portfolio/${project.slug}` })
  };

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 2);

  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <a href="/portfolio">Portfolio</a> <span>/</span> <span aria-current="page">${project.name}</span>
      </nav>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
        ${project.categoryLabels.map((l) => `<span class="badge badge-primary">${l}</span>`).join('')}
      </div>
      <h1>${project.name}</h1>
      <p class="page-hero-lead">${project.summary}</p>
      <div class="hero-actions">
        ${
          project.liveUrl
            ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">Visit Live Platform ${ICONS.arrow}</a>`
            : `<a href="/contact" class="btn btn-primary btn-lg">Request Product Walkthrough ${ICONS.arrow}</a>`
        }
        <a href="/contact" class="btn btn-secondary btn-lg">Build a Similar Solution</a>
      </div>

      <div class="case-meta-grid">
        <div class="case-meta-box"><span>Industry</span><strong>${project.industry}</strong></div>
        <div class="case-meta-box"><span>Product Type</span><strong>${project.productType}</strong></div>
        <div class="case-meta-box"><span>Deployment</span><strong>${project.location}</strong></div>
        <div class="case-meta-box"><span>Engineering Partner</span><strong>${SITE.name}</strong></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="portfolio-media" style="border-radius:var(--radius-lg);border:1px solid var(--border-strong);margin-bottom:48px;aspect-ratio:16/9;">
        ${renderProjectVisual(project, 'eager')}
      </div>

      <div class="grid grid-2" style="gap:40px;align-items:start;">
        <div class="prose">
          <h2 style="margin-top:0;">1. Project Overview</h2>
          <p>${project.overview}</p>

          <h2>2. Business Problem &amp; Opportunity</h2>
          <p>${project.problem}</p>

          <h2>3. Solution Delivered</h2>
          <p>${project.solution}</p>

          <h2>4. Main Features &amp; Capabilities</h2>
          <ul class="check-list">
            ${project.features.map((f) => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div style="display:grid;gap:24px;">
          <div class="card">
            <h2 style="font-size:1.25rem;margin-bottom:14px;">5. Architecture &amp; Technology Stack</h2>
            <ul class="check-list">
              ${project.techStack.map((t) => `<li>${t}</li>`).join('')}
            </ul>
          </div>

          <div class="card">
            <h2 style="font-size:1.25rem;margin-bottom:14px;">6. MV-Apex Engineering Contributions</h2>
            <ul class="check-list">
              ${project.contributions.map((c) => `<li>${c}</li>`).join('')}
            </ul>
          </div>

          <div class="card">
            <h2 style="font-size:1.25rem;margin-bottom:14px;">7. Verified Outcomes</h2>
            <ul class="check-list">
              ${project.results.map((r) => `<li>${r}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">More Case Studies</span>
        <h2>Continue Exploring Our Work</h2>
      </div>
      <div class="grid grid-2">
        ${otherProjects.map((p) => renderPortfolioCard(p)).join('')}
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: `${project.name} Case Study — ${project.shortTag} | MV-Apex Digital Solutions`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
    activeNav: 'portfolio',
    ogImage: project.image ? `${SITE.url}${project.image}` : SITE.ogImage,
    schemas: [ORGANIZATION_SCHEMA, appSchema, breadcrumbSchema(crumbs)],
    body
  });
}

/* ==========================================================================
   4. INSIGHTS / BLOG HUB & 8 ARTICLE PAGES
   ========================================================================== */
function buildInsightsHub() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' }
  ];

  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <span aria-current="page">Insights</span>
      </nav>
      <span class="eyebrow">Technical &amp; Strategy Briefs</span>
      <h1>Insights on Software Engineering, SaaS, AI &amp; Digital Transformation</h1>
      <p class="page-hero-lead">Practical, original articles written by the MV-Apex engineering and strategy team to help founders, executives, and institutional leaders make sound technology decisions.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid grid-2">
        ${ARTICLES.map(
          (a) => `
        <article class="card">
          <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:14px;">
            <span class="badge badge-primary">${a.category}</span>
            <span style="font-size:0.82rem;color:var(--text-muted);">${a.readTime} · ${a.publishedAt}</span>
          </div>
          <h2><a href="/insights/${a.slug}" style="font-size:1.35rem;">${a.title}</a></h2>
          <p style="margin-top:10px;">${a.excerpt}</p>
          <a href="/insights/${a.slug}" class="card-link">Read Full Guide ${ICONS.arrow}</a>
        </article>`
        ).join('')}
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'Software Engineering & Strategy Insights | MV-Apex Digital Solutions',
    description:
      'Read practical guides on custom software development costs in Nigeria, choosing a software partner, SaaS vs traditional software, enterprise systems, church software, and AI desktop apps.',
    path: '/insights',
    activeNav: 'insights',
    schemas: [ORGANIZATION_SCHEMA, breadcrumbSchema(crumbs)],
    body
  });
}

function buildArticlePage(article) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: article.title, path: `/insights/${article.slug}` }
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: SITE.url
    },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/insights/${article.slug}`
  };

  const linkedServices = SERVICES.filter((s) => article.relatedServices.includes(s.slug));

  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <a href="/insights">Insights</a> <span>/</span> <span aria-current="page">${article.category}</span>
      </nav>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:14px;">
        <span class="badge badge-primary">${article.category}</span>
        <span style="font-size:0.86rem;color:var(--text-muted);">${article.readTime} · Published ${article.publishedAt}</span>
      </div>
      <h1 style="max-width:860px;">${article.title}</h1>
      <p class="page-hero-lead">By <strong>${article.author}</strong> · ${SITE.name}</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <article class="prose">
        ${article.sections
          .map(
            (sec) => `
          <h2>${sec.heading}</h2>
          ${sec.paragraphs.map((p) => `<p>${p}</p>`).join('')}
          ${
            sec.bullets
              ? `<ul>${sec.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`
              : ''
          }`
          )
          .join('')}
      </article>

      <div style="margin-top:56px;padding-top:36px;border-top:1px solid var(--border-color);">
        <h2 style="font-size:1.4rem;margin-bottom:20px;">Related MV-Apex Capabilities</h2>
        <div class="grid grid-3">
          ${linkedServices
            .map(
              (s) => `
          <div class="card">
            <h3><a href="/services/${s.slug}">${s.name}</a></h3>
            <p>${s.summary}</p>
            <a href="/services/${s.slug}" class="card-link">Explore Service ${ICONS.arrow}</a>
          </div>`
            )
            .join('')}
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="cta-banner">
        <h2>Planning a Software Project?</h2>
        <p>Model your preliminary budget with our estimator or talk directly with our engineering team.</p>
        <div class="cta-banner-actions">
          <a href="/cost-calculator" class="btn btn-primary btn-lg">Open Cost Calculator</a>
          <a href="/contact" class="btn btn-secondary btn-lg">Start a Project</a>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/insights/${article.slug}`,
    activeNav: 'insights',
    ogType: 'article',
    schemas: [ORGANIZATION_SCHEMA, articleSchema, breadcrumbSchema(crumbs)],
    body
  });
}

/* ==========================================================================
   5. ABOUT, COST CALCULATOR, CONTACT, PRIVACY & TERMS
   ========================================================================== */
function buildAboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ];

  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <span aria-current="page">About</span>
      </nav>
      <span class="eyebrow">Company Profile · ${SITE.rcNumber}</span>
      <h1>A Technology Partner Built on Serious Software Engineering</h1>
      <p class="page-hero-lead">${SITE.tagline}</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid grid-2" style="gap:40px;align-items:start;">
        <div class="prose">
          <h2 style="margin-top:0;">Who We Are</h2>
          <p>${SITE.legalName} (${SITE.rcNumber}) is a Nigerian software engineering, product strategy, and digital transformation company headquartered in Abuja, FCT, Nigeria. We serve businesses, startups, and institutions across Nigeria and internationally.</p>
          <p>We exist to bridge the gap between complex operational needs and dependable digital execution. Rather than acting as a template-based web agency, we engineer full systems—spanning commercial booking and payment platforms, multi-tenant SaaS products, enterprise institutional management software, and AI-powered desktop applications.</p>
          <h2>How We Operate</h2>
          <ul class="check-list">
            <li>Discovery-first architecture so budgets and timelines reflect reality</li>
            <li>Clean, maintainable codebases with full client IP ownership</li>
            <li>Honest, verifiable communication—no fabricated metrics or inflated claims</li>
            <li>Practical local and global integration experience (Monnify, Paystack, cloud APIs)</li>
          </ul>
        </div>
        <div class="card">
          <h2 style="font-size:1.3rem;margin-bottom:16px;">Verified Company Details</h2>
          <div class="summary-rows" style="margin-top:0;">
            <div class="summary-row"><span>Registered Name</span><strong>${SITE.legalName}</strong></div>
            <div class="summary-row"><span>Registration</span><strong>${SITE.rcNumber}</strong></div>
            <div class="summary-row"><span>Headquarters</span><strong>Abuja, FCT, Nigeria</strong></div>
            <div class="summary-row"><span>Service Coverage</span><strong>Nigeria &amp; Global</strong></div>
            <div class="summary-row"><span>Email</span><strong>${SITE.email}</strong></div>
            <div class="summary-row" style="border-bottom:none;"><span>Phone / WhatsApp</span><strong>${SITE.phoneDisplay}</strong></div>
          </div>
          <a href="/contact" class="btn btn-primary" style="width:100%;">Schedule a Discovery Call</a>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'About MV-Apex Digital Solutions | Nigerian Software Engineering Company',
    description:
      'Learn about MVApex Digital Solutions LTD (RC 9587441), an Abuja-based software engineering and digital transformation company serving local and international clients.',
    path: '/about',
    activeNav: 'about',
    schemas: [ORGANIZATION_SCHEMA, breadcrumbSchema(crumbs)],
    body
  });
}

function buildCostCalculatorPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Cost Calculator', path: '/cost-calculator' }
  ];

  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <span aria-current="page">Cost Calculator</span>
      </nav>
      <span class="eyebrow">Transparent Planning</span>
      <h1>Software Project Cost &amp; Timeline Estimator</h1>
      <p class="page-hero-lead">Configure your service type, scale, required modules, and delivery pace to generate a preliminary USD or NGN budget projection.</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      ${renderEstimatorSection()}
    </div>
  </section>`;

  return renderLayout({
    title: 'Software Project Cost Calculator | MV-Apex Digital Solutions',
    description:
      'Estimate preliminary budgets and timelines in USD or NGN for custom software, SaaS platforms, enterprise systems, AI desktop apps, and websites with MV-Apex.',
    path: '/cost-calculator',
    activeNav: 'calculator',
    schemas: [ORGANIZATION_SCHEMA, breadcrumbSchema(crumbs)],
    body
  });
}

function buildContactPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' }
  ];

  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <span aria-current="page">Contact</span>
      </nav>
      <span class="eyebrow">Project Enquiries</span>
      <h1>Start a Project With Our Engineering Team</h1>
      <p class="page-hero-lead">Share your requirements via the form below, email, or WhatsApp. We will review your scope and arrange a discovery session.</p>
    </div>
  </section>
  ${renderContactSection('Tell Us About Your Project')}`;

  return renderLayout({
    title: 'Contact MV-Apex Digital Solutions | Start a Software Project',
    description:
      'Contact MV-Apex Digital Solutions in Abuja, Nigeria to discuss custom software, SaaS development, enterprise systems, AI applications, desktop software, or IT consulting.',
    path: '/contact',
    activeNav: 'contact',
    schemas: [ORGANIZATION_SCHEMA, breadcrumbSchema(crumbs)],
    body
  });
}

function buildLegalPage({ title, slug, heading, paragraphs }) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: heading, path: `/${slug}` }
  ];
  const body = `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <span aria-current="page">${heading}</span>
      </nav>
      <h1>${heading}</h1>
      <p class="page-hero-lead">Last updated: ${SITE.publishDate} · ${SITE.legalName} (${SITE.rcNumber})</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="prose">
        ${paragraphs.map((p) => `<p>${p}</p>`).join('')}
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: `${title} | MV-Apex Digital Solutions`,
    description: `${title} for ${SITE.legalName} (${SITE.url}).`,
    path: `/${slug}`,
    schemas: [ORGANIZATION_SCHEMA, breadcrumbSchema(crumbs)],
    body
  });
}

/* ==========================================================================
   6. GENERATE ALL PAGES + ROBOTS.TXT + SITEMAP.XML + LLMS.TXT
   ========================================================================== */
const allRoutes = [];

function register(relPath, routePath, html) {
  writePage(relPath, html);
  allRoutes.push(routePath);
}

register('index.html', '/', buildHomePage());
register('about.html', '/about', buildAboutPage());
register('cost-calculator.html', '/cost-calculator', buildCostCalculatorPage());
register('contact.html', '/contact', buildContactPage());
register('services/index.html', '/services', buildServicesHub());
register('portfolio/index.html', '/portfolio', buildPortfolioHub());
register('insights/index.html', '/insights', buildInsightsHub());

for (const s of SERVICES) {
  register(`services/${s.slug}.html`, `/services/${s.slug}`, buildServicePage(s));
}
for (const p of PROJECTS) {
  register(`portfolio/${p.slug}.html`, `/portfolio/${p.slug}`, buildCaseStudyPage(p));
}
for (const a of ARTICLES) {
  register(`insights/${a.slug}.html`, `/insights/${a.slug}`, buildArticlePage(a));
}

register(
  'privacy-policy.html',
  '/privacy-policy',
  buildLegalPage({
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    heading: 'Privacy Policy',
    paragraphs: [
      `${SITE.legalName} (${SITE.rcNumber}) respects your privacy and handles personal information submitted through ${SITE.url} in accordance with applicable Nigerian data protection standards (NDPA) and international best practices.`,
      'When you submit a project enquiry or contact us via email or WhatsApp, we collect only the details you voluntarily provide—such as your name, email address, organization name, and project brief—solely to evaluate your request and communicate with you.',
      'We do not sell, rent, or trade your personal contact information to third parties. Theme preferences (light/dark mode) are stored locally in your browser using localStorage.',
      `To request access to, correction of, or deletion of your contact information, email us at ${SITE.email}.`
    ]
  })
);

register(
  'terms-of-service.html',
  '/terms-of-service',
  buildLegalPage({
    title: 'Terms of Service',
    slug: 'terms-of-service',
    heading: 'Terms of Service',
    paragraphs: [
      `By accessing ${SITE.url}, you agree to these Terms of Service governing your use of the MV-Apex Digital Solutions website.`,
      'All project cost and timeline figures generated by our interactive Cost Calculator are preliminary planning projections only and do not constitute a binding offer or formal quotation. Binding scope, pricing, milestones, and intellectual property terms are established exclusively in signed client agreements.',
      `All original text, design assets, and case-study materials published on this website remain the property of ${SITE.legalName} or their respective product owners.`,
      `For questions regarding these terms or formal service agreements, contact ${SITE.email}.`
    ]
  })
);

// robots.txt
writePage(
  'public/robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`
);

// sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    const loc = `${SITE.url}${route === '/' ? '/' : route}`;
    const priority = route === '/' ? '1.0' : route.startsWith('/services') || route.startsWith('/portfolio') ? '0.85' : '0.75';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${SITE.publishDate}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n')}
</urlset>
`;
writePage('public/sitemap.xml', sitemapXml);

// llms.txt (GEO — Generative Engine Optimization)
const llmsTxt = `# ${SITE.name} (${SITE.legalName})

> ${SITE.tagline}

- Website: ${SITE.url}/
- Legal Entity: ${SITE.legalName} (${SITE.rcNumber})
- Headquarters: ${SITE.address.full}
- Coverage: Nigeria (Abuja, Lagos, nationwide) and international remote clients
- Contact: ${SITE.email} | ${SITE.phoneDisplay}

## Core Services
${SERVICES.map((s) => `- [${s.name}](${SITE.url}/services/${s.slug}): ${s.summary}`).join('\n')}

## Documented Projects & Case Studies
${PROJECTS.map((p) => `- [${p.name}](${SITE.url}/portfolio/${p.slug}) (${p.productType}): ${p.summary}`).join('\n')}

## Technical & Strategy Insights
${ARTICLES.map((a) => `- [${a.title}](${SITE.url}/insights/${a.slug}): ${a.excerpt}`).join('\n')}

## Planning & Contact
- [Interactive Project Cost & Timeline Estimator](${SITE.url}/cost-calculator)
- [About MV-Apex](${SITE.url}/about)
- [Start a Project / Contact](${SITE.url}/contact)
`;
writePage('public/llms.txt', llmsTxt);

console.log(`Generated ${allRoutes.length} HTML pages + robots.txt + sitemap.xml + llms.txt`);
