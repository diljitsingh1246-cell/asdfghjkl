// ═══════════════════════════════════════════════════════════
//  PIXEL COACH — js/auth.js
//  Authentication handlers (Email/Password + Google)
// ═══════════════════════════════════════════════════════════

/* ── Email/Password Login ── */
async function handleLogin() {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl    = document.getElementById('loginError');
  errEl.textContent = '';

  if (!email || !password) {
    errEl.textContent = 'Please fill in all fields.';
    return;
  }

  try {
    await window.fbSignIn(window.firebaseAuth, email, password);
    // onAuthStateChanged will handle the rest
  } catch (e) {
    errEl.textContent = friendlyError(e.code);
  }
}
window.handleLogin = handleLogin;

/* ── Email/Password Sign Up ── */
async function handleSignup() {
  const name     = document.getElementById('signupName').value.trim();
  const email    = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const errEl    = document.getElementById('signupError');
  errEl.textContent = '';

  if (!name || !email || !password) {
    errEl.textContent = 'Please fill in all fields.';
    return;
  }
  if (password.length < 6) {
    errEl.textContent = 'Password must be at least 6 characters.';
    return;
  }

  try {
    const cred = await window.fbCreateUser(window.firebaseAuth, email, password);
    await window.fbUpdateProfile(cred.user, { displayName: name });
    await window.ensureUserDoc({ ...cred.user, displayName: name });
    // onAuthStateChanged will trigger login flow
  } catch (e) {
    errEl.textContent = friendlyError(e.code);
  }
}
window.handleSignup = handleSignup;

/* ── Google Login ── */
async function handleGoogleLogin() {
  try {
    await window.fbGoogleLogin(window.firebaseAuth, window.firebaseProvider);
    // onAuthStateChanged handles the rest
  } catch (e) {
    showToast('Google sign-in failed. Please try again.');
  }
}
window.handleGoogleLogin = handleGoogleLogin;

/* ── Logout ── */
document.getElementById('logoutBtn').addEventListener('click', async () => {
  await window.fbSignOut(window.firebaseAuth);
  closeModal('dashboardModal');
});

/* ── Error messages ── */
function friendlyError(code) {
  const map = {
    'auth/user-not-found':      'No account found with that email.',
    'auth/wrong-password':      'Incorrect password.',
    'auth/email-already-in-use':'An account with that email already exists.',
    'auth/invalid-email':       'Please enter a valid email.',
    'auth/weak-password':       'Password is too weak.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user':'Popup was closed before completing sign-in.',
    'auth/invalid-credential':  'Invalid email or password.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

/* ── Enter key support ── */
document.getElementById('loginPassword').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});
document.getElementById('signupPassword').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSignup();
});
