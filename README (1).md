# ⬡ PixelCoach — Setup Guide

## 📁 File Structure
```
pixel-coach/
├── index.html
├── styles/
│   ├── main.css          ← Variables, navbar, hero, footer
│   ├── components.css    ← Cards, modals, quiz, auth forms
│   └── dashboard.css     ← User dashboard styles
└── js/
    ├── firebase-config.js ← Firebase init (edit this first!)
    ├── data.js            ← Course data + quiz questions
    ├── ui.js              ← Modal system, theme, course renderer
    ├── auth.js            ← Login / Signup / Google OAuth
    ├── quiz.js            ← Quiz engine + scoring
    └── main.js            ← Events, scroll animations, filters
```

---

## 🔥 Firebase Setup (5 minutes)

### Step 1 — Create Firebase Project
1. Visit https://console.firebase.google.com/
2. Click **"Add project"**, name it `pixel-coach`
3. Disable Google Analytics (optional), click **Create Project**

### Step 2 — Enable Authentication
1. Go to **Build → Authentication → Get started**
2. Enable **Email/Password** provider
3. Enable **Google** provider (add your support email)

### Step 3 — Create Firestore Database
1. Go to **Build → Firestore Database → Create database**
2. Choose **"Start in test mode"** (update rules later for production)
3. Pick any server location (e.g. `asia-south1` for India)

### Step 4 — Register Web App
1. Go to **Project Settings** (gear icon)
2. Under **"Your apps"**, click **`</>`** (web icon)
3. Register the app with name `PixelCoach Web`
4. Copy the `firebaseConfig` object shown

### Step 5 — Paste Config
Open `js/firebase-config.js` and replace the placeholder values:
```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "pixel-coach-xxx.firebaseapp.com",
  projectId:         "pixel-coach-xxx",
  storageBucket:     "pixel-coach-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef"
};
```

---

## 🚀 Running the Project

### Option A — VS Code Live Server (Recommended)
1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → **"Open with Live Server"**

### Option B — Any HTTP Server
```bash
# Python
python -m http.server 3000

# Node.js
npx serve .

# PHP
php -S localhost:3000
```

> ⚠️ Do NOT open `index.html` directly as `file://` — Firebase requires HTTP/HTTPS.

---

## ✨ Features Overview

| Feature | Status |
|---|---|
| Dark / Light mode | ✅ |
| Responsive (mobile + desktop) | ✅ |
| Course filter (Video / Photo / Graphic) | ✅ |
| Course detail modal with modules | ✅ |
| YouTube video player (in-site) | ✅ |
| Quiz system with scoring | ✅ |
| Email / Password auth | ✅ (Firebase) |
| Google OAuth login | ✅ (Firebase) |
| User dashboard | ✅ |
| Firestore progress saving | ✅ |
| Scroll animations | ✅ |
| Mouse parallax on hero | ✅ |

---

## 📹 Replacing YouTube Videos

In `js/data.js`, each module has a `videoId` field:
```js
{ id: "v1", title: "Introduction to Video Editing", duration: "12 min", videoId: "AQpHLvzSATs" }
```
Replace `AQpHLvzSATs` with any YouTube video ID (the part after `?v=` in the URL).

---

## 🔒 Firestore Security Rules (Production)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

Made with ♥ by PixelCoach
