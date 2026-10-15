// Marks the nav link for the section currently in view.
const links = new Map();
for (const a of document.querySelectorAll('.site-nav a[href^="#"]')) {
  links.set(a.getAttribute('href').slice(1), a);
}

const seen = new Set();
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) seen.add(entry.target.id);
    else seen.delete(entry.target.id);
  }
  for (const [id, a] of links) a.removeAttribute('aria-current');
  for (const [id, a] of links) {
    if (seen.has(id)) { a.setAttribute('aria-current', 'true'); break; }
  }
}, { rootMargin: '-20% 0px -70% 0px' });

for (const id of links.keys()) {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
}
