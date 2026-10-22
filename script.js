const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}
updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  });
});

// Entrada progresiva de tarjetas y secciones, respetando la preferencia de movimiento reducido.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });

  document.querySelectorAll('.feature-card, .step, .safety-note, .about-copy, .platform-copy').forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
    revealObserver.observe(el);
  });
}
