/**
 * Hash-based client-side router
 * Routes: #/ (home), #/work (archive), #/about, #/project/[slug]
 */
(function() {
  /* Route → page-view ID mapping */
  var routes = {
    '#/':      'page-home',
    '#/work':  'page-work',
    '#/about': 'page-about',
  };

  /* Title per route */
  var titles = {
    '#/':      'Sean Morse — Design Director',
    '#/work':  'Archive — Sean Morse',
    '#/about': 'About — Sean Morse',
  };

  /* Project data (imported inline from rendered page) */
  var projectData = null;
  function getProjects() {
    if (projectData) return projectData;
    /* Read from project cards or archive rows in the DOM */
    projectData = [];
    document.querySelectorAll('.archive-row').forEach(function(row) {
      projectData.push({
        slug: row.getAttribute('data-slug'),
        title: row.querySelector('.archive-name') ? row.querySelector('.archive-name').textContent.trim() : '',
        caseStudy: row.getAttribute('data-case-study') === 'true',
      });
    });
    return projectData;
  }

  function navigate() {
    var hash = window.location.hash || '#/';

    /* Determine which page to show */
    var pageId = routes[hash];
    var projectSlug = null;

    if (!pageId && hash.startsWith('#/project/')) {
      pageId = 'page-project';
      projectSlug = hash.replace('#/project/', '');
    }

    if (!pageId) {
      pageId = 'page-home';
      hash = '#/';
    }

    /* Hide all pages, show target */
    var pages = document.querySelectorAll('.page-view');
    pages.forEach(function(p) {
      p.classList.remove('active');
      p.style.display = 'none';
      p.style.opacity = '0';
    });

    var target = document.getElementById(pageId);
    if (target) {
      target.style.display = 'block';
      /* Force reflow then fade in */
      target.offsetHeight;
      target.style.opacity = '1';
      target.classList.add('active');
    }

    /* Update title */
    if (titles[hash]) {
      document.title = titles[hash];
    } else if (projectSlug) {
      document.title = projectSlug.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); }) + ' — Sean Morse';
    }

    /* Populate project detail if needed */
    if (pageId === 'page-project' && projectSlug) {
      populateProject(projectSlug);
    }

    /* Scroll to top */
    window.scrollTo(0, 0);

    /* Re-observe animate-up elements on this page */
    if (typeof window.reObserveAnimations === 'function') {
      window.reObserveAnimations();
    }
  }

  function populateProject(slug) {
    var gradientEl = document.getElementById('project-detail-gradient');
    var titleEl = document.getElementById('project-detail-title');
    var catEl = document.getElementById('project-detail-category');
    var yearEl = document.getElementById('project-detail-year');
    var taglineEl = document.getElementById('project-detail-tagline');

    /* Find project data from archive rows */
    var row = document.querySelector('.archive-row[data-slug="' + slug + '"]');
    if (row) {
      var name = row.querySelector('.archive-name');
      if (titleEl && name) titleEl.textContent = name.textContent.trim();
    }

    /* Find gradient from project cards */
    var card = document.querySelector('.project-card[data-slug="' + slug + '"]');
    if (card && gradientEl) {
      var bg = card.querySelector('.project-card-bg');
      if (bg) {
        gradientEl.className = 'w-full rounded mb-8';
        gradientEl.style.aspectRatio = '16/9';
        /* Copy gradient class */
        bg.classList.forEach(function(cls) {
          if (cls.startsWith('gradient-')) {
            gradientEl.classList.add(cls);
          }
        });
      }
    }

    /* Set other fields from DOM data attributes or hardcoded lookup */
    var allCards = document.querySelectorAll('.project-card');
    allCards.forEach(function(c) {
      if (c.getAttribute('data-slug') === slug) {
        var overlay = c.querySelector('[style*="category"]');
      }
    });

    /* Set category/year from archive row */
    if (row) {
      var spans = row.querySelectorAll('span');
      if (catEl && spans.length >= 3) catEl.textContent = spans[2].textContent.trim();
      if (yearEl && spans.length >= 4) yearEl.textContent = spans[3].textContent.trim();
    }

    if (taglineEl) taglineEl.textContent = 'Case study coming soon.';
  }

  /* Listen for hash changes */
  window.addEventListener('hashchange', navigate);

  /* Initial route on page load */
  document.addEventListener('DOMContentLoaded', function() {
    navigate();

    /* Wire project card clicks */
    document.querySelectorAll('.project-card').forEach(function(card) {
      if (card.getAttribute('data-coming-soon') === 'true') return;
      card.addEventListener('click', function() {
        var slug = card.getAttribute('data-slug');
        if (slug) window.location.hash = '#/project/' + slug;
      });
    });

    /* Wire archive row clicks */
    document.querySelectorAll('.archive-row').forEach(function(row) {
      if (row.getAttribute('data-case-study') !== 'true') {
        row.style.cursor = 'default';
        return;
      }
      row.addEventListener('click', function() {
        var slug = row.getAttribute('data-slug');
        if (slug) window.location.hash = '#/project/' + slug;
      });
    });

    /* Archive row hover effects */
    document.querySelectorAll('.archive-row').forEach(function(row) {
      row.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(15,15,15,0.025)';
        var name = this.querySelector('.archive-name');
        if (name) name.style.color = 'var(--color-accent)';
      });
      row.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        var name = this.querySelector('.archive-name');
        if (name) name.style.color = 'var(--color-text)';
      });
    });
  });
})();
