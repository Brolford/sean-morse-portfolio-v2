/**
 * Hero Showcase — cinematic auto-cycling background with Ken Burns effect.
 * Cursor glow on dark sections.
 * Compatible with Astro View Transitions via astro:page-load event.
 */
(function() {
  var activeBgInterval = null;

  function initHeroShowcase() {
    /* Clean up previous interval if navigating back */
    if (activeBgInterval) {
      clearInterval(activeBgInterval);
      activeBgInterval = null;
    }

    var bgContainer = document.getElementById('hero-showcase-bg');
    if (!bgContainer) return;

    /* Clear any existing slides from previous navigation */
    bgContainer.innerHTML = '';

    var imagesData = [];
    try {
      imagesData = JSON.parse(bgContainer.getAttribute('data-hero-images') || '[]');
    } catch(e) { return; }
    if (!imagesData.length) return;

    /* Preload hero images */
    imagesData.forEach(function(img) {
      var preload = new Image();
      preload.src = img.src;
    });

    /* Ken Burns: each image gets a unique start/end transform */
    var kenBurnsVariants = [
      { from: 'scale(1.0) translate(0, 0)',     to: 'scale(1.15) translate(-2%, -1%)' },
      { from: 'scale(1.05) translate(1%, 0)',    to: 'scale(1.0) translate(-1%, 1%)' },
      { from: 'scale(1.0) translate(-1%, 1%)',   to: 'scale(1.12) translate(1%, -1%)' },
      { from: 'scale(1.08) translate(0, -1%)',   to: 'scale(1.0) translate(0, 1%)' },
      { from: 'scale(1.0) translate(2%, 0)',     to: 'scale(1.1) translate(-1%, -1%)' },
    ];

    /* Create all slides */
    imagesData.forEach(function(img, i) {
      var div = document.createElement('div');
      div.className = 'hero-bg-slide';
      div.style.cssText = 'position:absolute;inset:0;opacity:0;transition:opacity 1.2s ease;will-change:opacity,transform;';
      var variant = kenBurnsVariants[i % kenBurnsVariants.length];
      div.style.transform = variant.from;
      div.style.backgroundImage = 'url(' + img.src + ')';
      div.style.backgroundSize = 'cover';
      div.style.backgroundPosition = 'center';
      div.setAttribute('data-kb-from', variant.from);
      div.setAttribute('data-kb-to', variant.to);
      bgContainer.appendChild(div);
    });

    var slides = bgContainer.querySelectorAll('.hero-bg-slide');
    var currentBgIndex = 0;

    function showSlide(index) {
      slides.forEach(function(s, i) {
        if (i === index) {
          s.style.opacity = '1';
          s.style.transition = 'opacity 1.2s ease, transform 6s ease';
          s.style.transform = s.getAttribute('data-kb-to');
        } else {
          s.style.opacity = '0';
          s.style.transition = 'opacity 1.2s ease';
          s.style.transform = s.getAttribute('data-kb-from');
        }
      });
      currentBgIndex = index;
    }

    /* Start the cycle */
    showSlide(0);
    activeBgInterval = setInterval(function() {
      showSlide((currentBgIndex + 1) % slides.length);
    }, 5000);
  }

  function initCursorGlow() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    document.querySelectorAll('.cursor-glow-section').forEach(function(section) {
      if (section.dataset.glowWired) return;
      section.dataset.glowWired = 'true';

      section.addEventListener('mousemove', function(e) {
        var rect = section.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        section.style.background = 'radial-gradient(600px circle at ' + x + 'px ' + y + 'px, rgba(196,84,26,0.12), var(--color-block) 50%)';
      });
      section.addEventListener('mouseleave', function() {
        section.style.background = 'var(--color-block)';
      });
    });
  }

  function init() {
    initHeroShowcase();
    initCursorGlow();
  }

  /* Run on initial load */
  init();

  /* Re-run after every Astro View Transition */
  document.addEventListener('astro:page-load', init);
})();
