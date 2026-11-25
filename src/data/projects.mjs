export const PROJECTS = [
  {
    slug: 'susse-wellness-spa',
    name: 'Susse Wellness Spa',
    shortTag: 'Commercial Web · Booking & Payments',
    categories: ['web-development', 'digital-solutions'],
    categoryLabels: ['Web Development', 'Digital Solutions'],
    industry: 'Hospitality, Health & Wellness',
    location: 'Kuje, Abuja, Nigeria',
    productType: 'Web Application & Booking Platform',
    liveUrl: 'https://www.sussespa.com/',
    image: '/assets/sussespa-live.png',
    imageAlt: 'Live homepage screenshot of the Susse Wellness Spa booking and e-commerce platform',
    isActualScreenshot: true,
    summary:
      'A commercial wellness spa website, 4-step online appointment booking platform, e-commerce skincare boutique, and self-service guest booking portal integrated with Moniepoint/Monnify online payments.',
    overview:
      'Susse Wellness Spa required a modern digital platform that reflects the luxury experience of its physical sanctuary in Kuje, Abuja while automating appointment scheduling, upfront deposit collection, and retail product orders.',
    problem:
      'Manual appointment scheduling via chat and phone calls led to booking conflicts, unconfirmed no-shows, and slow customer inquiries across 48 distinct spa treatments and skincare products.',
    solution:
      'MV-Apex Digital Solutions designed and engineered a full commercial web platform featuring a structured treatment catalog across 9 wellness disciplines, a 4-step online reservation workflow, an integrated skincare boutique with shopping cart, and a self-service guest portal secured with one-time verification codes.',
    features: [
      'Structured catalog of 9 wellness disciplines and 48 treatment offerings with transparent ₦ pricing and durations',
      '4-step online appointment booking engine with date/time scheduling and guest preference notes',
      'Online payment gateway integration via Moniepoint / Monnify supporting debit cards, USSD, and bank transfers',
      'Flexible payment rules supporting 50% upfront booking deposit or 100% full online settlement',
      'Self-service Guest Portal (/find-my-booking) using booking reference and 6-digit OTP access to view reservations or pay remaining balances',
      'Integrated skincare boutique (/shop) with shopping bag (/cart), dark/light theme support, and floating WhatsApp support'
    ],
    techStack: [
      'Responsive Web Application Architecture',
      'Moniepoint / Monnify Payment Gateway Integration',
      'OTP-Verified Guest Lookup Flow',
      'Accessible Light & Dark Theme System',
      'WhatsApp Customer Support Integration'
    ],
    contributions: [
      'End-to-end UX/UI design tailored to luxury hospitality branding',
      'Booking workflow engineering and payment deposit state management',
      'E-commerce product catalog and cart experience implementation',
      'Mobile-first performance optimization and production deployment'
    ],
    results: [
      'Live commercial platform operational at sussespa.com serving guests across Abuja',
      'Eliminated pay-on-arrival ambiguity by enforcing structured 50% deposit or full online checkout',
      'Enabled 24/7 self-service appointment lookup and balance settlement without manual front-desk intervention'
    ],
    schemaType: 'WebApplication',
    operatingSystem: 'Web Browser'
  },
  {
    slug: 'glorybeam',
    name: 'GloryBeam',
    shortTag: 'AI-Powered Desktop Software',
    categories: ['ai-applications', 'desktop-software', 'digital-solutions'],
    categoryLabels: ['AI Applications', 'Desktop Software'],
    industry: 'Church Media & Presentation Technology',
    location: 'Local & International Deployment',
    productType: 'Desktop Software Application',
    liveUrl: '',
    image: '',
    imageAlt: 'GloryBeam AI-powered church presentation desktop software architecture preview',
    isActualScreenshot: false,
    previewTheme: 'theme-indigo',
    previewHeader: 'GloryBeam Desktop · Native Presentation Engine',
    previewModules: [
      { title: 'AI Lyric & Scripture Cueing', desc: 'Context-aware slide lookup & smart projection assistance' },
      { title: 'Dual-Display Output', desc: 'Operator control deck + clean live stage/congregation feed' },
      { title: 'Offline-First Reliability', desc: 'Native desktop execution with zero live-service internet dependency' },
      { title: 'Media & Lower-Thirds', desc: 'Unified deck for worship slides, scriptures, and announcements' }
    ],
    summary:
      'An AI-powered church presentation desktop software engineered to streamline live worship projection, scripture display, and church media operations with reliable offline-first desktop performance.',
    overview:
      'GloryBeam is a dedicated desktop software product built by MV-Apex Digital Solutions to modernize how church media teams prepare and run live presentations. Unlike browser-dependent web apps, GloryBeam runs natively as desktop software to guarantee stability during live services.',
    problem:
      'Church media volunteers frequently struggle with slow manual slide searching, fragmented scripture and lyric workflows, and unpredictable live projection tools that fail under pressure or poor internet connectivity.',
    solution:
      'We engineered GloryBeam as a specialized desktop application that combines intelligent AI-assisted content retrieval with a purpose-built live presentation control surface, enabling media operators to cue slides, scriptures, and service elements accurately and rapidly.',
    features: [
      'Native desktop presentation engine designed specifically for live church media booths',
      'AI-assisted lyric, scripture, and slide cueing to reduce operator latency during live services',
      'Multi-display output separation for operator preview and audience/stage projection',
      'Structured service playlist management for worship sets, sermons, and announcements',
      'Offline-resilient local asset handling for uninterrupted Sunday and midweek operations'
    ],
    techStack: [
      'Desktop Application Engineering Architecture',
      'AI / NLP Content Retrieval & Assistance Layer',
      'Multi-Monitor Presentation Rendering Pipeline',
      'Local-First Data & Media Asset Storage'
    ],
    contributions: [
      'Product architecture and desktop UX design for high-pressure live media environments',
      'AI workflow design for fast scripture and lyric assistance',
      'Multi-screen projection output and operator control engineering',
      'Performance optimization for dependable live desktop execution'
    ],
    results: [
      'Demonstrates MV-Apex engineering depth beyond websites into native AI-powered desktop software',
      'Purpose-built for church media teams requiring speed, reliability, and low operator friction'
    ],
    schemaType: 'SoftwareApplication',
    operatingSystem: 'Desktop (Windows / macOS)'
  },
  {
    slug: 'fpm-global',
    name: 'FPM Global',
    shortTag: 'Enterprise Church Management',
    categories: ['enterprise-software', 'digital-solutions'],
    categoryLabels: ['Enterprise Software', 'Digital Solutions'],
    industry: 'Religious Institutions & Enterprise Administration',
    location: 'Multi-Branch Institutional Operations',
    productType: 'Enterprise Management Software',
    liveUrl: '',
    image: '',
    imageAlt: 'FPM Global enterprise church management software architecture preview',
    isActualScreenshot: false,
    previewTheme: 'theme-emerald',
    previewHeader: 'FPM Global · Enterprise Institutional Platform',
    previewModules: [
      { title: 'Member & Registry Directory', desc: 'Centralized records across departments and ministries' },
      { title: 'Role-Based Governance', desc: 'Granular access controls for leadership and administrators' },
      { title: 'Operational Workflows', desc: 'Structured approvals, reporting, and branch coordination' },
      { title: 'Institutional Analytics', desc: 'Executive visibility into attendance, growth, and activities' }
    ],
    summary:
      'An enterprise church management solution engineered to centralize institutional administration, member records, departmental coordination, and complex multi-level operational workflows.',
    overview:
      'FPM Global is an enterprise-grade church management system developed to support large-scale institutional administration. It replaces disconnected spreadsheets and manual paper processes with a unified operational backbone.',
    problem:
      'Growing religious institutions manage complex organizational structures spanning multiple departments, fellowships, leaders, and administrative records. Without centralized enterprise software, reporting becomes fragmented, accountability slows down, and leadership lacks real-time operational clarity.',
    solution:
      'MV-Apex engineered FPM Global around structured institutional data models, role-based access control, and workflow-driven administrative modules that keep pastoral leadership, departmental heads, and administrative staff aligned on a single source of truth.',
    features: [
      'Centralized member directory and institutional record management',
      'Role-based access control (RBAC) supporting distinct administrative and leadership tiers',
      'Multi-department and ministry workflow coordination tools',
      'Structured operational reporting and executive oversight dashboards',
      'Scalable enterprise data architecture designed for multi-branch institutional growth'
    ],
    techStack: [
      'Enterprise Web & API Architecture',
      'Relational Database Modeling for Institutional Hierarchies',
      'Role-Based Access Control (RBAC) & Audit Trails',
      'Modular Administrative Reporting Engine'
    ],
    contributions: [
      'Institutional requirements analysis and enterprise workflow modeling',
      'Database architecture for hierarchical church and departmental administration',
      'Full-stack engineering of core administrative and reporting modules',
      'Security, access governance, and deployment architecture'
    ],
    results: [
      'Unified fragmented institutional records into a structured enterprise management environment',
      'Demonstrates MV-Apex capability in complex business workflows and institutional software engineering'
    ],
    schemaType: 'SoftwareApplication',
    operatingSystem: 'Web / Cloud Enterprise'
  },
  {
    slug: 'schoolmanagr',
    name: 'SchoolManagr Portal',
    shortTag: 'EdTech SaaS Platform',
    categories: ['saas-platforms', 'enterprise-software', 'web-development'],
    categoryLabels: ['SaaS Platforms', 'Enterprise Software'],
    industry: 'Education Technology (EdTech)',
    location: 'Nigeria',
    productType: 'Multi-Tenant SaaS Platform',
    liveUrl: '',
    image: '/assets/schoolmanagr.png',
    imageAlt: 'SchoolManagr EdTech SaaS portal dashboard interface',
    isActualScreenshot: true,
    summary:
      'A multi-tenant school management SaaS platform streamlining academic administration, student records, staff workflows, and parent-school communications.',
    overview:
      'SchoolManagr is an EdTech SaaS platform built to help educational institutions digitize daily academic and administrative operations within a unified cloud portal.',
    problem:
      'Schools often rely on paper registers and disconnected tools for student records, grading, fee tracking, and communication—creating administrative bottlenecks for teachers and school proprietors.',
    solution:
      'We engineered a multi-tenant SaaS portal featuring dedicated dashboards for administrators, educators, and stakeholders, structured around clean data isolation and scalable cloud operations.',
    features: [
      'Multi-tenant school workspace architecture',
      'Student enrollment, attendance, and academic record management',
      'Role-based dashboards for school administrators and teaching staff',
      'Streamlined parent-school communication workflows',
      'Cloud-hosted database architecture built for multi-school onboarding'
    ],
    techStack: [
      'Multi-Tenant SaaS Web Architecture',
      'Role-Based Authentication & Authorization',
      'Relational Cloud Database Design',
      'Responsive Portal UI Engineering'
    ],
    contributions: [
      'SaaS multi-tenancy architecture and database schema design',
      'Dashboard UI/UX design for educational administrators',
      'Core academic and administrative module engineering'
    ],
    results: [
      'Delivered a scalable SaaS foundation capable of onboarding multiple schools independently',
      'Simplified day-to-day administrative coordination across school departments'
    ],
    schemaType: 'SoftwareApplication',
    operatingSystem: 'Web / Cloud SaaS'
  },
  {
    slug: 'realtorcrest',
    name: 'Realtorcrest Platform',
    shortTag: 'PropTech Web Platform',
    categories: ['web-development', 'saas-platforms'],
    categoryLabels: ['Web Development', 'SaaS Platforms'],
    industry: 'Real Estate & Property Technology (PropTech)',
    location: 'Nigeria',
    productType: 'Multi-Tenant Real Estate Portal',
    liveUrl: '',
    image: '/assets/realtorcrest.png',
    imageAlt: 'Realtorcrest real estate listings and agency portal interface',
    isActualScreenshot: true,
    summary:
      'An interactive real estate portal engineered for property agencies and developers to manage listings, showcase developments, and coordinate broker networks.',
    overview:
      'Realtorcrest provides real estate agencies and property developers in Nigeria with a credible, conversion-focused digital platform for managing property inventories and connecting buyers with verified listings.',
    problem:
      'Real estate agencies frequently face low buyer trust online due to cluttered listing directories, slow mobile experiences, and inconsistent property presentation.',
    solution:
      'MV-Apex designed and developed a modern PropTech platform combining institutional visual credibility, structured property listing management, and clear lead-capture funnels.',
    features: [
      'Structured property listing catalog with category and location filtering',
      'Multi-agency and broker network listing presentation',
      'Conversion-oriented inquiry and inspection booking touchpoints',
      'Mobile-first responsive interface optimized for property buyers on smartphones'
    ],
    techStack: [
      'Modern Responsive Web Engineering',
      'Structured Property Data & Search Filtering',
      'SEO-Friendly Listing Architecture'
    ],
    contributions: [
      'Information architecture and PropTech UI/UX design',
      'Front-end and portal engineering for listing discovery',
      'Technical SEO and conversion funnel alignment'
    ],
    results: [
      'Established a credible digital presence tailored to Nigerian real estate buyers and developers',
      'Streamlined property discovery and direct buyer inquiries'
    ],
    schemaType: 'WebApplication',
    operatingSystem: 'Web Browser'
  },
  {
    slug: 'career-impact-lab',
    name: 'Career Impact Lab',
    shortTag: 'Digital Learning & Product Strategy',
    categories: ['web-development', 'digital-solutions'],
    categoryLabels: ['Web Development', 'Digital Solutions'],
    industry: 'Career Development & Professional Training',
    location: 'Abuja, Nigeria & Global',
    productType: 'Digital Platform & Product Strategy',
    liveUrl: '',
    image: '/assets/career_impact.png',
    imageAlt: 'Career Impact Lab digital platform interface',
    isActualScreenshot: true,
    summary:
      'A digital career strategy and professional development platform built to equip ambitious professionals with modern skills and structured growth programs.',
    overview:
      'Career Impact Lab partnered with MV-Apex to build a clear, authoritative digital platform that presents its career acceleration programs, coaching initiatives, and professional resources to a global audience.',
    problem:
      'Professional development brands need a cohesive digital experience that communicates authority, clearly structures program offerings, and converts visitors into enrolled participants.',
    solution:
      'We delivered product strategy, user journey mapping, and a modern responsive web platform engineered for clarity, fast loading, and program discovery.',
    features: [
      'Program showcase and structured career development pathways',
      'User journey mapping focused on participant onboarding and inquiries',
      'Clean, accessible typography and mobile-first responsive layout',
      'Search-optimized page structure for organic discovery'
    ],
    techStack: [
      'Product Strategy & UX Architecture',
      'Responsive Web Development',
      'On-Page SEO & Performance Optimization'
    ],
    contributions: [
      'Product positioning and user journey design',
      'Web design and frontend development',
      'SEO structure and conversion flow optimization'
    ],
    results: [
      'Provided a modern, credible online home for Career Impact Lab programs and outreach'
    ],
    schemaType: 'WebSite',
    operatingSystem: 'Web Browser'
  },
  {
    slug: 'lumina-crm',
    name: 'Lumina CRM & Growth Platform',
    shortTag: 'Digital Marketing & CRM Strategy',
    categories: ['digital-solutions', 'web-development'],
    categoryLabels: ['Digital Solutions', 'Web Development'],
    industry: 'B2B CRM & Digital Growth',
    location: 'Nigeria',
    productType: 'Digital Growth & Conversion Architecture',
    liveUrl: '',
    image: '/assets/lumina.png',
    imageAlt: 'Lumina CRM digital campaign and conversion landing interface',
    isActualScreenshot: true,
    summary:
      'A conversion-focused digital presence and search acquisition strategy engineered to align CRM product positioning with high-intent B2B lead capture.',
    overview:
      'Lumina needed a cohesive digital marketing and landing architecture capable of clearly explaining its CRM value proposition and capturing qualified B2B leads through organic and paid channels.',
    problem:
      'Generic landing pages and misaligned campaign messaging created friction between initial visitor interest and qualified sales conversations.',
    solution:
      'MV-Apex restructured the landing page hierarchy, implemented technical SEO foundations, and mapped clear conversion journeys from search intent to product inquiry.',
    features: [
      'Conversion-focused B2B landing page architecture',
      'Technical SEO and search-intent content alignment',
      'Structured lead-capture forms and analytics event tracking',
      'Responsive design engineered for fast mobile loading'
    ],
    techStack: [
      'Conversion Rate Optimization (CRO)',
      'Technical SEO & Search Strategy',
      'Modern Responsive Web Engineering',
      'Analytics & Funnel Tracking'
    ],
    contributions: [
      'Digital growth strategy and search intent mapping',
      'Landing system UI/UX design and engineering',
      'Conversion funnel instrumentation and optimization'
    ],
    results: [
      'Aligned product messaging, organic search structure, and lead capture into a unified B2B acquisition funnel'
    ],
    schemaType: 'WebSite',
    operatingSystem: 'Web Browser'
  }
];
