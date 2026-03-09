/**
 * Hash-based client-side router
 * Routes: #/ (home), #/work (archive), #/about, #/project/[slug]
 */
(function() {
  var routes = {
    '#/':      'page-home',
    '#/work':  'page-work',
    '#/about': 'page-about',
  };

  var titles = {
    '#/':      'Sean Morse — Design Director',
    '#/work':  'Archive — Sean Morse',
    '#/about': 'About — Sean Morse',
  };

  /**
   * Collage layout patterns — each returns an HTML string.
   * Uses the gradient class to fill placeholder panels.
   * 5 distinct layouts assigned by project index.
   */
  var collageLayouts = [
    /* Layout A: Wide hero + 3-column strip */
    function(g) {
      return '<div class="collage-stack" style="display:flex;flex-direction:column;gap:12px;">' +
        '<div class="' + g + ' rounded" style="width:100%;aspect-ratio:2.4/1;"></div>' +
        '<div class="collage-grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">' +
          '<div class="' + g + ' rounded" style="aspect-ratio:3/4;opacity:0.85;"></div>' +
          '<div class="' + g + ' rounded" style="aspect-ratio:3/4;opacity:0.7;"></div>' +
          '<div class="' + g + ' rounded" style="aspect-ratio:3/4;opacity:0.55;"></div>' +
        '</div>' +
      '</div>';
    },
    /* Layout B: Asymmetric 2-col + tall sidebar */
    function(g) {
      return '<div class="collage-grid" style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px;">' +
        '<div style="display:flex;flex-direction:column;gap:12px;">' +
          '<div class="' + g + ' rounded" style="width:100%;aspect-ratio:4/3;"></div>' +
          '<div class="' + g + ' rounded" style="width:100%;aspect-ratio:3/1;opacity:0.7;"></div>' +
        '</div>' +
        '<div class="' + g + ' rounded" style="width:100%;min-height:200px;opacity:0.85;"></div>' +
      '</div>';
    },
    /* Layout C: Stacked hero + 2 offset squares */
    function(g) {
      return '<div class="collage-stack" style="display:flex;flex-direction:column;gap:12px;">' +
        '<div class="' + g + ' rounded" style="width:100%;aspect-ratio:16/7;"></div>' +
        '<div class="collage-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
          '<div class="' + g + ' rounded" style="aspect-ratio:1/1;opacity:0.8;"></div>' +
          '<div class="' + g + ' rounded" style="aspect-ratio:1/1;opacity:0.6;"></div>' +
        '</div>' +
      '</div>';
    },
    /* Layout D: Mosaic — tall left + stacked right */
    function(g) {
      return '<div class="collage-grid" style="display:grid;grid-template-columns:1fr 1.4fr;gap:12px;">' +
        '<div class="' + g + ' rounded" style="width:100%;min-height:200px;aspect-ratio:3/4;"></div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;">' +
          '<div class="' + g + ' rounded" style="width:100%;aspect-ratio:16/9;opacity:0.85;"></div>' +
          '<div class="collage-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
            '<div class="' + g + ' rounded" style="aspect-ratio:1/1;opacity:0.7;"></div>' +
            '<div class="' + g + ' rounded" style="aspect-ratio:1/1;opacity:0.55;"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    },
    /* Layout E: Full bleed + narrow strip + wide */
    function(g) {
      return '<div class="collage-stack" style="display:flex;flex-direction:column;gap:12px;">' +
        '<div class="' + g + ' rounded" style="width:100%;aspect-ratio:21/9;"></div>' +
        '<div class="collage-grid" style="display:grid;grid-template-columns:2fr 1fr;gap:12px;">' +
          '<div class="' + g + ' rounded" style="aspect-ratio:2/1;opacity:0.8;"></div>' +
          '<div class="' + g + ' rounded" style="aspect-ratio:1/1;opacity:0.65;"></div>' +
        '</div>' +
        '<div class="' + g + ' rounded" style="width:80%;aspect-ratio:3/1;opacity:0.5;margin:0 auto;"></div>' +
      '</div>';
    },
  ];

  /* Map slugs to layout indices so each project gets a unique layout */
  var layoutMap = {
    'liquid-iv': 0,
    'leisure-project': 1,
    'alecs-ice-cream': 2,
    'v8': 3,
    'elenita-mezcal': 4,
    'over-easy': 1,
    'mimio': 3,
    'coming-soon': 0,
  };

  function navigate() {
    var hash = window.location.hash || '#/';
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
      target.offsetHeight;
      target.style.opacity = '1';
      target.classList.add('active');
    }

    if (titles[hash]) {
      document.title = titles[hash];
    } else if (projectSlug) {
      document.title = projectSlug.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); }) + ' — Sean Morse';
    }

    if (pageId === 'page-project' && projectSlug) {
      populateProject(projectSlug);
    }

    window.scrollTo(0, 0);

    if (typeof window.reObserveAnimations === 'function') {
      window.reObserveAnimations();
    }
  }

  function populateProject(slug) {
    var row = document.querySelector('.archive-row[data-slug="' + slug + '"]');
    if (!row) return;

    var gradientClass = row.getAttribute('data-gradient') || '';
    var name = row.querySelector('.archive-name');
    var title = name ? name.textContent.trim() : '';

    /* Hero gradient */
    var gradientEl = document.getElementById('project-detail-gradient');
    if (gradientEl) {
      gradientEl.className = 'w-full';
      gradientEl.style.height = '50vh';
      gradientEl.style.minHeight = '320px';
      gradientEl.style.maxHeight = '560px';
      gradientEl.classList.add(gradientClass);
    }

    /* Text fields */
    setText('project-detail-tagline', row.getAttribute('data-tagline') || title);
    setText('project-detail-description', row.getAttribute('data-description') || '');
    setText('project-detail-client', row.getAttribute('data-client') || '');
    setText('project-detail-agency', row.getAttribute('data-agency') || '');
    setText('project-detail-services', row.getAttribute('data-services') || '');
    setText('project-detail-credit', row.getAttribute('data-credit') || '');
    setText('project-detail-problem', row.getAttribute('data-problem') || '');
    setText('project-detail-solution', row.getAttribute('data-solution') || '');
    setText('project-detail-results', row.getAttribute('data-results') || '');

    /* Build collage with project-specific layout */
    var collage = document.getElementById('project-collage');
    if (collage) {
      var layoutIndex = layoutMap[slug] !== undefined ? layoutMap[slug] : 0;
      collage.innerHTML = collageLayouts[layoutIndex](gradientClass);
    }

    /* Reset accordions */
    document.querySelectorAll('.accordion-item').forEach(function(item) {
      var content = item.querySelector('.accordion-content');
      var icon = item.querySelector('.accordion-icon');
      if (content) { content.style.maxHeight = '0'; content.style.opacity = '0'; }
      if (icon) icon.textContent = '+';
    });

    document.title = title + ' — Sean Morse';
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  /* Accordion */
  function wireAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item = btn.closest('.accordion-item');
        var content = item.querySelector('.accordion-content');
        var icon = item.querySelector('.accordion-icon');
        var isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '0';

        if (isOpen) {
          content.style.maxHeight = '0';
          content.style.opacity = '0';
          icon.textContent = '+';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
          icon.textContent = '×';
        }
      });
    });
  }

  window.addEventListener('hashchange', navigate);

  document.addEventListener('DOMContentLoaded', function() {
    navigate();
    wireAccordions();

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
      row.addEventListener('click', function() {
        var slug = row.getAttribute('data-slug');
        if (slug) window.location.hash = '#/project/' + slug;
      });
    });

    /* Archive row hover */
    document.querySelectorAll('.archive-row').forEach(function(row) {
      row.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(15,15,15,0.025)';
        var n = this.querySelector('.archive-name');
        if (n) n.style.color = 'var(--color-accent)';
      });
      row.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        var n = this.querySelector('.archive-name');
        if (n) n.style.color = 'var(--color-text)';
      });
    });
  });
})();
