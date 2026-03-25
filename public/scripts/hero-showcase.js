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
      /* Smooth crossfade: 0.8s is fast enough to feel seamless, slow enough to not flash */
      div.style.cssText = 'position:absolute;inset:0;opacity:0;' +
        'transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 4s cubic-bezier(0.4, 0, 0.2, 1);' +
        'will-change:opacity,transform;';
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
          /* Incoming: fade in + Ken Burns drift over 4s */
          s.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 4s cubic-bezier(0.4, 0, 0.2, 1)';
          s.style.opacity = '1';
          s.style.transform = s.getAttribute('data-kb-to');
        } else if (s.style.opacity !== '0') {
          /* Outgoing: fade out smoothly, keep current transform position (no snap) */
          s.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          s.style.opacity = '0';
          /* Reset transform AFTER fade completes so it's invisible when it snaps */
          setTimeout(function() {
            s.style.transition = 'none';
            s.style.transform = s.getAttribute('data-kb-from');
          }, 900);
        }
      });
      currentBgIndex = index;
    }

    /* Start the cycle — 2.5s per image, fast and confident */
    showSlide(0);
    activeBgInterval = setInterval(function() {
      showSlide((currentBgIndex + 1) % slides.length);
    }, 2500);
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
