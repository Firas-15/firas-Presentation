const slides = [...document.querySelectorAll('.slide')];
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');
const progress = document.getElementById('progressBar');
const current = document.getElementById('currentNum');
const overview = document.getElementById('overview');
const thumbs = document.getElementById('thumbs');
let index = 0;

function showSlide(nextIndex) {
  index = Math.max(0, Math.min(slides.length - 1, nextIndex));
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  current.textContent = String(index + 1).padStart(2, '0');
  progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  prev.disabled = index === 0;
  next.disabled = index === slides.length - 1;
}
prev.addEventListener('click', () => showSlide(index - 1));
next.addEventListener('click', () => showSlide(index + 1));
document.addEventListener('keydown', e => {
  if (overview.classList.contains('open')) {
    if (e.key === 'Escape') closeOverview();
    return;
  }
  if (['ArrowLeft', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); showSlide(index + 1); }
  if (['ArrowRight', 'PageUp'].includes(e.key)) { e.preventDefault(); showSlide(index - 1); }
});
function closeOverview() { overview.classList.remove('open'); overview.setAttribute('aria-hidden', 'true'); }
slides.forEach((slide, i) => {
  const button = document.createElement('button');
  button.className = 'thumb';
  button.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b><small>${slide.dataset.title}</small>`;
  button.addEventListener('click', () => { showSlide(i); closeOverview(); });
  thumbs.appendChild(button);
});
document.getElementById('overviewBtn').addEventListener('click', () => { overview.classList.add('open'); overview.setAttribute('aria-hidden', 'false'); });
document.getElementById('closeOverview').addEventListener('click', closeOverview);
overview.addEventListener('click', e => { if (e.target === overview) closeOverview(); });
showSlide(0);
