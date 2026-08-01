// ===== Preloader =====
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('hide'), 400);
});

// ===== Typing effect =====
const roles = ["Full Stack Developer", "Software Developer", "Second Year Engineering Student"];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];
  if(!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if(charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

// ===== Mobile nav =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function setActiveLink(){
  let current = sections[0].id;
  const offset = 120;
  sections.forEach(sec => {
    if(window.scrollY >= sec.offsetTop - offset) current = sec.id;
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ===== Scroll to top button =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  setActiveLink();
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// ===== Reveal on scroll + progress bars/rings =====
const revealEls = document.querySelectorAll('.reveal');
const barSkills = document.querySelectorAll('.bar-skill');
const ringSkills = document.querySelectorAll('.ring-skill');
const CIRC = 2 * Math.PI * 52;

ringSkills.forEach(r => {
  const fg = r.querySelector('.ring-fg');
  fg.style.strokeDasharray = CIRC;
  fg.style.strokeDashoffset = CIRC;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');

      if(entry.target.classList.contains('bar-skill')){
        const pct = entry.target.dataset.percent;
        entry.target.querySelector('.bar-fill').style.width = pct + '%';
      }
      if(entry.target.classList.contains('ring-skill')){
        const pct = entry.target.dataset.percent;
        const fg = entry.target.querySelector('.ring-fg');
        const offset = CIRC - (pct / 100) * CIRC;
        fg.style.strokeDashoffset = offset;
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

revealEls.forEach(el => observer.observe(el));
barSkills.forEach(el => { el.classList.add('reveal'); observer.observe(el); });
ringSkills.forEach(el => { el.classList.add('reveal'); observer.observe(el); });

// ===== Contact form (front-end only) =====
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = "Thanks! Your message has been noted.";
  form.reset();
  setTimeout(() => note.textContent = "", 4000);
});
