/**
 * portfolio.js
 * Fetches projects.json and dynamically renders portfolio cards
 * in the #projects-grid container.
 */

(function () {
  'use strict';

  // ─── Config ─────────────────────────────────────────────────────────────────
  const PROJECTS_JSON = 'projects.json';

  // Status badge color mapping
  const STATUS_STYLES = {
    'COMPLETED': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'LIVE DEMO': 'bg-blue-50 text-blue-600 border-blue-200',
    'IN DEVELOPMENT': 'bg-amber-50 text-amber-600 border-amber-200',
  };
  const STATUS_DEFAULT = 'bg-slate-100 text-slate-500 border-slate-200';

  // Category filter label → value mapping (extend as needed)
  const ALL_LABEL = 'Semua';

  // ─── DOM references ──────────────────────────────────────────────────────────
  const grid = document.getElementById('projects-grid');
  const filterBar = document.getElementById('portfolio-filter-bar');
  const countEl = document.getElementById('projects-count');
  const skeletonEl = document.getElementById('projects-skeleton');

  // ─── State ───────────────────────────────────────────────────────────────────
  let allProjects = [];
  let activeFilter = ALL_LABEL;

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  /** Build a tech icon span using Devicons class names */
  function techIcon(slug) {
    const map = {
      javascript: 'devicon-javascript-plain colored',
      typescript: 'devicon-typescript-plain colored',
      tailwindcss: 'devicon-tailwindcss-plain colored',
      react: 'devicon-react-original colored',
      'react-native': 'devicon-react-original colored',
      vuejs: 'devicon-vuejs-plain colored',
      laravel: 'devicon-laravel-plain colored',
      firebase: 'devicon-firebase-plain colored',
      flutter: 'devicon-flutter-plain colored',
      dart: 'devicon-dart-plain colored',
      python: 'devicon-python-plain colored',
      nodejs: 'devicon-nodejs-plain colored',
      mysql: 'devicon-mysql-plain colored',
      postgresql: 'devicon-postgresql-plain colored',
      docker: 'devicon-docker-plain colored',
    };
    const cls = map[slug.toLowerCase()] || 'devicon-github-original';
    return `<i class="${cls} proto-tech-icon" title="${slug}"></i>`;
  }

  function isImageRef(value) {
    if (typeof value !== 'string') return false;
    const v = value.trim();
    if (!v) return false;
    return /^data:image\//i.test(v)
      || /^(https?:)?\/\//i.test(v)
      || /\.(png|jpe?g|webp|svg|gif)$/i.test(v)
      || v.startsWith('/') || v.startsWith('./');
  }

  /** Build one card HTML string */
  function buildCard(project) {
    const statusCls = STATUS_STYLES[project.status] || STATUS_DEFAULT;
    const techHtml = (project.tech || []).slice(0, 5).map(techIcon).join('');
    const displayName = project.name || project.slug || 'Prototype';
    const fallbackIcon = '';
    const rawIcon = project.icon || fallbackIcon;
    const iconHtml = isImageRef(rawIcon)
      ? `<img src="${rawIcon}" alt="" class="proto-icon-img" loading="lazy"
           onerror="this.remove(); this.parentElement.textContent='${fallbackIcon}';">`
      : rawIcon;

    const demoBtn = project.demo_url
      ? `<a href="${project.demo_url}" target="_blank" rel="noopener"
           class="proto-card-action" aria-label="Lihat demo ${displayName}">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
             <line x1="5" y1="12" x2="19" y2="12"/>
             <polyline points="12 5 19 12 12 19"/>
           </svg>
         </a>`
      : `<span class="proto-card-action proto-card-action--disabled" aria-hidden="true">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
             <line x1="5" y1="12" x2="19" y2="12"/>
             <polyline points="12 5 19 12 12 19"/>
           </svg>
         </span>`;

    return `
    <article class="proto-card group" data-category="${project.category}">
      <!-- Thumbnail -->
      <div class="proto-card-thumb">
        <img
          src="${project.image}"
          alt="Preview ${displayName}"
          class="proto-card-img"
          loading="lazy"
          onerror="this.onerror=null; this.parentElement.classList.add('proto-thumb-fallback'); this.style.display='none'; this.parentElement.querySelector('.proto-thumb-emoji').style.display='flex';"
        />
        <div class="proto-thumb-emoji" style="display:none">${project.icon || '🚀'}</div>
      </div>

      <!-- Body -->
      <div class="proto-card-body">
        <!-- Icon box + Status badge -->
        <div class="proto-card-header">
          <div class="proto-icon-box">${iconHtml}</div>
          <span class="proto-badge ${statusCls}">${project.status}</span>
        </div>

        <!-- Title -->
        <h3 class="proto-card-title">${displayName}</h3>

        <!-- Footer: tech + action -->
        <div class="proto-card-footer">
          <div class="proto-tech-stack">${techHtml}</div>
          ${demoBtn}
        </div>
      </div>
    </article>`;
  }

  /** Render skeleton loading cards */
  function renderSkeleton(count = 4) {
    if (!skeletonEl) return;
    skeletonEl.innerHTML = Array.from({ length: count }, () => `
      <div class="proto-skeleton">
        <div class="proto-skel-thumb"></div>
        <div class="proto-skel-body">
          <div class="proto-skel-line w-1/2"></div>
          <div class="proto-skel-line w-3/4 mt-2"></div>
          <div class="proto-skel-line mt-4"></div>
          <div class="proto-skel-line w-5/6 mt-2"></div>
        </div>
      </div>`).join('');
    skeletonEl.style.display = 'grid';
    if (grid) grid.style.display = 'none';
  }

  /** Hide skeleton, show grid */
  function hideSkeleton() {
    if (skeletonEl) skeletonEl.style.display = 'none';
    if (grid) grid.style.display = 'grid';
  }

  /** Build filter buttons from unique categories */
  function buildFilters(projects) {
    if (!filterBar) return;
    const categories = [ALL_LABEL, ...new Set(projects.map(p => p.category))];

    filterBar.innerHTML = categories.map(cat => {
      const isActive = cat === ALL_LABEL;
      return `<button
        class="proto-filter-btn${isActive ? ' proto-filter-btn--active' : ''}"
        data-filter="${cat}"
        aria-pressed="${isActive}"
      >${cat}</button>`;
    }).join('');

    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.proto-filter-btn');
      if (!btn) return;
      const filter = btn.dataset.filter;

      // Update active state
      filterBar.querySelectorAll('.proto-filter-btn').forEach(b => {
        b.classList.toggle('proto-filter-btn--active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });

      activeFilter = filter;
      renderCards();
    });
  }

  /** Render (or re-render) filtered cards into #projects-grid */
  function renderCards() {
    if (!grid) return;
    const filtered = activeFilter === ALL_LABEL
      ? allProjects
      : allProjects.filter(p => p.category === activeFilter);

    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="proto-empty col-span-full">
          <div class="proto-empty-icon">🔍</div>
          <p>Tidak ada prototype di kategori ini.</p>
        </div>`;
      return;
    }

    grid.innerHTML = filtered.map(buildCard).join('');
  }

  /** Show error state */
  function renderError() {
    hideSkeleton();
    if (grid) {
      grid.innerHTML = `
        <div class="proto-empty col-span-full">
          <div class="proto-empty-icon">⚠️</div>
          <p>Gagal memuat data portfolio. Coba refresh halaman.</p>
        </div>`;
      grid.style.display = 'grid';
    }
  }

  // ─── Main: load & render ─────────────────────────────────────────────────────
  renderSkeleton(4);

  function initWithData(data) {
    allProjects = Array.isArray(data) ? data : [];
    buildFilters(allProjects);
    hideSkeleton();
    renderCards();
  }

  const isFileProtocol = window.location.protocol === 'file:';

  // 1. Use static fallback only for file:// local preview
  if (isFileProtocol && window.PROJECTS_DATA) {
    initWithData(window.PROJECTS_DATA);
  } else {
    // 2. Fetch from projects.json (GitHub Pages / any HTTP server)
    fetch(PROJECTS_JSON)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => initWithData(data))
      .catch(err => {
        console.error('[portfolio.js] Failed to load projects.json:', err);
        // If fetch fails on file://, try fallback data if present
        if (isFileProtocol && window.PROJECTS_DATA) {
          initWithData(window.PROJECTS_DATA);
          return;
        }
        renderError();
      });
  }

})();
