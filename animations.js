/* ============================================
   CREOVATOR — animations.js
   GSAP + ScrollTrigger animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero Entrance ── */
  const heroTl = gsap.timeline({ delay: 0.2 });
  const heroBadge   = document.querySelector('.hero-badge');
  const heroTitle   = document.querySelector('.hero-title');
  const heroSub     = document.querySelector('.hero-sub');
  const heroButtons = document.querySelector('.hero-buttons');
  const heroStats   = document.querySelector('.hero-stats');
  const heroLamp    = document.querySelector('.hero-lamp');
  const heroScroll  = document.querySelector('.hero-scroll');

  if (heroLamp) {
    gsap.from(heroLamp, { opacity: 0, y: -60, duration: 1.4, ease: 'power3.out' });
  }
  if (heroBadge) {
    heroTl.from(heroBadge, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });
  }
  if (heroTitle) {
    const words = heroTitle.querySelectorAll('.word');
    if (words.length) {
      heroTl.from(words, { opacity: 0, y: 60, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, '-=0.3');
    } else {
      heroTl.from(heroTitle, { opacity: 0, y: 50, duration: 0.9, ease: 'power3.out' }, '-=0.3');
    }
  }
  if (heroSub) {
    heroTl.from(heroSub, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.5');
  }
  if (heroButtons) {
    heroTl.from(heroButtons.children, { opacity: 0, y: 20, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, '-=0.4');
  }
  if (heroStats) {
    heroTl.from(heroStats, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.3');
  }
  if (heroScroll) {
    heroTl.from(heroScroll, { opacity: 0, duration: 0.5 }, '-=0.2');
  }

  /* ── Page Hero (inner pages) ── */
  const pageHeroLabel = document.querySelector('.page-hero-label');
  const pageHeroTitle = document.querySelector('.page-hero-title');
  const pageHeroSub   = document.querySelector('.page-hero-sub');
  const pageTl = gsap.timeline({ delay: 0.3 });
  if (pageHeroLabel) pageTl.from(pageHeroLabel, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' });
  if (pageHeroTitle) pageTl.from(pageHeroTitle, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.3');
  if (pageHeroSub)   pageTl.from(pageHeroSub,   { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.4');

  /* ── Navbar ── */
  gsap.from('.navbar', {
    opacity: 0,
    y: -30,
    duration: 0.8,
    delay: 0.1,
    ease: 'power3.out'
  });

  /* ── Service Cards ── */
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 50,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  /* ── Work Cards ── */
  gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 40,
      duration: 0.65,
      delay: i * 0.08,
      ease: 'power3.out'
    });
  });

  /* ── Testimonial Cards ── */
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.65,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  /* ── Team Cards ── */
  gsap.utils.toArray('.team-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  /* ── Career Cards ── */
  gsap.utils.toArray('.career-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
      opacity: 0,
      x: -30,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power3.out'
    });
  });

  /* ── Section Labels + Titles ── */
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power3.out'
    });
  });

  /* ── About Visual Float ── */
  const aboutVisualMain = document.querySelector('.about-visual-main');
  if (aboutVisualMain) {
    gsap.from(aboutVisualMain, {
      scrollTrigger: { trigger: aboutVisualMain, start: 'top 80%' },
      opacity: 0,
      scale: 0.92,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    });
  }

  /* ── Float Cards ── */
  gsap.utils.toArray('.about-float-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%' },
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: 0.3 + i * 0.15,
      ease: 'power3.out'
    });
  });

  /* ── CTA Section ── */
  const ctaTitle = document.querySelector('.cta-title');
  const ctaSub   = document.querySelector('.cta-sub');
  const ctaBtns  = document.querySelector('.cta-buttons');
  if (ctaTitle) {
    const ctaTl = gsap.timeline({
      scrollTrigger: { trigger: ctaTitle, start: 'top 80%' }
    });
    ctaTl.from(ctaTitle, { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' });
    if (ctaSub)  ctaTl.from(ctaSub,  { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    if (ctaBtns) ctaTl.from(ctaBtns.children, { opacity: 0, y: 20, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, '-=0.3');
  }

  /* ── Contact Form ── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    gsap.from(contactForm, {
      scrollTrigger: { trigger: contactForm, start: 'top 80%' },
      opacity: 0,
      x: 40,
      duration: 0.9,
      ease: 'power3.out'
    });
  }
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) {
    gsap.from(contactInfo, {
      scrollTrigger: { trigger: contactInfo, start: 'top 80%' },
      opacity: 0,
      x: -40,
      duration: 0.9,
      ease: 'power3.out'
    });
  }

  /* ── Parallax Hero Lamp on scroll ── */
  const heroLampEl = document.querySelector('.hero-lamp');
  if (heroLampEl) {
    gsap.to(heroLampEl, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: -80,
      ease: 'none'
    });
  }

  /* ── Marquee / ticker ── */
  const marquee = document.querySelector('.marquee-inner');
  if (marquee) {
    gsap.to(marquee, {
      x: '-50%',
      duration: 20,
      ease: 'none',
      repeat: -1
    });
  }

  /* ── Stagger reveals for about values ── */
  gsap.utils.toArray('.about-value').forEach((val, i) => {
    gsap.from(val, {
      scrollTrigger: { trigger: val, start: 'top 90%' },
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: i * 0.08,
      ease: 'power3.out'
    });
  });
});
