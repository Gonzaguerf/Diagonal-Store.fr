/* ================================================
   DIAGONAL STORE — Premium JavaScript
   ================================================ */

(function () {
  'use strict';

  /* ---- Scroll Reveal ---- */
  function initReveal() {
    const targets = document.querySelectorAll('.ds-reveal, .ds-reveal-left');
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => io.observe(el));
  }

  /* ---- Cursor (desktop only) ---- */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'ds-cursor';
    cursor.innerHTML = '<div class="ds-cursor__dot"></div>';
    document.body.appendChild(cursor);

    let mx = 0, my = 0, cx = 0, cy = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function tick() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    }

    tick();

    /* Scale on hover clickable elements */
    document.querySelectorAll('a, button, .product-card').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    });
  }

  /* ---- Hero parallax ---- */
  function initHeroParallax() {
    const bg = document.querySelector('.ds-hero__bg-img');
    if (!bg || window.matchMedia('(max-width: 768px)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          bg.style.transform = `translateY(${scrolled * 0.35}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Init on DOM ready ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initReveal();
    initCursor();
    initHeroParallax();
  }

})();

/* ---- Cursor styles (injected via JS to keep CSS file clean) ---- */
(function injectCursorCSS() {
  if (window.matchMedia('(hover: none)').matches) return;
  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }
    .ds-cursor {
      position: fixed;
      top: -16px; left: -16px;
      width: 32px; height: 32px;
      pointer-events: none;
      z-index: 99999;
      mix-blend-mode: difference;
      transition: transform 0.06s linear;
    }
    .ds-cursor__dot {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: white;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease;
    }
    .ds-cursor.is-active .ds-cursor__dot {
      transform: scale(2.2);
      opacity: 0.7;
    }
  `;
  document.head.appendChild(style);
})();
