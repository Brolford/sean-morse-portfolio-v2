/**
 * Animation system — scroll-triggered entrance, hero blur reveal, magnetic buttons
 * Compatible with Astro View Transitions via astro:page-load event.
 */
(function() {

  function init() {
    /* ── Intersection Observer for scroll-triggered elements ── */
    var observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    /* Reset and re-observe all animated elements (needed after View Transition) */
    document.querySelectorAll('.animate-up, .animate-up-rich').forEach(function(el) {
      el.classList.remove('visible');
      observer.observe(el);
    });

    /* ── Hero entrance — blur reveal + supporting fades ── */
    var blurElements = document.querySelectorAll('.hero-blur-reveal');
    var heroElements = document.querySelectorAll('.hero-animate');
    var heroRule = document.querySelector('.hero-rule');

    if (blurElements.length || heroElements.length) {
      /* Small delay so the page renders first, then animate in */
      setTimeout(function() {
        if (heroRule) heroRule.classList.add('visible');
        blurElements.forEach(function(el) { el.classList.add('visible'); });
        heroElements.forEach(function(el) { el.classList.add('visible'); });
      }, 50);
    }

    /* ── Magnetic buttons — subtle pull toward cursor (max 4px) ── */
    if (window.matchMedia('(hover: hover)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.work-cta-btn, .about-contact-btn').forEach(function(btn) {
        if (btn.dataset.magneticWired) return;
        btn.dataset.magneticWired = 'true';
        btn.classList.add('magnetic-btn');

        btn.addEventListener('mousemove', function(e) {
          var rect = btn.getBoundingClientRect();
          var centerX = rect.left + rect.width / 2;
          var centerY = rect.top + rect.height / 2;
          var deltaX = (e.clientX - centerX) / rect.width;
          var deltaY = (e.clientY - centerY) / rect.height;
          btn.style.transform = 'translate(' + (deltaX * 4) + 'px, ' + (deltaY * 4) + 'px)';
        });

        btn.addEventListener('mouseleave', function() {
          btn.style.transform = 'translate(0, 0)';
        });
      });
    }

    /* ── Work CTA button hover ── */
    var ctaBtn = document.querySelector('.work-cta-btn');
    if (ctaBtn && !ctaBtn.dataset.ctaWired) {
      ctaBtn.dataset.ctaWired = 'true';
      ctaBtn.addEventListener('mouseenter', function() {
        this.style.borderColor = 'white';
        this.style.background = 'rgba(255,255,255,0.06)';
      });
      ctaBtn.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(255,255,255,0.4)';
        this.style.background = 'transparent';
      });
    }
  }

  /* Run on initial load */
  init();

  /* Re-run after every Astro View Transition navigation */
  document.addEventListener('astro:page-load', init);

})();
