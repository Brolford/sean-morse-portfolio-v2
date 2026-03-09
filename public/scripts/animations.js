/**
 * Animation system — scroll-triggered entrance + hero animation
 */
(function() {
  /* ── Intersection Observer for .animate-up elements ── */
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

  function observeAll() {
    document.querySelectorAll('.animate-up:not(.visible)').forEach(function(el) {
      observer.observe(el);
    });
  }

  /* Expose for router to re-observe after page transitions */
  window.reObserveAnimations = observeAll;

  /* ── Hero entrance animation (fires once on load) ── */
  function runHeroEntrance() {
    var heroElements = document.querySelectorAll('#page-home .hero-animate');
    var heroRule = document.querySelector('#page-home .hero-rule');

    /* Trigger the rule animation */
    if (heroRule) {
      heroRule.classList.add('visible');
    }

    /* Trigger each hero element (they have their own transition-delay set inline) */
    heroElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  /* ── Work CTA button hover ── */
  function wireWorkCTA() {
    var btn = document.querySelector('.work-cta-btn');
    if (btn) {
      btn.addEventListener('mouseenter', function() {
        this.style.borderColor = 'white';
        this.style.background = 'rgba(255,255,255,0.06)';
      });
      btn.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(255,255,255,0.4)';
        this.style.background = 'transparent';
      });
    }
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function() {
    observeAll();
    runHeroEntrance();
    wireWorkCTA();
  });
})();
