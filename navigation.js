(() => {
  const menu = document.querySelector('.nav-more');
  if (!menu) return;

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.open = false;
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
        section.addEventListener('blur', () => section.removeAttribute('tabindex'), { once: true });
      }
    });
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
})();
