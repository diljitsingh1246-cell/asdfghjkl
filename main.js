// ═══════════════════════════════════════════════════════════
//  PIXEL COACH — js/main.js
//  Main entry: event listeners, scroll animations, filters
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  /* ── Auth Button Listeners ── */
  document.getElementById('loginBtn').addEventListener('click', () => {
    switchTab('login');
    openModal('authModal');
  });
  document.getElementById('signupBtn').addEventListener('click', () => {
    switchTab('signup');
    openModal('authModal');
  });
  document.getElementById('heroStartBtn').addEventListener('click', () => {
    if (window.currentUser) {
      openModal('dashboardModal');
    } else {
      switchTab('signup');
      openModal('authModal');
    }
  });
  document.getElementById('dashboardNavBtn').addEventListener('click', () => {
    if (window.userProgressData) renderDashboard(window.userProgressData);
    openModal('dashboardModal');
  });

  /* ── Filter Buttons ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCourses(btn.dataset.filter);
    });
  });

  /* ── Smooth Scroll for Nav Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        navLinks.classList.remove('open');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Intersection Observer: Section reveal ── */
  const revealEls = document.querySelectorAll(
    '.course-card, .mentor-card, .tool-card, .section-header'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });

  /* ── Parallax on hero orbs ── */
  document.addEventListener('mousemove', (e) => {
    const mx = (e.clientX / window.innerWidth  - 0.5) * 30;
    const my = (e.clientY / window.innerHeight - 0.5) * 30;
    const orbs = document.querySelectorAll('.hero-orb');
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
    });
  });

  /* ── Demo mode: populate fake progress when not logged in ── */
  function setupDemoData() {
    if (!window.currentUser && !window.userProgressData) {
      window.userProgressData = {
        completedLessons: ['v1','v2','v3','p1','g1','g2'],
        progress: { video: 22, photo: 7, graphic: 14 },
        quizResults: [],
        streak: 3
      };
    }
  }

  // Re-init after a delay to ensure Firebase initialised
  setTimeout(setupDemoData, 1500);

  /* ── Active nav link highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  /* ── Stagger course card reveal on load ── */
  document.querySelectorAll('.course-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.15}s`;
  });

  console.log('%c⬡ PixelCoach Loaded', 'color:#f97316;font-size:1.2rem;font-weight:bold;');
  console.log('%cBuilt with ❤ — Configure Firebase in js/firebase-config.js', 'color:#9b96b8;');
});

// Active nav link style
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--accent-1) !important; background: rgba(249,115,22,0.08); }`;
document.head.appendChild(style);
