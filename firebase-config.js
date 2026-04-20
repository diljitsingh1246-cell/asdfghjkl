// ═══════════════════════════════════════════════════════════
//  PIXEL COACH — js/firebase-config.js
//  Firebase initialisation + Auth + Firestore exports
//
//  ⚠️  SETUP INSTRUCTIONS:
//  1. Go to https://console.firebase.google.com/
//  2. Create a new project called "pixel-coach"
//  3. Enable Authentication → Email/Password AND Google
//  4. Enable Firestore Database (start in test mode)
//  5. Register a Web App inside your project
//  6. Copy your firebaseConfig values below
// ═══════════════════════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ─── YOUR FIREBASE CONFIG (replace with your own values) ───
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
// ───────────────────────────────────────────────────────────

const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const db       = getFirestore(app);
const provider = new GoogleAuthProvider();

// ── Expose globally for non-module JS files ──
window.firebaseAuth     = auth;
window.firebaseDb       = db;
window.firebaseProvider = provider;

window.fbCreateUser  = createUserWithEmailAndPassword;
window.fbSignIn      = signInWithEmailAndPassword;
window.fbGoogleLogin = signInWithPopup;
window.fbSignOut     = signOut;
window.fbUpdateProfile = updateProfile;
window.fbOnAuth      = onAuthStateChanged;

window.fbDoc         = doc;
window.fbGetDoc      = getDoc;
window.fbSetDoc      = setDoc;
window.fbUpdateDoc   = updateDoc;
window.fbArrayUnion  = arrayUnion;
window.fbServerTs    = serverTimestamp;

// ── Auth state listener ──
onAuthStateChanged(auth, async (user) => {
  if (user) {
    window.currentUser = user;
    await ensureUserDoc(user);
    onUserLoggedIn(user);
  } else {
    window.currentUser = null;
    onUserLoggedOut();
  }
});

// Creates Firestore user document if it doesn't exist
async function ensureUserDoc(user) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      name: user.displayName || "Learner",
      email: user.email,
      createdAt: serverTimestamp(),
      progress: { video: 0, photo: 0, graphic: 0 },
      completedLessons: [],
      quizResults: [],
      streak: 1
    });
  }
}

// Called from auth.js
window.ensureUserDoc = ensureUserDoc;
