// ======================================
//  HARSHA BIYYAPU — script.js
// ======================================

// ── Dark mode toggle (dark by default) ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
const sunSVG  = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;

function setTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  // Sun icon = currently dark (click to go light); Moon icon = currently light (click to go dark)
  themeIcon.innerHTML = isLight ? moonSVG : sunSVG;
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// On first load: default to dark unless user explicitly chose light before
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'light');

themeToggle.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('light'));
});

// ── Mobile menu ──
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll(
  '.exp-item, .edu-item, .project-card, .cert-card, .event-row, ' +
  '.venture-card, .stats-bar, .about-body'
);

revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.06}s`;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => io.observe(el));

// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-center a');

window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--text)' : '';
    a.style.fontWeight = a.getAttribute('href') === `#${cur}` ? '700' : '';
  });
}, { passive: true });
