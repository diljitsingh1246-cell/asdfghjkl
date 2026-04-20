// ═══════════════════════════════════════════════════════════
//  PIXEL COACH — js/ui.js
//  UI helpers: modals, toast, theme toggle, course renderer
// ═══════════════════════════════════════════════════════════

/* ── Toast Notification ── */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}
window.showToast = showToast;

/* ── Modal Open / Close ── */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
window.openModal  = openModal;
window.closeModal = closeModal;

// Close modals when clicking backdrop
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      // Stop video when closing video modal
      if (overlay.id === 'videoModal') {
        document.getElementById('videoFrame').src = '';
      }
    }
  });
});

/* ── Theme Toggle ── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('pc-theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('pc-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── Navbar Scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Hamburger Menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* ── Video Modal Player ── */
function playVideo(videoId, title) {
  const frame = document.getElementById('videoFrame');
  frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  openModal('videoModal');
}
window.playVideo = playVideo;

function closeVideoModal() {
  document.getElementById('videoFrame').src = '';
  closeModal('videoModal');
}
window.closeVideoModal = closeVideoModal;

/* ── Course Modal Renderer ── */
function openCourse(courseId) {
  if (!window.COURSES) return;
  const course = window.COURSES[courseId];
  if (!course) return;

  // Get user progress
  const userData = window.userProgressData || {};
  const completedLessons = userData.completedLessons || [];

  let html = `
    <div class="course-detail-header">
      <div class="course-detail-icon ${course.iconClass}">
        <i class="${course.icon}"></i>
      </div>
      <div>
        <h2>${course.title}</h2>
        <p>${course.description}</p>
      </div>
    </div>
  `;

  // Count total and completed for this course
  const allModules = Object.values(course.levels).flatMap(l => l.modules);
  const doneCount  = allModules.filter(m => completedLessons.includes(m.id)).length;
  const pct        = allModules.length ? Math.round((doneCount / allModules.length) * 100) : 0;

  html += `
    <div style="margin-bottom:1.5rem;">
      <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:var(--text-2);margin-bottom:0.4rem;">
        <span>Your Progress</span><span style="color:var(--accent-1);font-weight:600;">${pct}%</span>
      </div>
      <div class="module-progress"><div style="width:${pct}%"></div></div>
    </div>
  `;

  // Render each level
  Object.entries(course.levels).forEach(([levelKey, level]) => {
    html += `
      <div class="module-section">
        <div class="module-level-title">${level.label}</div>
        <div class="module-list">
    `;
    level.modules.forEach((mod, idx) => {
      const done = completedLessons.includes(mod.id);
      html += `
        <div class="module-item ${done ? 'completed' : ''}" onclick="watchLesson('${mod.id}','${mod.videoId}','${mod.title}','${courseId}')">
          <div class="module-num">${done ? '<i class="fas fa-check"></i>' : idx + 1}</div>
          <div class="module-info">
            <h5>${mod.title}</h5>
            <p>${mod.duration}</p>
          </div>
          <div class="module-play">
            ${done ? '<i class="fas fa-check-circle" style="color:#22c55e"></i>' : '<i class="fas fa-play-circle"></i>'}
          </div>
        </div>
      `;
    });
    html += `</div></div>`;
  });

  html += `
    <div class="course-actions">
      <button class="btn btn-primary" onclick="closeModal('courseModal');playVideo('${allModules[doneCount]?.videoId || allModules[0].videoId}','${allModules[doneCount]?.title || allModules[0].title}')">
        <i class="fas fa-play"></i> ${doneCount > 0 ? 'Continue Learning' : 'Start Course'}
      </button>
      <button class="btn btn-outline" onclick="closeModal('courseModal');startQuiz('${courseId}')">
        <i class="fas fa-brain"></i> Take Quiz
      </button>
    </div>
  `;

  document.getElementById('courseModalBody').innerHTML = html;
  openModal('courseModal');
}
window.openCourse = openCourse;

/* ── Watch Lesson ── */
function watchLesson(moduleId, videoId, title, courseId) {
  closeModal('courseModal');
  playVideo(videoId, title);

  // Mark lesson as completed after 5s (simulate)
  setTimeout(() => {
    markLessonComplete(moduleId, courseId);
  }, 5000);
}
window.watchLesson = watchLesson;

function markLessonComplete(moduleId, courseId) {
  if (!window.currentUser) return;

  const userData = window.userProgressData || {};
  const lessons  = userData.completedLessons || [];
  if (lessons.includes(moduleId)) return;

  lessons.push(moduleId);
  if (!window.userProgressData) window.userProgressData = {};
  window.userProgressData.completedLessons = lessons;

  // Calculate progress %
  const course     = window.COURSES[courseId];
  const allModules = Object.values(course.levels).flatMap(l => l.modules);
  const doneCount  = allModules.filter(m => lessons.includes(m.id)).length;
  const pct        = Math.round((doneCount / allModules.length) * 100);

  if (!window.userProgressData.progress) window.userProgressData.progress = {};
  window.userProgressData.progress[courseId] = pct;

  // Save to Firestore
  if (window.firebaseDb && window.currentUser) {
    const ref = window.fbDoc(window.firebaseDb, "users", window.currentUser.uid);
    window.fbUpdateDoc(ref, {
      completedLessons: window.fbArrayUnion(moduleId),
      [`progress.${courseId}`]: pct
    }).catch(console.warn);
  }

  showToast(`✅ Lesson completed! ${pct}% of ${course.title} done.`);
}
window.markLessonComplete = markLessonComplete;

/* ── Auth Modal Helpers ── */
function switchTab(tab) {
  const loginForm  = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginTab   = document.getElementById('loginTab');
  const signupTab  = document.getElementById('signupTab');
  if (tab === 'login') {
    loginForm.style.display  = '';
    signupForm.style.display = 'none';
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  } else {
    loginForm.style.display  = 'none';
    signupForm.style.display = '';
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
  }
}
window.switchTab = switchTab;

/* ── Show / Update User Nav ── */
function onUserLoggedIn(user) {
  document.getElementById('authButtons').style.display   = 'none';
  document.getElementById('userMenu').style.display      = 'flex';
  document.getElementById('dashboardNavBtn').style.display = '';

  const initials = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
  document.getElementById('userName').textContent = user.displayName || user.email.split('@')[0];

  const avatar = document.getElementById('userAvatar');
  if (user.photoURL) {
    avatar.src = user.photoURL;
  } else {
    // Fallback SVG avatar
    avatar.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' rx='20' fill='%23f97316'/><text x='20' y='26' text-anchor='middle' font-size='18' font-family='sans-serif' fill='white' font-weight='bold'>${initials}</text></svg>`;
  }

  // Update dashboard avatar
  document.getElementById('dashAvatar').textContent = initials;
  document.getElementById('dashName').textContent   = `Welcome, ${user.displayName || 'Learner'} 👋`;
  document.getElementById('dashEmail').textContent  = user.email;

  closeModal('authModal');
  showToast(`Welcome back, ${user.displayName || 'Learner'}! 🎉`);

  // Load user data
  loadUserData(user.uid);
}
window.onUserLoggedIn = onUserLoggedIn;

function onUserLoggedOut() {
  document.getElementById('authButtons').style.display   = 'flex';
  document.getElementById('userMenu').style.display      = 'none';
  document.getElementById('dashboardNavBtn').style.display = 'none';
  window.userProgressData = null;
  showToast('You have been logged out.');
}
window.onUserLoggedOut = onUserLoggedOut;

/* ── Load User Data from Firestore ── */
async function loadUserData(uid) {
  if (!window.firebaseDb) return;
  try {
    const ref  = window.fbDoc(window.firebaseDb, "users", uid);
    const snap = await window.fbGetDoc(ref);
    if (snap.exists()) {
      window.userProgressData = snap.data();
      renderDashboard(snap.data());
    }
  } catch(e) { console.warn("Could not load user data:", e); }
}
window.loadUserData = loadUserData;

/* ── Render Dashboard ── */
function renderDashboard(data) {
  if (!data) return;

  // Stats
  const lessons  = (data.completedLessons || []).length;
  const results  = data.quizResults || [];
  const avgScore = results.length
    ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)
    : 0;

  document.getElementById('dashLessons').textContent   = lessons;
  document.getElementById('dashQuizScore').textContent = avgScore + '%';
  document.getElementById('dashStreak').textContent    = data.streak || 1;

  // Progress bars
  const progress = data.progress || {};
  const progList = document.getElementById('dashProgressList');
  const courseMap = { video: '🎬 Video Editing', photo: '📸 Photo Editing', graphic: '🎨 Graphic Designing' };
  progList.innerHTML = Object.entries(courseMap).map(([key, label]) => {
    const pct = progress[key] || 0;
    return `
      <div class="dash-progress-item">
        <div class="dash-progress-header">
          <div class="dash-progress-name"><i class="fas fa-circle" style="color:var(--accent-1);font-size:0.5rem;"></i> ${label}</div>
          <div class="dash-progress-pct">${pct}%</div>
        </div>
        <div class="dash-progress-bar-wrap">
          <div class="dash-progress-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');

  // Quiz results
  const quizList = document.getElementById('dashQuizList');
  if (results.length === 0) {
    quizList.innerHTML = '<p class="dash-empty">No quizzes taken yet. Enrol in a course to begin!</p>';
  } else {
    quizList.innerHTML = results.slice(-5).reverse().map(r => {
      const pass = r.score >= 60;
      return `
        <div class="dash-quiz-item">
          <div class="dash-quiz-icon ${pass ? 'pass' : 'fail'}">
            <i class="fas ${pass ? 'fa-trophy' : 'fa-times'}"></i>
          </div>
          <div class="dash-quiz-info">
            <h5>${r.course} Quiz</h5>
            <p>${r.date || 'Recently'}</p>
          </div>
          <div class="dash-quiz-score ${pass ? 'pass' : 'fail'}">${r.score}%</div>
        </div>
      `;
    }).join('');
  }
}
window.renderDashboard = renderDashboard;

/* ── Filter Animation ── */
window.filterCourses = function(category) {
  const cards = document.querySelectorAll('.course-card');
  cards.forEach((card, i) => {
    const cat = card.getAttribute('data-category');
    const show = category === 'all' || cat === category;
    if (show) {
      card.classList.remove('hidden');
      card.style.animation = 'none';
      card.offsetHeight; // reflow
      card.style.animation = `cardIn 0.4s ease ${i * 0.08}s forwards`;
    } else {
      card.classList.add('hidden');
    }
  });
};
