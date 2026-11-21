(() => {
  'use strict';
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const themeKey = 'academic-portfolio-theme';
  let preferred = 'light';
  try { preferred = localStorage.getItem(themeKey) || 'light'; } catch (_) { /* storage may be unavailable */ }
  root.dataset.theme = preferred === 'dark' ? 'dark' : 'light';
  function updateThemeControl() {
    if (themeToggle) themeToggle.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  updateThemeControl();
  if (themeToggle) themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(themeKey, root.dataset.theme); } catch (_) { /* optional */ }
    updateThemeControl();
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }
    });
  }
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), {threshold:0.08});
    revealTargets.forEach(el => revealObserver.observe(el));
  } else revealTargets.forEach(el => el.classList.add('is-visible'));

  const pubList = document.querySelector('[data-publication-list]');
  const publicationData = window.RESEARCH_PUBLICATIONS || [];
  if (pubList) {
    const count = document.querySelector('[data-results-count]');
    const search = document.querySelector('[data-publication-search]');
    const filterButtons = [...document.querySelectorAll('[data-publication-filter]')];
    let category = new URLSearchParams(window.location.search).get('filter') || 'all';
    if (!['all','journal','proceedings','preprint','under-review'].includes(category)) category='all';
    filterButtons.forEach(b => b.setAttribute('aria-pressed',String(b.dataset.publicationFilter===category))); 
    const labels = {'journal':'Journal article', 'proceedings':'Conference proceedings', 'preprint':'Preprint', 'under-review':'Under review'};
    const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    function render() {
      const term = normalize((search && search.value) || '').trim();
      const records = publicationData.filter(p => (category === 'all' || p.type === category) &&
        (!term || normalize([p.title,p.authors,p.venue,p.year].join(' ')).includes(term)));
      pubList.replaceChildren();
      records.forEach(p => {
        const article = document.createElement('article'); article.className='pub-item';
        const date = document.createElement('div'); date.className='pub-year'; date.textContent=p.year;
        const body = document.createElement('div');
        const kind = document.createElement('span'); kind.className='pill neutral'; kind.textContent=labels[p.type] || p.type;
        const title = document.createElement('h3'); title.textContent=p.title;
        const meta = document.createElement('div'); meta.className='pub-meta'; meta.textContent=p.authors+' · '+p.venue;
        const links = document.createElement('div'); links.className='pub-links';
        (p.links || []).forEach(l => { const a=document.createElement('a'); a.textContent=l.label+' ↗'; a.href=l.url; a.target='_blank'; a.rel='noopener noreferrer'; links.append(a); });
        body.append(kind,title,meta,links); article.append(date,body); pubList.append(article);
      });
      if (count) count.textContent = records.length+' publication'+(records.length===1?'':'s')+' shown';
      if (!records.length) { const empty=document.createElement('p'); empty.className='empty-state'; empty.textContent='No matching publications. Try another keyword or category.'; pubList.append(empty); }
    }
    filterButtons.forEach(button => button.addEventListener('click', () => {
      category = button.dataset.publicationFilter;
      filterButtons.forEach(b => b.setAttribute('aria-pressed',String(b===button)));
      render();
    }));
    if (search) search.addEventListener('input',render);
    render();
  }
})();
