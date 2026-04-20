// ═══════════════════════════════════════════════════════════
//  PIXEL COACH — js/quiz.js
//  Interactive quiz engine with scoring & Firestore saving
// ═══════════════════════════════════════════════════════════

let quizState = {
  courseId:  null,
  questions: [],
  current:   0,
  selected:  null,
  answers:   [],
  answered:  false
};

/* ── Start Quiz ── */
function startQuiz(courseId) {
  const course = window.COURSES[courseId];
  if (!course) return;

  quizState = {
    courseId,
    questions: course.quiz,
    current:   0,
    selected:  null,
    answers:   [],
    answered:  false
  };

  renderQuizQuestion();
  openModal('quizModal');
}
window.startQuiz = startQuiz;

/* ── Render Current Question ── */
function renderQuizQuestion() {
  const { questions, current, courseId } = quizState;
  const q        = questions[current];
  const course   = window.COURSES[courseId];
  const total    = questions.length;
  const progress = Math.round(((current) / total) * 100);

  const body = document.getElementById('quizBody');
  body.innerHTML = `
    <div class="quiz-header">
      <h3><i class="${course.icon}" style="color:${course.color};margin-right:0.5rem;"></i> ${course.title} Quiz</h3>
      <p>Test your knowledge from this course</p>
      <div class="quiz-progress-bar"><div style="width:${progress}%"></div></div>
    </div>
    <div class="quiz-counter" style="margin-bottom:1rem;">
      Question <strong>${current + 1}</strong> of <strong>${total}</strong>
    </div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options" id="quizOptions">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-idx="${i}" onclick="selectOption(${i})">
          ${opt}
        </button>
      `).join('')}
    </div>
    <div class="quiz-nav">
      <span class="quiz-counter">${current + 1} / ${total}</span>
      <button class="btn btn-primary" id="quizNextBtn" onclick="nextQuestion()" disabled>
        ${current === total - 1 ? 'See Results <i class="fas fa-flag"></i>' : 'Next <i class="fas fa-arrow-right"></i>'}
      </button>
    </div>
  `;

  quizState.selected  = null;
  quizState.answered  = false;
}

/* ── Select Option ── */
function selectOption(idx) {
  if (quizState.answered) return;

  quizState.selected = idx;
  quizState.answered = true;

  const q       = quizState.questions[quizState.current];
  const options = document.querySelectorAll('.quiz-option');

  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct)      btn.classList.add('correct');
    else if (i === idx)        btn.classList.add('wrong');
    else                       btn.style.opacity = '0.5';
  });

  quizState.answers.push({ question: q.q, selected: idx, correct: q.correct, isCorrect: idx === q.correct });

  document.getElementById('quizNextBtn').disabled = false;
}
window.selectOption = selectOption;

/* ── Next Question ── */
function nextQuestion() {
  quizState.current++;
  if (quizState.current >= quizState.questions.length) {
    showQuizResults();
  } else {
    renderQuizQuestion();
  }
}
window.nextQuestion = nextQuestion;

/* ── Show Results ── */
function showQuizResults() {
  const { answers, courseId, questions } = quizState;
  const course    = window.COURSES[courseId];
  const correct   = answers.filter(a => a.isCorrect).length;
  const total     = questions.length;
  const score     = Math.round((correct / total) * 100);
  const pass      = score >= 60;

  const body = document.getElementById('quizBody');
  body.innerHTML = `
    <div class="quiz-results">
      <h3>${pass ? '🎉 Congratulations!' : '📚 Keep Practising!'}</h3>
      <div class="quiz-score-circle">
        <span class="score-num">${score}%</span>
        <span class="score-label">${correct}/${total} correct</span>
      </div>
      <p>${pass
        ? 'Great work! You've passed this quiz. Keep up the momentum!'
        : 'You need 60% to pass. Review the modules and try again!'
      }</p>
      <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.5rem;">
        <button class="btn btn-primary" onclick="closeModal('quizModal');openCourse('${courseId}')">
          <i class="fas fa-book"></i> Back to Course
        </button>
        <button class="btn btn-outline" onclick="startQuiz('${courseId}')">
          <i class="fas fa-redo"></i> Retry Quiz
        </button>
      </div>
      <div class="quiz-review">
        <h5 style="margin-bottom:0.75rem;font-size:0.9rem;color:var(--text-2);">Answer Review</h5>
        ${answers.map((a, i) => `
          <div class="quiz-review-item ${a.isCorrect ? 'correct-answer' : 'wrong-answer'}">
            <strong>Q${i+1}:</strong> ${a.question}<br/>
            <span style="font-size:0.8rem;color:var(--text-2);">
              ${a.isCorrect
                ? `✅ Correct: ${questions[i].options[a.correct]}`
                : `❌ You chose: ${questions[i].options[a.selected]} | ✅ Correct: ${questions[i].options[a.correct]}`
              }
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Save result
  saveQuizResult(courseId, score);
}

/* ── Save Quiz to Firestore ── */
async function saveQuizResult(courseId, score) {
  const course = window.COURSES[courseId];
  const result = {
    course: course.title,
    score,
    date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
  };

  // Update local data
  if (!window.userProgressData) window.userProgressData = {};
  if (!window.userProgressData.quizResults) window.userProgressData.quizResults = [];
  window.userProgressData.quizResults.push(result);
  renderDashboard(window.userProgressData);

  // Firestore
  if (window.firebaseDb && window.currentUser) {
    try {
      const ref = window.fbDoc(window.firebaseDb, "users", window.currentUser.uid);
      await window.fbUpdateDoc(ref, {
        quizResults: window.fbArrayUnion(result)
      });
    } catch(e) { console.warn("Could not save quiz:", e); }
  }

  showToast(`Quiz done! You scored ${score}% 🎯`);
}
