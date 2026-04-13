/**
 * mb-carrousel-images.js – Carrousel d'images premium
 * Injecte un carrousel avant le footer sur toutes les pages.
 */

(function() {
  'use strict';

  // Ne pas injecter sur la page don.html (optionnel)
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage === 'don.html') return;

  // Configuration
  const IMAGE_COUNT = 15;
  const IMAGE_PATH = 'images/carrousel/'; // chemin relatif à la racine
  const AUTOPLAY_DELAY = 5000;

  const TITLES = {
    fr: 'Notre histoire en images',
    en: 'Our story in pictures'
  };

  // Générer la liste des images
  const images = [];
  for (let i = 0; i < IMAGE_COUNT; i++) {
    images.push({
      src: `${IMAGE_PATH}${i}.jpg`,
      alt: `Image ${i+1} – Monde et Bonheur`
    });
  }

  // Styles (injectés s'ils ne le sont pas déjà)
  const css = `
    .mb-image-carrousel {
      background: var(--gr, #f0ede6);
      padding: 3rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
      font-family: 'DM Sans', sans-serif;
    }
    .mb-image-carrousel-title {
      text-align: center;
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      font-weight: 700;
      color: var(--vert, #1a5c3a);
      margin-bottom: 2rem;
    }
    .mb-image-carrousel-container {
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .mb-image-carrousel-track {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }
    .mb-image-carrousel-slide {
      flex: 0 0 100%;
      min-width: 0;
      position: relative;
    }
    .mb-image-carrousel-slide img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      max-height: 70vh;
      object-position: center;
    }
    .mb-image-carrousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      pointer-events: none;
    }
    .mb-image-carrousel-btn {
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      font-size: 1.8rem;
      font-weight: bold;
      color: white;
      cursor: pointer;
      transition: background 0.2s;
      pointer-events: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mb-image-carrousel-btn:hover {
      background: rgba(0,0,0,0.8);
    }
    .mb-image-carrousel-dots {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 1.5rem;
      flex-wrap: wrap;
    }
    .mb-image-carrousel-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--tp, #8a8a82);
      cursor: pointer;
      transition: all 0.2s;
    }
    .mb-image-carrousel-dot.active {
      background: var(--vert, #1a5c3a);
      transform: scale(1.2);
    }

    @media (max-width: 768px) {
      .mb-image-carrousel {
        padding: 2rem 1rem;
      }
      .mb-image-carrousel-title {
        font-size: 1.6rem;
      }
      .mb-image-carrousel-btn {
        width: 36px;
        height: 36px;
        font-size: 1.4rem;
      }
      .mb-image-carrousel-dot {
        width: 10px;
        height: 10px;
      }
    }
  `;

  if (!document.getElementById('mb-image-carrousel-css')) {
    const style = document.createElement('style');
    style.id = 'mb-image-carrousel-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildCarrousel(lang) {
    const slides = images.map(img => `
      <div class="mb-image-carrousel-slide">
        <img src="${img.src}" alt="${img.alt}" loading="lazy">
      </div>
    `).join('');
    const title = TITLES[lang] || TITLES.fr;
    return `
      <div class="mb-image-carrousel">
        <div class="mb-image-carrousel-title">${title}</div>
        <div class="mb-image-carrousel-container">
          <div class="mb-image-carrousel-track">
            ${slides}
          </div>
          <div class="mb-image-carrousel-nav">
            <button class="mb-image-carrousel-btn prev">❮</button>
            <button class="mb-image-carrousel-btn next">❯</button>
          </div>
        </div>
        <div class="mb-image-carrousel-dots"></div>
      </div>
    `;
  }

  function initCarrousel() {
    const container = document.querySelector('.mb-image-carrousel');
    if (!container) return;

    const track = container.querySelector('.mb-image-carrousel-track');
    const slides = Array.from(container.querySelectorAll('.mb-image-carrousel-slide'));
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    const dotsContainer = container.querySelector('.mb-image-carrousel-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoplayTimer = null;

    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('mb-image-carrousel-dot');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.mb-image-carrousel-dot');

    function updateDots() {
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      const width = slides[0].clientWidth;
      track.style.transform = `translateX(-${currentIndex * width}px)`;
      updateDots();
      resetAutoplay();
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function resetAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    // Gestion du redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = slides[0].clientWidth;
        track.style.transform = `translateX(-${currentIndex * width}px)`;
      }, 100);
    });

    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

    resetAutoplay();
    updateDots();

    // Forcer la largeur initiale
    setTimeout(() => {
      const width = slides[0].clientWidth;
      track.style.transform = `translateX(-${currentIndex * width}px)`;
    }, 100);
  }

  // Injection après que le footer soit présent
  function inject() {
    const checkFooter = setInterval(() => {
      const footer = document.getElementById('mb-footer') || document.querySelector('footer');
      if (footer) {
        clearInterval(checkFooter);
        const lang = document.documentElement.getAttribute('data-lang') || 'fr';
        const carrouselHTML = buildCarrousel(lang);
        footer.insertAdjacentHTML('beforebegin', carrouselHTML);
        initCarrousel();
        console.log('Carrousel d\'images injecté'); // pour vérifier
      }
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();