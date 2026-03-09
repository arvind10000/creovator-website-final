/* ============================================
   CREOVATOR — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Lenis Smooth Scroll ── */
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.08, duration: 1.2, smoothTouch: false });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    // Integrate with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ── Navbar Scroll State ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Navbar Active Tab Indicator ── */
  const navLinks = document.querySelectorAll('.nav-link');
  const indicator = document.querySelector('.nav-indicator');
  const navLinksContainer = document.querySelector('.nav-links');

  function moveIndicator(el) {
    if (!indicator || !navLinksContainer) return;
    const containerRect = navLinksContainer.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    indicator.style.width = elRect.width + 'px';
    indicator.style.left = (elRect.left - containerRect.left) + 'px';
    indicator.style.top = (elRect.top - containerRect.top) + 'px';
    indicator.style.height = elRect.height + 'px';
  }

  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
      setTimeout(() => moveIndicator(link), 50);
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => moveIndicator(link));
    link.addEventListener('mouseleave', () => {
      const active = document.querySelector('.nav-link.active');
      if (active) moveIndicator(active);
    });
  });

  /* ── Mobile Menu ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ── Counter Animation ── */
  function animateCounter(el, target, duration = 2000, suffix = '') {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = (Number.isInteger(target) ? Math.floor(start) : start.toFixed(1)) + suffix;
    }, 16);
  }

  /* ── Intersection Observer for Reveal + Counters ── */
  const revealEls = document.querySelectorAll('.reveal');
  const counterEls = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('revealed');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
    observer.observe(el);
  });

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, val, 2000, suffix);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObs.observe(el));

  /* ── Work Filter (work.html) ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card[data-category]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      workCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = match ? '1' : '0.3';
        card.style.transform = match ? '' : 'scale(0.97)';
        card.style.pointerEvents = match ? '' : 'none';
      });
    });
  });

  /* ── Contact Form ── */
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const original = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#10B981';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ── Custom Cursor (desktop only) ── */
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position:fixed; width:10px; height:10px; background:var(--blue);
      border-radius:50%; pointer-events:none; z-index:99999;
      transform:translate(-50%,-50%); transition:width 0.2s,height 0.2s,background 0.2s;
      mix-blend-mode:multiply; top:0; left:0;
    `;
    const cursorRing = document.createElement('div');
    cursorRing.style.cssText = `
      position:fixed; width:36px; height:36px; border:1.5px solid var(--blue);
      border-radius:50%; pointer-events:none; z-index:99998;
      transform:translate(-50%,-50%); transition:all 0.12s ease; opacity:0.5; top:0; left:0;
    `;
    document.body.appendChild(cursor);
    document.body.appendChild(cursorRing);

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
    function animRing() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, .btn, .work-card, .service-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorRing.style.width = '52px';
        cursorRing.style.height = '52px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
      });
    });
  }
});
