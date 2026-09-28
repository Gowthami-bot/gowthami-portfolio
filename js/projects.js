// projects.js — filter the project grid by category.

document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.getElementById('project-filters');
  const grid = document.getElementById('project-grid');
  if (!filterBar || !grid) return;

  const buttons = Array.from(filterBar.querySelectorAll('.filter-btn'));
  const cards = Array.from(grid.querySelectorAll('.project-card'));

  function applyFilter(category) {
    cards.forEach((card) => {
      const matches = category === 'all' || card.dataset.category === category;
      card.hidden = !matches;
    });

    buttons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.filter === category);
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === category));
    });
  }

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    applyFilter(btn.dataset.filter);
  });
});