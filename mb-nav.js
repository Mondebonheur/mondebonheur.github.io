/**
 * mb-nav.js — Navigation universelle pour l'ONG Monde et Bonheur
 * Version responsive + hiérarchie enrichie (Apropos → Equipe/Gouvernance ; Projets → Technologies/Carte ; Formations)
 * ICONS complet — plus d'erreurs
 */

(function() {
  'use strict';

  if (document.getElementById('mb-nav-injected')) return;

  /* ---------- 1. CSS (corrigé, responsive) ---------- */
  const CSS = `
    :root {
      --nav-h: 66px;
      --v: #1a5c3a; --vc: #2d8a58; --vp: #e8f5ee; --vd: #0d3320;
      --o: #c8860a; --oc: #f5a623; --op: #fdf3e3;
      --br: #3d2b1f; --wh: #fdfcf8; --gr: #f0ede6;
      --tx: #1a1a18; --td: #4a4a44; --tp: #8a8a82;
      --rouge: #c0392b; --rouge-h: #a93226;
    }
    [data-lang="fr"] .en { display: none !important; }
    [data-lang="en"] .fr { display: none !important; }
    body { padding-top: var(--nav-h); }

    #mb-header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 9500;
      height: var(--nav-h);
      background: rgba(253,252,248,.97);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid rgba(26,92,58,.1);
      display: flex; align-items: center;
      padding: 0 2.5rem;
      font-family: 'DM Sans', sans-serif;
      transition: box-shadow .3s;
    }
    #mb-header.scrolled { box-shadow: 0 4px 32px rgba(0,0,0,.1); }

    .mb-logo {
      display: flex; align-items: center; gap: 11px;
      text-decoration: none; flex-shrink: 0; margin-right: auto;
    }
    .mb-logo img { height: 50px; width: auto; }
    .mb-logo-name {
      font-family: 'Playfair Display', serif;
      font-size: 14px; font-weight: 700; color: var(--v);
    }
    .mb-logo-tagline {
      font-size: 9px; color: var(--tp);
      letter-spacing: .08em; text-transform: uppercase;
      font-family: 'Space Mono', monospace;
    }

    .mb-nav-links {
      display: flex; align-items: center; gap: 2px;
      list-style: none; margin: 0; padding: 0;
    }
    .mb-nav-item { position: relative; }
    .mb-nav-link {
      display: flex; align-items: center; gap: 4px;
      padding: 7px 13px;
      font-size: 13.5px; font-weight: 600;
      color: var(--td); text-decoration: none;
      border-radius: 9px; transition: all .18s;
      white-space: nowrap;
    }
    .mb-nav-link:hover, .mb-nav-link.active {
      color: var(--v); background: var(--vp);
    }
    .mb-nav-caret {
      font-size: 8px; opacity: .45;
      transition: transform .22s;
    }
    .mb-nav-item:hover .mb-nav-caret { transform: rotate(180deg); }

    .mb-dropdown {
      position: absolute; top: calc(100% + 10px); left: 50%;
      transform: translateX(-50%) translateY(8px);
      background: white; border-radius: 14px;
      border: 1px solid rgba(26,92,58,.1);
      box-shadow: 0 20px 60px rgba(0,0,0,.13);
      min-width: 230px; padding: 6px;
      opacity: 0; pointer-events: none;
      transition: opacity .22s, transform .22s;
    }
    .mb-nav-item:hover .mb-dropdown {
      opacity: 1; pointer-events: all;
      transform: translateX(-50%) translateY(0);
    }
    .mb-dd-item {
      display: flex; align-items: center; gap: 9px;
      padding: 9px 12px; border-radius: 9px;
      font-size: 13px; font-weight: 500;
      color: var(--td); text-decoration: none;
    }
    .mb-dd-item:hover { background: var(--vp); color: var(--v); }

    .mb-nav-right {
      display: flex; align-items: center; gap: 10px;
      flex-shrink: 0; margin-left: 1.2rem;
    }
    .mb-lang-toggle {
      display: flex; background: var(--gr);
      border-radius: 20px; padding: 3px;
      border: 1px solid rgba(26,92,58,.1);
    }
    .mb-lang-btn {
      padding: 4px 12px; border-radius: 16px;
      border: none; background: none;
      font-size: 11px; font-weight: 700;
      cursor: pointer; color: var(--tp);
      font-family: 'Space Mono', monospace;
    }
    .mb-lang-btn.active { background: var(--v); color: white; }
    .mb-don-btn {
      display: flex; align-items: center; gap: 6px;
      background: var(--rouge); color: white;
      padding: 9px 18px; border-radius: 10px;
      font-size: 13px; font-weight: 700;
      text-decoration: none; white-space: nowrap;
      transition: background .2s, transform .2s;
    }
    .mb-don-btn:hover { background: var(--rouge-h); transform: translateY(-1px); }

    .mb-hamburger {
      display: none; flex-direction: column;
      gap: 5px; cursor: pointer; padding: 8px;
      border: none; background: none;
    }
    .mb-hamburger span {
      display: block; width: 22px; height: 2px;
      background: var(--tx); border-radius: 2px;
      transition: all .28s;
    }
    .mb-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .mb-hamburger.open span:nth-child(2) { opacity: 0; }
    .mb-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* Mobile drawer */
    #mb-mobile-drawer {
      position: fixed; top: var(--nav-h); left: 0; right: 0;
      background: white; z-index: 9400;
      overflow: hidden; max-height: 0;
      transition: max-height .38s cubic-bezier(0.4,0,0.2,1);
    }
    #mb-mobile-drawer.open { max-height: calc(100vh - var(--nav-h)); overflow-y: auto; }
    .mb-drawer-inner { padding: 1rem 1.5rem 2rem; }
    .mb-mob-section-label {
      font-family: 'Space Mono', monospace;
      font-size: 9px; letter-spacing: .14em;
      color: var(--o); margin: 1.2rem 0 .4rem;
    }
    .mb-mob-link {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 8px; font-size: 15px; font-weight: 600;
      color: var(--td); text-decoration: none;
      border-bottom: 1px solid rgba(26,92,58,.06);
    }
    .mb-mob-link.active, .mb-mob-link:hover { color: var(--v); background: var(--vp); }
    .mb-mob-sub { padding-left: 2.5rem; font-size: 13.5px; font-weight: 500; }
    .mb-mob-icon { font-size: 1.1rem; width: 26px; text-align: center; }
    .mb-mob-don {
      margin-top: 1.4rem; padding: 14px;
      background: var(--rouge); color: white;
      border-radius: 12px; font-size: 16px; font-weight: 700;
      text-align: center; text-decoration: none;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .mb-mob-lang-row {
      display: flex; gap: 10px; margin-top: 1.2rem;
      padding-top: 1.2rem; border-top: 1px solid rgba(26,92,58,.08);
    }
    .mb-mob-lang-btn {
      flex: 1; padding: 10px; border-radius: 10px;
      border: 1.5px solid rgba(26,92,58,.2);
      background: none; font-size: 14px; font-weight: 700;
      font-family: 'Space Mono', monospace; cursor: pointer;
    }
    .mb-mob-lang-btn.active { background: var(--v); color: white; border-color: var(--v); }

    /* Footer */
    #mb-footer {
      background: #07150d; font-family: 'DM Sans', sans-serif;
      position: relative; overflow: hidden;
    }
    .mb-footer-main {
      display: grid; grid-template-columns: 1.6fr 1fr 1.2fr 1fr;
      gap: 3rem; padding: 64px 8% 44px; max-width: 1400px; margin: 0 auto;
    }
    .mb-footer-brand-disk {
      width: 52px; height: 52px; border-radius: 50%;
      background: linear-gradient(135deg, var(--v), var(--vc));
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 1rem;
    }
    .mb-footer-brand-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.15rem; font-weight: 700; color: white;
    }
    .mb-footer-brand-tag {
      font-size: 12px; color: rgba(255,255,255,.38);
      line-height: 1.7; margin: .4rem 0 1.4rem;
    }
    .mb-footer-socials { display: flex; gap: 8px; flex-wrap: wrap; }
    .mb-footer-social {
      width: 36px; height: 36px; border-radius: 9px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.1);
      display: flex; align-items: center; justify-content: center;
    }
    .mb-footer-social:hover { background: var(--v); border-color: var(--vc); }
    .mb-footer-col-title {
      font-family: 'Space Mono', monospace;
      font-size: 10px; letter-spacing: .14em;
      color: var(--oc); text-transform: uppercase;
      margin-bottom: 1.2rem;
    }
    .mb-footer-links { list-style: none; display: flex; flex-direction: column; gap: 4px; }
    .mb-footer-links a {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 8px; border-radius: 7px;
      font-size: 13.5px; color: rgba(255,255,255,.5);
      text-decoration: none;
    }
    .mb-footer-links a:hover { color: white; background: rgba(255,255,255,.04); }
    .mb-footer-contact { display: flex; flex-direction: column; gap: 10px; }
    .mb-footer-ci {
      display: flex; align-items: flex-start; gap: 9px;
      font-size: 13px; color: rgba(255,255,255,.5);
    }
    .mb-footer-don-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      width: 100%; padding: 14px 20px;
      background: var(--rouge); color: white;
      border-radius: 12px; font-size: 15px; font-weight: 700;
      text-decoration: none; margin-bottom: 1.2rem;
    }
    .mb-footer-don-btn:hover { background: var(--rouge-h); transform: translateY(-2px); }
    .mb-footer-don-desc {
      font-size: 12px; color: rgba(255,255,255,.35);
      line-height: 1.6; text-align: center;
    }
    .mb-footer-bottom {
      border-top: 1px solid rgba(255,255,255,.05);
      padding: 22px 8%; max-width: 1400px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 12px;
    }
    .mb-footer-copy { font-size: 12px; color: rgba(255,255,255,.25); }
    .mb-footer-accreds { display: flex; gap: 6px; flex-wrap: wrap; }
    .mb-footer-accred {
      font-family: 'Space Mono', monospace;
      font-size: 9px; letter-spacing: .06em;
      color: rgba(255,255,255,.28);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 6px; padding: 3px 9px;
    }

    @media (max-width: 992px) {
      .mb-nav-links { display: none; }
      .mb-don-btn { display: none; }
      .mb-hamburger { display: flex; }
      .mb-footer-main { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
    }
    @media (max-width: 640px) {
      :root { --nav-h: 60px; }
      #mb-header { padding: 0 1.2rem; }
      .mb-logo-tagline { display: none; }
      .mb-footer-main { grid-template-columns: 1fr; }
    }
  `;
  if (!document.getElementById('mb-nav-css')) {
    const style = document.createElement('style');
    style.id = 'mb-nav-css';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ---------- 2. Icônes SVG (définition complète) ---------- */
  const ICONS = {
    email: `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.5" fill="none"/><polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" fill="none"/></svg>`,
    mail_sm: `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" fill="none"/><polyline points="22,6 12,13 2,6" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" fill="none"/></svg>`,
    location: `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" fill="none"/><circle cx="12" cy="10" r="3" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" fill="none"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="14" height="14"><polyline points="20 6 9 17 4 12" stroke="#2d8a58" stroke-width="2" fill="none"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="10" stroke="rgba(245,166,35,0.7)" stroke-width="1.5" fill="none"/><polyline points="12 6 12 12 16 14" stroke="rgba(245,166,35,0.7)" stroke-width="1.5" fill="none"/></svg>`,
  };

  /* ---------- 3. Structure des menus ---------- */
  const NAV_ITEMS = [
    { labelFR: 'Accueil', labelEN: 'Home', href: 'index.html', icon: '🏠' },
    {
      labelFR: 'À propos', labelEN: 'About',
      href: 'apropos.html', icon: '📖',
      children: [
        { labelFR: '👥 Équipe', labelEN: '👥 Team', href: 'equipe.html' },
        { labelFR: '🔒 Gouvernance', labelEN: '🔒 Governance', href: 'gouvernance.html' }
      ]
    },
    {
      labelFR: 'Projets', labelEN: 'Projects',
      href: 'projets.html', icon: '🗂️',
      children: [
        { labelFR: '🔬 Nos Technologies', labelEN: '🔬 Our Technologies', href: 'technologies.html' },
        { labelFR: '🗺️ Carte des interventions', labelEN: '🗺️ Intervention map', href: 'carte.html' }
      ]
    },
    {
      labelFR: 'Nos Actions', labelEN: 'Our Work',
      href: 'carte.html', icon: '🗺️',
      children: [
        { labelFR: '🌾 Batchenga', labelEN: '🌾 Batchenga', href: 'carte.html#batchenga' },
        { labelFR: '🏗️ Bondjock', labelEN: '🏗️ Bondjock', href: 'carte.html#bondjock' },
        { labelFR: '🌿 Lomié / Baka', labelEN: '🌿 Lomié / Baka', href: 'carte.html#lomie' }
      ]
    },
    { labelFR: 'Actualités', labelEN: 'News', href: 'actualites.html', icon: '📰' },
    { labelFR: 'Formations', labelEN: 'Trainings', href: 'formations-monde-bonheur.html', icon: '🎓' },
    { labelFR: 'Transparence', labelEN: 'Transparency', href: 'gouvernance.html', icon: '🔒' },
    { labelFR: 'Partenaires', labelEN: 'Partners', href: 'partenaires.html', icon: '🤝' }
  ];

  function currentPage() {
    const p = window.location.pathname.split('/').pop();
    return p === '' ? 'index.html' : (p || 'index.html');
  }

  function isActive(href) {
    const page = currentPage();
    const base = href.split('#')[0];
    return page === base;
  }

  function getLang() {
    return (document.documentElement.getAttribute('data-lang') || 'fr').toLowerCase();
  }

  function resolveHref(href) {
    if (!href.startsWith('#')) return href;
    return (currentPage() === 'index.html') ? href : 'index.html' + href;
  }

  /* ---------- 4. Construction du header ---------- */
  function buildNavItem(item, l) {
    const label = l === 'fr' ? item.labelFR : item.labelEN;
    const active = isActive(item.href);
    if (item.children && item.children.length) {
      const ddItems = item.children.map(child => {
        const cl = l === 'fr' ? child.labelFR : child.labelEN;
        return `<a class="mb-dd-item" href="${resolveHref(child.href)}">${cl}</a>`;
      }).join('');
      return `
        <li class="mb-nav-item">
          <a class="mb-nav-link${active ? ' active' : ''}" href="${item.href}">
            ${label} <span class="mb-nav-caret">▾</span>
          </a>
          <div class="mb-dropdown">${ddItems}</div>
        </li>`;
    }
    return `<li class="mb-nav-item"><a class="mb-nav-link${active ? ' active' : ''}" href="${item.href}">${label}</a></li>`;
  }

  function buildHeader(l) {
    const navLinks = NAV_ITEMS.map(item => buildNavItem(item, l)).join('');
    return `
      <a href="index.html" class="mb-logo">
        <img src="logo.jpeg" alt="Logo Monde et Bonheur">
        <div class="mb-logo-text">
          <span class="mb-logo-name">Monde et Bonheur</span>
          <span class="mb-logo-tagline fr">ONG · Cameroun & France</span>
          <span class="mb-logo-tagline en">NGO · Cameroon & France</span>
        </div>
      </a>
      <ul class="mb-nav-links">${navLinks}</ul>
      <div class="mb-nav-right">
        <div class="mb-lang-toggle">
          <button class="mb-lang-btn${l === 'fr' ? ' active' : ''}" onclick="MBNav.setLang('fr')">FR</button>
          <button class="mb-lang-btn${l === 'en' ? ' active' : ''}" onclick="MBNav.setLang('en')">EN</button>
        </div>
        <a class="mb-don-btn" href="don.html">❤️ <span class="fr">Faire un don</span><span class="en">Donate</span></a>
        <button class="mb-hamburger" id="mb-hamburger" onclick="MBNav.toggleMobile()">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;
  }

  /* ---------- 5. Construction du drawer mobile ---------- */
  function buildDrawer(l) {
    let html = '';
    for (const item of NAV_ITEMS) {
      const label = l === 'fr' ? item.labelFR : item.labelEN;
      const active = isActive(item.href);
      html += `<a class="mb-mob-link${active ? ' active' : ''}" href="${item.href}">
        <span class="mb-mob-icon">${item.icon}</span>${label}
      </a>`;
      if (item.children) {
        for (const child of item.children) {
          const cl = l === 'fr' ? child.labelFR : child.labelEN;
          html += `<a class="mb-mob-link mb-mob-sub" href="${resolveHref(child.href)}">
            <span class="mb-mob-icon" style="opacity:.5">↳</span>${cl}
          </a>`;
        }
      }
    }
    const donText = l === 'fr' ? '❤️ Faire un don maintenant' : '❤️ Donate Now';
    return `
      <div class="mb-drawer-inner">
        <div class="mb-mob-section-label fr">NAVIGATION</div>
        <div class="mb-mob-section-label en">NAVIGATION</div>
        ${html}
        <a class="mb-mob-don" href="don.html">${donText}</a>
        <div class="mb-mob-lang-row">
          <button class="mb-mob-lang-btn${l === 'fr' ? ' active' : ''}" onclick="MBNav.setLang('fr')">🇫🇷 Français</button>
          <button class="mb-mob-lang-btn${l === 'en' ? ' active' : ''}" onclick="MBNav.setLang('en')">🇬🇧 English</button>
        </div>
      </div>
    `;
  }

  /* ---------- 6. Construction du footer ---------- */
  function buildFooter(l) {
    const pages = [
      { labelFR: '🏠 Accueil', labelEN: '🏠 Home', href: 'index.html' },
      { labelFR: '📖 À propos', labelEN: '📖 About', href: 'apropos.html' },
      { labelFR: '🗂️ Projets', labelEN: '🗂️ Projects', href: 'projets.html' },
      { labelFR: '🔬 Technologies', labelEN: '🔬 Technologies', href: 'technologies.html' },
      { labelFR: '🗺️ Zones d\'intervention', labelEN: '🗺️ Intervention Zones', href: 'carte.html' },
      { labelFR: '📰 Actualités', labelEN: '📰 News', href: 'actualites.html' },
      { labelFR: '🎓 Formations', labelEN: '🎓 Trainings', href: 'formations-monde-bonheur.html' },
      { labelFR: '🤝 Partenaires', labelEN: '🤝 Partners', href: 'partenaires.html' },
      { labelFR: '🔒 Gouvernance', labelEN: '🔒 Governance', href: 'gouvernance.html' },
      { labelFR: '👥 Équipe', labelEN: '👥 Team', href: 'equipe.html' },
    ];
    const links = pages.map(p => `<li><a href="${p.href}">${l === 'fr' ? p.labelFR : p.labelEN}</a></li>`).join('');
    const donDesc = l === 'fr'
      ? '96% de vos dons vont directement sur le terrain au Cameroun.'
      : '96% of your donations go directly to fieldwork in Cameroon.';
    const donBtn = l === 'fr' ? '❤️ Faire un don' : '❤️ Donate';
    return `
      <div class="mb-footer-main">
        <div class="mb-footer-brand">
          <div class="mb-footer-brand-disk"><img src="logo.jpeg" alt="Logo" style="width: 45px; border-radius: 50%;"></div>
          <div class="mb-footer-brand-name">Monde et Bonheur</div>
          <div class="mb-footer-brand-tag fr">Association de Solidarité Internationale &amp; Entreprise Sociale.<br>« De la Résilience Humaine à l'Innovation Climatique »</div>
          <div class="mb-footer-brand-tag en">International Solidarity Association &amp; Social Enterprise.<br>"From Human Resilience to Climate Innovation"</div>
          <div class="mb-footer-socials">
            <a class="mb-footer-social" href="mailto:courrielmondeetbonheur@gmail.com">${ICONS.email}</a>
            <a class="mb-footer-social" href="https://wa.me/237682180363" target="_blank">${ICONS.whatsapp}</a>
            <a class="mb-footer-social" href="#">${ICONS.facebook}</a>
            <a class="mb-footer-social" href="#">${ICONS.linkedin}</a>
          </div>
        </div>
        <div>
          <div class="mb-footer-col-title fr">PAGES</div>
          <div class="mb-footer-col-title en">PAGES</div>
          <ul class="mb-footer-links">${links}</ul>
        </div>
        <div>
          <div class="mb-footer-col-title fr">CONTACT &amp; SIÈGES</div>
          <div class="mb-footer-col-title en">CONTACT &amp; OFFICES</div>
          <div class="mb-footer-contact">
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.mail_sm}</span><a href="mailto:courrielmondeetbonheur@gmail.com">courrielmondeetbonheur@gmail.com</a></div>
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.phone}</span>+237 682 18 03 63 (Cameroun)</div>
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.phone}</span>+33 6 23 92 21 71 (France)</div>
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.location}</span><span class="fr">BP 17663, Yaoundé · Cameroun</span><span class="en">BP 17663, Yaoundé · Cameroon</span></div>
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.location}</span>3 Clos des Chabrats, 24650 Chancelade · France</div>
          </div>
        </div>
        <div>
          <div class="mb-footer-col-title fr">SOUTENIR LA MISSION</div>
          <div class="mb-footer-col-title en">SUPPORT THE MISSION</div>
          <a class="mb-footer-don-btn" href="don.html">${donBtn}</a>
          <p class="mb-footer-don-desc">${donDesc}</p>
          <div style="margin-top:1.4rem">
            <div class="mb-footer-col-title fr">ACCRÉDITATIONS</div>
            <div class="mb-footer-col-title en">ACCREDITATIONS</div>
            <div class="mb-footer-contact">
              <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.check}</span>MINATD N°00000404 (2006)</div>
              <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.check}</span>MINREX — <span class="fr">Répertoire ONG</span><span class="en">NGO Registry</span></div>
              <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.check}</span>Label FORIM · France</div>
              <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.check}</span>Loi 1901 — <span class="fr">Fondée 2005</span><span class="en">Founded 2005</span></div>
              <div class="mb-footer-ci"><span class="mb-footer-ci-ico">${ICONS.clock}</span>GCF — <span class="fr">Accréditation en cours 2026</span><span class="en">Accreditation in progress 2026</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-footer-bottom">
        <div class="mb-footer-copy fr">© 2026 ONG Monde et Bonheur · Tous droits réservés</div>
        <div class="mb-footer-copy en">© 2026 ONG Monde et Bonheur · All rights reserved</div>
        <div class="mb-footer-accreds">
          <span class="mb-footer-accred">MINATD ✓</span>
          <span class="mb-footer-accred">MINREX ✓</span>
          <span class="mb-footer-accred">FORIM ✓</span>
          <span class="mb-footer-accred fr">96% TERRAIN</span>
          <span class="mb-footer-accred en">96% TO FIELD</span>
          <span class="mb-footer-accred">LOI 1901 ✓</span>
        </div>
      </div>
    `;
  }

  /* ---------- 7. Injection ---------- */
  function inject() {
    const lang = getLang();

    let header = document.getElementById('mb-header');
    if (!header) {
      header = document.createElement('header');
      header.id = 'mb-header';
      document.body.insertBefore(header, document.body.firstChild);
    }
    header.innerHTML = buildHeader(lang);

    let drawer = document.getElementById('mb-mobile-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'mb-mobile-drawer';
      header.insertAdjacentElement('afterend', drawer);
    }
    drawer.innerHTML = buildDrawer(lang);

    let footer = document.getElementById('mb-footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.id = 'mb-footer';
      document.body.appendChild(footer);
    }
    footer.innerHTML = buildFooter(lang);

    if (!document.getElementById('mb-nav-injected')) {
      const marker = document.createElement('meta');
      marker.id = 'mb-nav-injected';
      document.head.appendChild(marker);
    }

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---------- 8. API publique ---------- */
  window.MBNav = {
    setLang: function(l) {
      document.documentElement.setAttribute('data-lang', l);
      document.documentElement.setAttribute('lang', l);
      const header = document.getElementById('mb-header');
      const drawer = document.getElementById('mb-mobile-drawer');
      const footer = document.getElementById('mb-footer');
      if (header) header.innerHTML = buildHeader(l);
      if (drawer) drawer.innerHTML = buildDrawer(l);
      if (footer) footer.innerHTML = buildFooter(l);
      if (drawer) drawer.classList.remove('open');
      const ham = document.getElementById('mb-hamburger');
      if (ham) ham.classList.remove('open');
    },
    toggleMobile: function() {
      const drawer = document.getElementById('mb-mobile-drawer');
      const ham = document.getElementById('mb-hamburger');
      if (drawer) drawer.classList.toggle('open');
      if (ham) ham.classList.toggle('open');
    },
    closeMobile: function() {
      const drawer = document.getElementById('mb-mobile-drawer');
      const ham = document.getElementById('mb-hamburger');
      if (drawer) drawer.classList.remove('open');
      if (ham) ham.classList.remove('open');
    },
    getLang: getLang
  };

  document.addEventListener('click', function(e) {
    const drawer = document.getElementById('mb-mobile-drawer');
    const header = document.getElementById('mb-header');
    if (!drawer || !drawer.classList.contains('open')) return;
    if (header && header.contains(e.target)) return;
    if (drawer.contains(e.target)) return;
    window.MBNav.closeMobile();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
