(() => {
  const dialog = document.querySelector('.figure-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const title = dialog.querySelector('#figure-title');
  const image = dialog.querySelector('.figure-dialog-image');
  const caption = dialog.querySelector('.figure-caption');
  const paper = dialog.querySelector('.figure-paper');
  let opener;

  document.querySelectorAll('.pub-thumb[data-figure-title]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      title.textContent = link.dataset.figureTitle;
      caption.textContent = link.dataset.figureCaption;
      image.alt = `${link.dataset.figureTitle}: ${link.dataset.figureCaption}`;
      image.src = link.href;
      paper.href = link.closest('.pub').querySelector('.pub-title a').href;
      dialog.showModal();
      document.body.classList.add('figure-open');
    });
  });

  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('figure-open');
    opener?.focus({ preventScroll: true });
  });
})();
