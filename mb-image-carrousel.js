/**
 * mb-carrousel-images.js
 * Carrousel premium pour les 15 images de la présentation
 * Injecté automatiquement par mb-nav.js sur toutes les pages
 */

(function() {
  'use strict';

  // Données des 15 images (extrait des fichiers fournis)
  const IMAGES = [
    {
      src: 'images/carousel/0.jpg',
      altFR: 'De la résilience humaine à l’innovation climatique',
      altEN: 'From human resilience to climate innovation',
      captionFR: 'Des solutions technologiques pour l’Afrique de demain',
      captionEN: 'Technological solutions for tomorrow\'s Africa'
    },
    {
      src: 'images/carousel/1.jpg',
      altFR: 'Le parcours de la présidente fondatrice',
      altEN: 'The founding president\'s journey',
      captionFR: 'L’Université de la Vie · 1983-2004',
      captionEN: 'The University of Life · 1983-2004'
    },
    {
      src: 'images/carousel/2.jpg',
      altFR: 'Structure hybride et transnationale',
      altEN: 'Hybrid and transnational structure',
      captionFR: 'France : siège international · Cameroun : siège opérationnel',
      captionEN: 'France : international HQ · Cameroon : operational HQ'
    },
    {
      src: 'images/carousel/3.jpg',
      altFR: 'Briser les silos du développement',
      altEN: 'Breaking development silos',
      captionFR: 'Le modèle systémique 7ESAR',
      captionEN: 'The 7ESAR systemic model'
    },
    {
      src: 'images/carousel/4.jpg',
      altFR: 'Cuisinière thermodynamique',
      altEN: 'Thermodynamic cooker',
      captionFR: '90% de biomasse économisée · Zéro fumée',
      captionEN: '90% biomass saved · Zero smoke'
    },
    {
      src: 'images/carousel/5.jpg',
      altFR: 'Séchoir Flash 5 minutes',
      altEN: '5-Minute Flash Dryer',
      captionFR: 'Séchage traditionnel : 3-5 jours · Séchoir MB : 5 minutes',
      captionEN: 'Traditional drying: 3-5 days · MB dryer: 5 minutes'
    },
    {
      src: 'images/carousel/6.jpg',
      altFR: 'Biométhanisation – économie circulaire',
      altEN: 'Biodigestion – circular economy',
      captionFR: 'Déchets → biogaz + digestat',
      captionEN: 'Waste → biogas + digestate'
    },
    {
      src: 'images/carousel/7.jpg',
      altFR: 'MetaScript – laboratoire virtuel',
      altEN: 'MetaScript – virtual laboratory',
      captionFR: 'Un laboratoire dans la poche de chaque enfant',
      captionEN: 'A laboratory in every child\'s pocket'
    },
    {
      src: 'images/carousel/8.jpg',
      altFR: 'Impact terrain : Batchenga, Lomié, Bondjock',
      altEN: 'Field impact: Batchenga, Lomié, Bondjock',
      captionFR: 'Laboratoire agricole · Dignité autochtone · Hub technologique',
      captionEN: 'Agricultural lab · Indigenous dignity · Tech hub'
    },
    {
      src: 'images/carousel/9.jpg',
      altFR: '20 ans d’actions mesurables',
      altEN: '20 years of measurable actions',
      captionFR: '10 000+ vies impactées · 90% réduction bois · 0 perte post-récolte',
      captionEN: '10,000+ lives impacted · 90% wood reduction · 0 post-harvest loss'
    },
    {
      src: 'images/carousel/10.jpg',
      altFR: 'Ambition 2026 : le saut industriel',
      altEN: '2026 ambition: industrial leap',
      captionFR: 'Unité de production · 50 emplois directs · -30% coût',
      captionEN: 'Production unit · 50 direct jobs · -30% cost'
    },
    {
      src: 'images/carousel/11.jpg',
      altFR: 'Expansion panafricaine 2026-2030',
      altEN: 'Pan-African expansion 2026-2030',
      captionFR: '7 pays cibles · Modèle "tache d\'huile"',
      captionEN: '7 target countries · "Oil stain" model'
    },
    {
      src: 'images/carousel/12.jpg',
      altFR: 'Ingénierie financière & green finance',
      altEN: 'Financial engineering & green finance',
      captionFR: 'Fonds de roulement rotatif · Crédits carbone · Social business',
      captionEN: 'Revolving fund · Carbon credits · Social business'
    },
    {
      src: 'images/carousel/13.jpg',
      altFR: 'Devenez co-bâtisseurs de l’avenir',
      altEN: 'Become co-builders of the future',
      captionFR: 'Entreprises · Banques · Institutions',
      captionEN: 'Companies · Banks · Institutions'
    },
    {
      src: 'images/carousel/14.jpg',
      altFR: 'Le temps de l’audace',
      altEN: 'The age of boldness',
      captionFR: 'Rejoignez Monde et Bonheur',
      captionEN: 'Join Monde et Bonheur'
    }
  ];

  // Construction du HTML du carrousel (version premium)
  function buildCarrouselImages(lang) {
    // Exclure la page don.html si souhaité (modifiable)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'don.html') return '';

    const items = IMAGES.map(img => `
      <div class="mbc-image-item">
        <img src="${img.src}" alt="${lang === 'fr' ? img.altFR : img.altEN}" loading="lazy">
        <div class="mbc-image-caption">${lang === 'fr' ? img.captionFR : img.captionEN}</div>
      </div>
    `).join('');

    return `
      <section class="mbc-image-carrousel">
        <div class="mbc-carrousel-header">
          <div class="mbc-lbl">
            <span class="fr">📸 NOTRE PRÉSENTATION</span>
            <span class="en">📸 OUR PRESENTATION</span>
          </div>
          <h2 class="mbc-title">
            <span class="fr">De la résilience humaine<br>à l'innovation climatique</span>
            <span class="en">From human resilience<br>to climate innovation</span>
          </h2>
        </div>
        <div class="mbc-carrousel-wrapper">
          <button class="mbc-prev" aria-label="Précédent">❮</button>
          <div class="mbc-track-container">
            <div class="mbc-track">
              ${items}
            </div>
          </div>
          <button class="mbc-next" aria-label="Suivant">❯</button>
        </div>
        <div class="mbc-dots-container"></div>
      </section>
    `;
  }

  // Initialisation du carrousel après injection
  function initImageCarrousel() {
    const container = document.querySelector('.mbc-image-carrousel');
    if (!container) return;

    const track = container.querySelector('.mbc-track');
    const prevBtn = container.querySelector('.mbc-prev');
    const nextBtn = container.querySelector('.mbc-next');
    const dotsContainer = container.querySelector('.mbc-dots-container');

    if (!track) return;

    const items = Array.from(track.children);
    const total = items.length;
    let currentIndex = 0;
    let autoPlayInterval = null;
    const AUTO_PLAY_DELAY = 6000; // 6 secondes entre chaque slide

    // Fonction pour mettre à jour l'affichage (défilement)
    function updateCarrousel() {
      const itemWidth = items[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(track).gap) || 20;
      const shift = -currentIndex * (itemWidth + gap);
      track.style.transform = `translateX(${shift}px)`;
      updateDots();
    }

    // Mettre à jour les points actifs
    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.mbc-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    // Aller à une slide spécifique
    function goToSlide(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      currentIndex = index;
      updateCarrousel();
    }

    // Créer les points de navigation
    function createDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.classList.add('mbc-dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    // Gérer le redimensionnement pour recalculer
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCarrousel();
      }, 100);
    });

    // Gestion des boutons
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Défilement tactile (swipe)
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 50) {
        if (delta > 0) goToSlide(currentIndex - 1);
        else goToSlide(currentIndex + 1);
      }
    });

    // Auto-play
    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, AUTO_PLAY_DELAY);
    }
    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }
    startAutoPlay();
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    createDots();
    updateCarrousel();
  }

  // Exposer l'initialisation pour que mb-nav.js puisse l'appeler
  window.MBImageCarrousel = {
    init: initImageCarrousel,
    build: buildCarrouselImages
  };
})();