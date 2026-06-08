/* ═══════════════════════════════════════════
   ANGELIN K MATHEW — Portfolio JS
   ═══════════════════════════════════════════ */

(() => {

  /* ── 1. Custom Cursor ── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0;   // mouse
  let fx = 0, fy = 0;   // follower

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = `${mx}px`;
    cursor.style.top  = `${my}px`;
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = `${fx}px`;
    follower.style.top  = `${fy}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();


  /* ── 2. Nav: scroll class + mobile toggle ── */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const bars = navToggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    bars[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)'  : '';
    bars[1].style.opacity   = isOpen ? '0' : '1';
    bars[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '1';
      });
    });
  });


  /* ── 3. Scroll Reveal ── */
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 4. Skill Bar Animation ── */
  const skillFills = document.querySelectorAll('.skill-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(bar => barObserver.observe(bar));


  /* ── 5. Hero text stagger on load ── */
  const heroRevealEls = document.querySelectorAll('.hero-content .reveal-up');
  heroRevealEls.forEach((el, i) => {
    el.style.transitionDelay = `${0.15 + i * 0.15}s`;
    // Trigger after a tick so CSS transition fires
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.classList.add('visible');
    }));
  });


  /* ── 6. Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${current}`) {
        a.style.color = 'var(--coral)';
      }
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();


  /* ── 7. Project card tilt micro-interaction ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `
        translateY(-8px) scale(1.02)
        rotateX(${-dy * 6}deg)
        rotateY(${dx * 6}deg)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ── 8. Contact Form ── */
  const form        = document.getElementById('contactForm');
  const sendBtn     = document.getElementById('sendBtn');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    if (!valid) {
      // shake effect
      form.style.animation = 'none';
      requestAnimationFrame(() => {
        form.style.animation = 'shake 0.4s ease';
      });
      return;
    }

    // Simulate send (no backend)
    sendBtn.querySelector('span').textContent = 'Sending…';
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.7';

    setTimeout(() => {
      form.reset();
      sendBtn.querySelector('span').textContent = 'Send Message';
      sendBtn.disabled = false;
      sendBtn.style.opacity = '';
      formSuccess.classList.add('visible');
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    }, 1400);
  });

  // Remove error class on input
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });


  /* ── 9. Floating blobs on mouse move (parallax) ── */
  const blobs = document.querySelectorAll('.hero-blob');
  document.addEventListener('mousemove', e => {
    const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    blobs.forEach((blob, i) => {
      const depth = (i + 1) * 12;
      blob.style.transform = `translate(${nx * depth}px, ${ny * depth}px)`;
    });
  }, { passive: true });

  /* ── 10. Smooth anchor scroll with offset for fixed nav ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();

/* ── Keyframe for shake ── */
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%,100%{ transform: translateX(0); }
  20%    { transform: translateX(-8px); }
  40%    { transform: translateX(8px); }
  60%    { transform: translateX(-5px); }
  80%    { transform: translateX(5px); }
}
`;
document.head.appendChild(style);