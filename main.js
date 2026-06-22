/* 
  MV-Apex Digital Solutions Frontend Logic
  Handles: Light/Dark theme switching, responsive menu, service modals,
  interactive project cost estimator, portfolio filtering, contact form validation,
  and scroll animations.
*/

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initHeaderScroll();
  initServiceModals();
  initProjectEstimator();
  initPortfolioFilter();
  initContactForm();
  initScrollAnimations();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Toggle)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Retrieve theme from localStorage or fallback to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', initialTheme);

  // Click listener
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* ==========================================================================
   2. Responsive Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  // Toggle active class on hamburger and nav menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking navigation links or the mobile Calculate Cost button
  const closeElements = document.querySelectorAll('.nav-link, .nav-mobile-btn');
  closeElements.forEach(el => {
    el.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu if clicking outside of it
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

/* ==========================================================================
   3. Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

/* ==========================================================================
   4. Services Modal Manager
   ========================================================================== */
const servicesData = {
  consultation: {
    title: 'IT Consultation',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
    desc: 'Empower your business with strategic technology advisory services. We assess your legacy architecture, analyze operational workflows, and design robust digital transformation roadmaps.',
    bullets: [
      'Cloud Architecture Strategy',
      'System Architecture Assessments',
      'Cybersecurity & Risk Audits',
      'Technology Stack Optimization',
      'Scalability Roadmapping',
      'Legacy Migration Planning'
    ]
  },
  marketing: {
    title: 'Digital Marketing Service',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    desc: 'Accelerate acquisition and retention through data-driven performance marketing. We map user journeys, engineer multi-channel campaigns, and deploy deep analytics models.',
    bullets: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click Advertising (PPC)',
      'Content Marketing Strategy',
      'Conversion Rate Optimization (CRO)',
      'Social Media Advertising',
      'Detailed Funnel & ROI Attribution'
    ]
  },
  design: {
    title: 'Web Design & Branding',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.07 19.58 10.48 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>`,
    desc: 'Fusing beautiful design systems with intuitive user experience. We build pixel-perfect, highly responsive interfaces tailored specifically to convey brand credibility.',
    bullets: [
      'UI/UX User Journey Mapping',
      'Modern Style Guides & Mockups',
      'Interactive Design Prototypes',
      'Mobile-First Layout Engineering',
      'Accessible Design Systems',
      'Aesthetic Landing Pages'
    ]
  },
  product: {
    title: 'Product Management',
    icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    desc: 'Guide your product from ideation to successful market launch. We validate business requirements, structure product roadmaps, manage agile backlogs, and drive release metrics.',
    bullets: [
      'Product Discovery & Ideation',
      'Market & Competitor Analysis',
      'MVP Scope Definition',
      'Agile Product Backlog Management',
      'User Testing & Feedback Loops',
      'Analytics & Feature Prioritization'
    ]
  },
  saas: {
    title: 'SaaS Development',
    icon: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>`,
    desc: 'Deploy secure, highly scalable, and multi-tenant Software-as-a-Service cloud applications. We build solid architectures using modern programming languages and frameworks.',
    bullets: [
      'Scalable Multi-Tenant Architecture',
      'REST & GraphQL API Engineering',
      'Secure Authentication (OAuth, JWT)',
      'Subscriptions & Billing Gateways',
      'Robust Cloud Databases (SQL/NoSQL)',
      'CI/CD Pipelines & Serverless Deploy'
    ]
  }
};

function initServiceModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalBullets = document.getElementById('modal-bullets');
  const modalActionBtn = document.getElementById('modal-action-btn');
  const learnMoreBtns = document.querySelectorAll('.service-learn-more');

  if (!modalOverlay || !modalClose || !modalTitle || !modalDesc || !modalBullets) return;

  function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    modalTitle.innerHTML = `${data.title}`;
    modalDesc.textContent = data.desc;
    
    // Clear and build bullets
    modalBullets.innerHTML = '';
    data.bullets.forEach(bullet => {
      const li = document.createElement('div');
      li.className = 'bullet-item';
      li.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <span>${bullet}</span>
      `;
      modalBullets.appendChild(li);
    });

    // Setup CTA action
    modalActionBtn.onclick = () => {
      closeModal();
      
      // Focus/Select this service in estimator
      const estimatorRadio = document.getElementById(`est-${serviceKey}`);
      if (estimatorRadio) {
        estimatorRadio.checked = true;
        // Trigger estimator recalculation and visual update
        const estimatorContainer = estimatorRadio.closest('.estimator-service-select');
        if (estimatorContainer) {
          document.querySelectorAll('.estimator-service-select').forEach(card => card.classList.remove('active'));
          estimatorContainer.classList.add('active');
        }
        
        // Recalculate cost
        calculateCost();
      }

      // Smooth scroll to estimator
      const estimatorSection = document.getElementById('estimator');
      if (estimatorSection) {
        estimatorSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
  }

  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceKey = btn.getAttribute('data-service');
      openModal(serviceKey);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Interactive Project Cost Estimator
   ========================================================================== */
const estimatorRates = {
  basePrices: {
    consultation: 1500, // Flat design sprint/consult rate
    marketing: 2500,
    design: 3500,
    product: 4000,
    saas: 8000
  },
  complexityRates: [1.0, 1.4, 2.0, 3.2], // Small, Medium, Large, Enterprise
  timelines: {
    relaxed: { multiplier: 0.9, durationFactor: 1.4, label: 'Relaxed' },
    standard: { multiplier: 1.0, durationFactor: 1.0, label: 'Standard' },
    urgent: { multiplier: 1.4, durationFactor: 0.6, label: 'Urgent' }
  },
  features: {
    auth: 900,
    db: 1300,
    payment: 700,
    admin: 1800,
    seo: 600,
    multi: 800
  }
};

function initProjectEstimator() {
  const serviceCards = document.querySelectorAll('.estimator-service-select');
  const serviceRadios = document.querySelectorAll('input[name="estimator-service"]');
  const complexitySlider = document.getElementById('est-complexity');
  const timelineSelect = document.getElementById('est-timeline');
  const featureCheckboxes = document.querySelectorAll('.estimator-features-grid input[type="checkbox"]');
  
  if (serviceCards.length === 0 || !complexitySlider || !timelineSelect) return;

  // Sync service selection cards
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        
        // Remove active class from all and add to this
        serviceCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        calculateCost();
      }
    });
  });

  // Event listeners for recalculations
  complexitySlider.addEventListener('input', calculateCost);
  timelineSelect.addEventListener('change', calculateCost);
  featureCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // Toggle CSS styling of custom checkbox parent card
      const label = checkbox.closest('.checkbox-label');
      if (label) {
        if (checkbox.checked) {
          label.classList.add('text-primary-color');
        } else {
          label.classList.remove('text-primary-color');
        }
      }
      calculateCost();
    });
  });

  // Initial Calculation
  calculateCost();
}

function calculateCost() {
  const selectedServiceRadio = document.querySelector('input[name="estimator-service"]:checked');
  const complexitySlider = document.getElementById('est-complexity');
  const timelineSelect = document.getElementById('est-timeline');
  const featureCheckboxes = document.querySelectorAll('.estimator-features-grid input[type="checkbox"]');
  
  const displayBase = document.getElementById('breakdown-base');
  const displayComplexity = document.getElementById('breakdown-complexity');
  const displayFeatures = document.getElementById('breakdown-features');
  const displayTimeline = document.getElementById('breakdown-timeline');
  const displayTotal = document.getElementById('breakdown-total');
  const displayDuration = document.getElementById('breakdown-duration');
  
  if (!selectedServiceRadio || !complexitySlider || !timelineSelect) return;

  const serviceKey = selectedServiceRadio.value;
  const complexityIndex = parseInt(complexitySlider.value);
  const timelineKey = timelineSelect.value;

  // 1. Base Cost
  const baseCost = estimatorRates.basePrices[serviceKey];
  
  // 2. Complexity Scaling
  const scale = estimatorRates.complexityRates[complexityIndex];
  const scaledBase = baseCost * scale;
  
  // 3. Features Cost
  let featuresCost = 0;
  featureCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const featureKey = checkbox.value;
      featuresCost += estimatorRates.features[featureKey] || 0;
    }
  });

  // 4. Timeline Multiplier
  const timelineInfo = estimatorRates.timelines[timelineKey];
  const subtotal = scaledBase + featuresCost;
  const totalCost = subtotal * timelineInfo.multiplier;

  // 5. Calculate Duration
  let baseDurationWeeks = 4;
  if (serviceKey === 'consultation') baseDurationWeeks = 1;
  if (serviceKey === 'marketing') baseDurationWeeks = 2; // Campaign set up
  if (serviceKey === 'design') baseDurationWeeks = 3;
  if (serviceKey === 'saas') baseDurationWeeks = 8;
  
  // Scale duration
  const scaledDuration = baseDurationWeeks * scale * timelineInfo.durationFactor;
  const minWeeks = Math.max(1, Math.round(scaledDuration * 0.85));
  const maxWeeks = Math.max(minWeeks + 1, Math.round(scaledDuration * 1.15));
  const durationText = `${minWeeks}-${maxWeeks} Weeks`;

  // Update displays
  if (displayBase) displayBase.textContent = `$${baseCost.toLocaleString()}`;
  
  const complexityLabel = ['Small', 'Medium', 'Large', 'Enterprise'][complexityIndex];
  const rangeValLabel = document.getElementById('range-val-label');
  if (rangeValLabel) rangeValLabel.textContent = complexityLabel;
  
  if (displayComplexity) displayComplexity.textContent = `${complexityLabel} (x${scale})`;
  
  if (displayFeatures) displayFeatures.textContent = `$${featuresCost.toLocaleString()}`;
  if (displayTimeline) displayTimeline.textContent = `${timelineInfo.label} (x${timelineInfo.multiplier})`;
  if (displayTotal) displayTotal.textContent = `$${Math.round(totalCost).toLocaleString()}`;
  if (displayDuration) displayDuration.textContent = durationText;

  // Save selection data in dynamic proposal button
  const proposalBtn = document.getElementById('estimator-proposal-btn');
  if (proposalBtn) {
    proposalBtn.onclick = () => {
      // Build auto-fill message
      let message = `Hello MV-Apex Team!\n\nI just completed a cost projection on your website for a project:\n`;
      message += `- Service: ${document.querySelector(`label[for="est-${serviceKey}"]`).textContent.trim()}\n`;
      message += `- Scale: ${complexityLabel}\n`;
      
      const activeFeatures = [];
      featureCheckboxes.forEach(cb => {
        if (cb.checked) {
          activeFeatures.push(cb.parentNode.textContent.replace('✓', '').trim());
        }
      });
      
      if (activeFeatures.length > 0) {
        message += `- Additional Features: ${activeFeatures.join(', ')}\n`;
      }
      
      message += `- Urgency: ${timelineInfo.label}\n`;
      message += `- Simulated Quote: $${Math.round(totalCost).toLocaleString()}\n`;
      message += `- Estimated Project Timeframe: ${durationText}\n\n`;
      message += `I would love to run through this configuration and schedule a free discovery session.`;

      // Fill in contact form fields
      const messageField = document.getElementById('contact-message');
      const serviceField = document.getElementById('contact-service');
      
      if (serviceField) serviceField.value = serviceKey;
      if (messageField) messageField.value = message;

      // Scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }
}

/* ==========================================================================
   6. Portfolio Category Filter
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length === 0 || portfolioItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const parentCol = item.closest('.grid-item') || item;

        if (filterValue === 'all' || itemCategory === filterValue) {
          parentCol.style.display = 'block';
          // Subtle fade in animation on show
          setTimeout(() => {
            parentCol.style.opacity = '1';
            parentCol.style.transform = 'scale(1)';
          }, 50);
        } else {
          parentCol.style.opacity = '0';
          parentCol.style.transform = 'scale(0.95)';
          // Wait for fade out animation before hiding
          setTimeout(() => {
            parentCol.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Contact Form Handler & Validations
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const feedbackEl = document.getElementById('form-feedback');

  if (!contactForm || !feedbackEl) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset feedback states
    feedbackEl.className = 'form-feedback';
    feedbackEl.style.display = 'none';

    // Retrieve fields
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    let errors = [];

    // Validations
    if (!nameInput.value.trim()) {
      errors.push('Full Name is required');
    }
    
    if (!emailInput.value.trim()) {
      errors.push('Email Address is required');
    } else if (!validateEmail(emailInput.value)) {
      errors.push('Please enter a valid Email Address');
    }
    
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
      feedbackEl.classList.add('error');
      feedbackEl.innerHTML = `<ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>`;
      feedbackEl.style.display = 'block';
      return;
    }

    // Success Simulation
    submitBtn.disabled = true;
    submitBtn.textContent = 'Transmitting proposal...';

    setTimeout(() => {
      feedbackEl.classList.add('success');
      feedbackEl.innerHTML = `<p>🚀 Transmission successful! MV-Apex has received your request. We will get back to you within 24 hours.</p>`;
      feedbackEl.style.display = 'block';
      
      // Reset form
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor; margin-left: 6px;"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
      
      // Auto-hide feedback after 8 seconds
      setTimeout(() => {
        feedbackEl.style.display = 'none';
      }, 8000);
    }, 1800);
  });
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/* ==========================================================================
   8. Scroll Fade-in Animations (Intersection Observer)
   ========================================================================== */
function initScrollAnimations() {
  const animatedSections = document.querySelectorAll('.fade-in-section');
  if (animatedSections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Section trigger when 15% visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Unobserve once animated
      }
    });
  }, observerOptions);

  animatedSections.forEach(section => {
    observer.observe(section);
  });
}
