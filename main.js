/* ==========================================================================
   MV-Apex Digital Solutions — Frontend Application Script
   Handles: Accessible Theme Toggle, Mobile Drawer, Header Scroll State,
   Portfolio Category Filtering, Interactive Cost Estimator (USD/NGN),
   Contact Form Validation & Submission Handoff, Scroll Reveal Animations.
   ========================================================================== */

const MVAPEX_CONFIG = {
  whatsappNumber: '2347037288929',
  contactEmail: 'hello@mvapex.com.ng',
  // Optional: set a Formspree / Web3Forms / custom API endpoint when configured
  formEndpoint: '',
  // Reference exchange rate for preliminary NGN projection display only
  usdToNgnRate: 1550
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileDrawer();
  initHeaderScroll();
  initPortfolioFilter();
  initCostEstimator();
  initContactForm();
  initRevealAnimations();
});

/* ==========================================================================
   1. Accessible Theme Toggle (Light / Dark)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const updateAria = (theme) => {
    toggleBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    toggleBtn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  };

  const current = document.documentElement.getAttribute('data-theme') || 'light';
  updateAria(current);

  toggleBtn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme') || 'light';
    const next = active === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (_) {}
    updateAria(next);
  });
}

/* ==========================================================================
   2. Responsive Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!menuBtn || !drawer) return;

  const closeDrawer = () => {
    drawer.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
      menuBtn.focus();
    }
  });
}

/* ==========================================================================
   3. Sticky Header Scroll Elevation
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   4. Portfolio Multi-Category Filter
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const selected = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const categories = (card.getAttribute('data-categories') || '').split(',');
        const matches = selected === 'all' || categories.includes(selected);
        card.style.display = matches ? '' : 'none';
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Project Cost & Timeline Estimator
   ========================================================================== */
const ESTIMATOR_RATES = {
  services: {
    'custom-software': { label: 'Custom Software Development', base: 5500, weeks: 7 },
    saas: { label: 'SaaS Platform Development', base: 7500, weeks: 9 },
    enterprise: { label: 'Enterprise / Church Management System', base: 9000, weeks: 10 },
    ai: { label: 'AI Application Development', base: 6500, weeks: 7 },
    desktop: { label: 'Desktop Application Development', base: 6000, weeks: 7 },
    web: { label: 'Website Design & Development', base: 2500, weeks: 3 },
    consulting: { label: 'IT Consulting & Architecture', base: 1500, weeks: 2 },
    marketing: { label: 'Digital Marketing & SEO', base: 1800, weeks: 4 },
    product: { label: 'Product Strategy & Management', base: 2800, weeks: 4 }
  },
  scales: [
    { label: 'MVP / Focused Scope', multiplier: 1.0 },
    { label: 'Standard Commercial', multiplier: 1.4 },
    { label: 'Advanced / Multi-Module', multiplier: 2.0 },
    { label: 'Enterprise / Institutional', multiplier: 3.0 }
  ],
  timelines: {
    relaxed: { label: 'Flexible Timeline', multiplier: 0.92, durationFactor: 1.3 },
    standard: { label: 'Standard Delivery', multiplier: 1.0, durationFactor: 1.0 },
    urgent: { label: 'Accelerated Delivery', multiplier: 1.35, durationFactor: 0.7 }
  },
  features: {
    auth: { label: 'Authentication & Role-Based Access', cost: 850 },
    db: { label: 'Cloud Database & API Layer', cost: 1200 },
    payment: { label: 'Payment Gateway (Monnify / Paystack / Stripe)', cost: 750 },
    admin: { label: 'Admin Dashboard & Reporting', cost: 1600 },
    ai_module: { label: 'AI / LLM Automation Module', cost: 1800 },
    seo: { label: 'Technical SEO & Analytics Setup', cost: 600 }
  }
};

function initCostEstimator() {
  const estimator = document.getElementById('cost-estimator-app');
  if (!estimator) return;

  let currency = 'USD';

  const serviceOptions = estimator.querySelectorAll('.est-service-option');
  const scaleSlider = document.getElementById('est-scale');
  const scaleLabel = document.getElementById('est-scale-label');
  const timelineSelect = document.getElementById('est-timeline');
  const featureInputs = estimator.querySelectorAll('input[name="est-feature"]');
  const currencyBtns = estimator.querySelectorAll('.currency-btn');

  const outBase = document.getElementById('out-base');
  const outScale = document.getElementById('out-scale');
  const outFeatures = document.getElementById('out-features');
  const outTimeline = document.getElementById('out-timeline');
  const outTotal = document.getElementById('out-total');
  const outDuration = document.getElementById('out-duration');
  const proposalBtn = document.getElementById('estimator-proposal-btn');
  const whatsappBtn = document.getElementById('estimator-whatsapp-btn');

  const formatMoney = (usdAmount) => {
    if (currency === 'NGN') {
      const ngn = Math.round((usdAmount * MVAPEX_CONFIG.usdToNgnRate) / 50000) * 50000;
      return `₦${ngn.toLocaleString()}`;
    }
    return `$${Math.round(usdAmount).toLocaleString()}`;
  };

  let latestSummary = '';
  let latestServiceKey = 'saas';

  const recalculate = () => {
    const selectedRadio = estimator.querySelector('input[name="est-service"]:checked');
    if (!selectedRadio) return;

    latestServiceKey = selectedRadio.value;
    const service = ESTIMATOR_RATES.services[latestServiceKey] || ESTIMATOR_RATES.services.saas;
    const scaleIdx = parseInt(scaleSlider.value, 10) || 1;
    const scale = ESTIMATOR_RATES.scales[scaleIdx];
    const timeline = ESTIMATOR_RATES.timelines[timelineSelect.value] || ESTIMATOR_RATES.timelines.standard;

    let featuresTotal = 0;
    const activeFeatureLabels = [];
    featureInputs.forEach((cb) => {
      const parent = cb.closest('.est-option');
      if (parent) parent.classList.toggle('active', cb.checked);
      if (cb.checked && ESTIMATOR_RATES.features[cb.value]) {
        featuresTotal += ESTIMATOR_RATES.features[cb.value].cost;
        activeFeatureLabels.push(ESTIMATOR_RATES.features[cb.value].label);
      }
    });

    const scaledBase = service.base * scale.multiplier;
    const lowEstimate = (scaledBase + featuresTotal) * timeline.multiplier * 0.9;
    const highEstimate = (scaledBase + featuresTotal) * timeline.multiplier * 1.15;

    const rawWeeks = service.weeks * scale.multiplier * timeline.durationFactor;
    const minWeeks = Math.max(1, Math.round(rawWeeks * 0.85));
    const maxWeeks = Math.max(minWeeks + 1, Math.round(rawWeeks * 1.15));
    const durationText = `${minWeeks}–${maxWeeks} Weeks`;

    if (scaleLabel) scaleLabel.textContent = scale.label;
    if (outBase) outBase.textContent = formatMoney(service.base);
    if (outScale) outScale.textContent = `${scale.label} (×${scale.multiplier})`;
    if (outFeatures) outFeatures.textContent = formatMoney(featuresTotal);
    if (outTimeline) outTimeline.textContent = `${timeline.label} (×${timeline.multiplier})`;
    if (outTotal) outTotal.textContent = `${formatMoney(lowEstimate)} – ${formatMoney(highEstimate)}`;
    if (outDuration) outDuration.textContent = durationText;

    latestSummary = [
      'Hello MV-Apex Digital Solutions,',
      '',
      'I generated a preliminary project projection on your website:',
      `- Core Service: ${service.label}`,
      `- Project Scale: ${scale.label}`,
      `- Selected Capabilities: ${activeFeatureLabels.length ? activeFeatureLabels.join(', ') : 'Core scope only'}`,
      `- Delivery Pace: ${timeline.label}`,
      `- Preliminary Budget Range (${currency}): ${formatMoney(lowEstimate)} – ${formatMoney(highEstimate)}`,
      `- Projected Timeline: ${durationText}`,
      '',
      'I would like to schedule a discovery call for a formal scoped proposal.'
    ].join('\n');

    if (whatsappBtn) {
      whatsappBtn.href = `https://wa.me/${MVAPEX_CONFIG.whatsappNumber}?text=${encodeURIComponent(latestSummary)}`;
    }
  };

  serviceOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        serviceOptions.forEach((el) => el.classList.remove('active'));
        opt.classList.add('active');
        recalculate();
      }
    });
  });

  currencyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currency = btn.getAttribute('data-currency') || 'USD';
      currencyBtns.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      recalculate();
    });
  });

  scaleSlider.addEventListener('input', recalculate);
  timelineSelect.addEventListener('change', recalculate);
  featureInputs.forEach((cb) => cb.addEventListener('change', recalculate));

  if (proposalBtn) {
    proposalBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      const messageField = document.getElementById('contact-message');
      const serviceField = document.getElementById('contact-service');

      if (contactSection && messageField) {
        if (serviceField) serviceField.value = latestServiceKey;
        messageField.value = latestSummary;
        contactSection.scrollIntoView({ behavior: 'smooth' });
        messageField.focus();
      } else {
        try {
          sessionStorage.setItem('mvapex_prefill_message', latestSummary);
          sessionStorage.setItem('mvapex_prefill_service', latestServiceKey);
        } catch (_) {}
        window.location.href = '/contact';
      }
    });
  }

  recalculate();
}

/* ==========================================================================
   6. Contact Form Validation & Submission Handoff
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  // Restore prefilled estimator summary if navigated from another page
  try {
    const prefillMsg = sessionStorage.getItem('mvapex_prefill_message');
    const prefillSvc = sessionStorage.getItem('mvapex_prefill_service');
    if (prefillMsg) {
      const msgEl = document.getElementById('contact-message');
      const svcEl = document.getElementById('contact-service');
      if (msgEl && !msgEl.value) msgEl.value = prefillMsg;
      if (svcEl && prefillSvc) svcEl.value = prefillSvc;
      sessionStorage.removeItem('mvapex_prefill_message');
      sessionStorage.removeItem('mvapex_prefill_service');
    }
  } catch (_) {}

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.className = 'form-feedback';
    feedback.innerHTML = '';

    const name = (document.getElementById('contact-name')?.value || '').trim();
    const email = (document.getElementById('contact-email')?.value || '').trim();
    const company = (document.getElementById('contact-company')?.value || '').trim();
    const service = document.getElementById('contact-service')?.value || 'custom-software';
    const message = (document.getElementById('contact-message')?.value || '').trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    const errors = [];
    if (name.length < 2) errors.push('Please enter your full name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
    if (message.length < 15) errors.push('Please provide at least a brief overview of your project (15+ characters).');

    if (errors.length) {
      feedback.className = 'form-feedback error';
      feedback.innerHTML = `<ul>${errors.map((err) => `<li>${err}</li>`).join('')}</ul>`;
      feedback.focus();
      return;
    }

    const payload = { name, email, company, service, message, source: window.location.href };

    if (MVAPEX_CONFIG.formEndpoint) {
      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting enquiry...';
        const res = await fetch(MVAPEX_CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Submission failed');
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `<p><strong>Enquiry received.</strong> Thank you, ${escapeHtml(name)}. Our engineering team will review your brief and respond within one business day.</p>`;
        form.reset();
      } catch (_) {
        feedback.className = 'form-feedback error';
        feedback.innerHTML = `<p>We could not submit the form automatically. Please send your brief directly via <a href="mailto:${MVAPEX_CONFIG.contactEmail}" style="text-decoration:underline;">${MVAPEX_CONFIG.contactEmail}</a> or WhatsApp.</p>`;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Project Enquiry';
      }
      return;
    }

    // No server endpoint configured yet: present validated confirmation + direct Email & WhatsApp dispatch links
    const subject = `Project Enquiry (${service}) — ${name}${company ? ` / ${company}` : ''}`;
    const body = `Name: ${name}\nEmail: ${email}\nOrganization: ${company || 'Not specified'}\nService: ${service}\n\nProject Brief:\n${message}`;
    const mailtoUrl = `mailto:${MVAPEX_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const waUrl = `https://wa.me/${MVAPEX_CONFIG.whatsappNumber}?text=${encodeURIComponent(body)}`;

    feedback.className = 'form-feedback success';
    feedback.innerHTML = `
      <p><strong>Brief validated for ${escapeHtml(name)}.</strong> Choose how you would like to transmit it directly to our engineering desk:</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;">
        <a href="${mailtoUrl}" class="btn btn-primary btn-sm">Open in Email Client</a>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">Send via WhatsApp</a>
      </div>
    `;
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ==========================================================================
   7. Scroll Reveal Animations
   ========================================================================== */
function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  items.forEach((el) => observer.observe(el));
}
