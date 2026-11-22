(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const input = document.getElementById('paper-search');
  if (!input) return;
  const papers = [...document.querySelectorAll('.paper')];
  const groups = [...document.querySelectorAll('.pub-group')];
  const noResults = document.getElementById('no-results');
  const status = document.getElementById('search-status');
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’‘]/g, "'").toLowerCase();
  const searchable = papers.map(paper => normalize(paper.textContent));
  function filter() {
    const q = normalize(input.value.trim());
    let visible = 0;
    papers.forEach((paper, index) => {
      paper.hidden = !searchable[index].includes(q);
      if (!paper.hidden) visible++;
    });
    groups.forEach(group => {
      const count = [...group.querySelectorAll('.paper')].filter(paper => !paper.hidden).length;
      group.hidden = count === 0;
      const label = group.querySelector('.group-header span');
      if (label) label.textContent = `${count} ${count === 1 ? 'entry' : 'entries'}`;
    });
    if (noResults) noResults.hidden = visible !== 0;
    if (status) status.textContent = `${visible} ${visible === 1 ? 'publication' : 'publications'} shown`;
  }
  input.closest('.archive-tools').hidden = false;
  input.addEventListener('input', filter);
  filter();
})();
