// ═══════════════════════════════════════════════════════════
//  PIXEL COACH — js/data.js
//  All course data, modules, YouTube videos, and quiz banks
// ═══════════════════════════════════════════════════════════

const COURSES = {
  video: {
    id: "video",
    title: "Video Editing",
    icon: "fas fa-film",
    iconClass: "icon-video",
    glowClass: "glow-video",
    color: "#f97316",
    description: "Master cinematic editing, colour grading, transitions, and storytelling with DaVinci Resolve and Premiere Pro.",
    levels: {
      beginner: {
        label: "🟢 Beginner",
        modules: [
        { 
  id: "v1", 
  title: "Install Canva in Windows and Mac OS", // Updated title based on the video
  duration: "2:28", // Actual duration of this specific video
  videoId: "qcvOclIhwW0" // New Video ID
}
          { id: "v2", title: "Understanding Timelines & Cuts", duration: "18 min", videoId: "AQpHLvzSATs" },
          { id: "v3", title: "Working with B-roll Footage", duration: "22 min", videoId: "AQpHLvzSATs" },
          { id: "v4", title: "Audio Basics & Syncing", duration: "15 min", videoId: "AQpHLvzSATs" },
          { id: "v5", title: "Exporting Your First Video", duration: "10 min", videoId: "AQpHLvzSATs" }
        ]
      },
      intermediate: {
        label: "🟡 Intermediate",
        modules: [
          { id: "v6",  title: "Colour Correction Fundamentals", duration: "28 min", videoId: "AQpHLvzSATs" },
          { id: "v7",  title: "Transitions & Motion Effects", duration: "24 min", videoId: "AQpHLvzSATs" },
          { id: "v8",  title: "Titles & Lower Thirds", duration: "20 min", videoId: "AQpHLvzSATs" },
          { id: "v9",  title: "Multicam Editing", duration: "32 min", videoId: "AQpHLvzSATs" },
          { id: "v10", title: "Audio Mixing & SFX", duration: "25 min", videoId: "AQpHLvzSATs" }
        ]
      },
      advanced: {
        label: "🔴 Advanced",
        modules: [
          { id: "v11", title: "Cinematic Colour Grading (LUTs)", duration: "40 min", videoId: "AQpHLvzSATs" },
          { id: "v12", title: "VFX Compositing Basics", duration: "45 min", videoId: "AQpHLvzSATs" },
          { id: "v13", title: "Speed Ramps & Optical Flow", duration: "30 min", videoId: "AQpHLvzSATs" },
          { id: "v14", title: "Delivering for OTT Platforms", duration: "22 min", videoId: "AQpHLvzSATs" }
        ]
      }
    },
    quiz: [
      {
        q: "What does 'colour grading' mean in video editing?",
        options: ["Adding credits to a video", "Adjusting the colour tone and mood of footage", "Cutting clips into smaller pieces", "Syncing audio to video"],
        correct: 1
      },
      {
        q: "Which keyboard shortcut is commonly used to cut/split a clip in Premiere Pro?",
        options: ["Ctrl + C", "Ctrl + X", "C (Razor Tool)", "Alt + Delete"],
        correct: 2
      },
      {
        q: "What is B-roll footage?",
        options: ["The main interview footage", "Supplemental cutaway shots", "Credits at the end", "Title cards"],
        correct: 1
      },
      {
        q: "What is a LUT in video editing?",
        options: ["A type of video codec", "A Look-Up Table for colour transformation", "A video format", "A transition effect"],
        correct: 1
      },
      {
        q: "Which frame rate is standard for cinematic film?",
        options: ["30 fps", "60 fps", "24 fps", "120 fps"],
        correct: 2
      }
    ]
  },

  photo: {
    id: "photo",
    title: "Photo Editing",
    icon: "fas fa-camera-retro",
    iconClass: "icon-photo",
    glowClass: "glow-photo",
    color: "#06b6d4",
    description: "Retouch portraits, build composites, and master colour science in Adobe Lightroom & Photoshop.",
    levels: {
      beginner: {
        label: "🟢 Beginner",
        modules: [
          { id: "p1", title: "Lightroom Interface & Importing", duration: "14 min", videoId: "AQpHLvzSATs" },
          { id: "p2", title: "Exposure, Contrast & Whites", duration: "18 min", videoId: "AQpHLvzSATs" },
          { id: "p3", title: "White Balance & Tones", duration: "16 min", videoId: "AQpHLvzSATs" },
          { id: "p4", title: "Cropping & Lens Correction", duration: "12 min", videoId: "AQpHLvzSATs" },
          { id: "p5", title: "Exporting for Web & Print", duration: "10 min", videoId: "AQpHLvzSATs" }
        ]
      },
      intermediate: {
        label: "🟡 Intermediate",
        modules: [
          { id: "p6",  title: "HSL & Colour Grading in Lightroom", duration: "25 min", videoId: "AQpHLvzSATs" },
          { id: "p7",  title: "Photoshop: Layers & Masks", duration: "30 min", videoId: "AQpHLvzSATs" },
          { id: "p8",  title: "Skin Retouching Techniques", duration: "28 min", videoId: "AQpHLvzSATs" },
          { id: "p9",  title: "Healing Brush & Clone Stamp", duration: "22 min", videoId: "AQpHLvzSATs" },
          { id: "p10", title: "Frequency Separation", duration: "20 min", videoId: "AQpHLvzSATs" }
        ]
      },
      advanced: {
        label: "🔴 Advanced",
        modules: [
          { id: "p11", title: "Compositing & Photo Manipulation", duration: "45 min", videoId: "AQpHLvzSATs" },
          { id: "p12", title: "Dodge & Burn Mastery", duration: "35 min", videoId: "AQpHLvzSATs" },
          { id: "p13", title: "Creating Presets & Profiles", duration: "25 min", videoId: "AQpHLvzSATs" }
        ]
      }
    },
    quiz: [
      {
        q: "What does RAW format mean in photography?",
        options: ["A compressed image format", "Unprocessed sensor data with full editing latitude", "A black & white photo", "A video format"],
        correct: 1
      },
      {
        q: "Which Lightroom panel controls Saturation and Hue?",
        options: ["Tone Curve", "Detail", "HSL / Color", "Calibration"],
        correct: 2
      },
      {
        q: "What is a 'layer mask' in Photoshop?",
        options: ["A filter effect", "A way to selectively hide/reveal parts of a layer", "A blending mode", "A file format"],
        correct: 1
      },
      {
        q: "What is Frequency Separation used for?",
        options: ["Sharpening edges", "Separating texture and colour for retouching", "Adding bokeh", "Colour grading"],
        correct: 1
      },
      {
        q: "Which tool removes blemishes by sampling nearby pixels?",
        options: ["Crop Tool", "Lasso Tool", "Healing Brush Tool", "Pen Tool"],
        correct: 2
      }
    ]
  },

  graphic: {
    id: "graphic",
    title: "Graphic Designing",
    icon: "fas fa-pen-nib",
    iconClass: "icon-graphic",
    glowClass: "glow-graphic",
    color: "#a855f7",
    description: "Design stunning brands, social media, and UI layouts with Figma, Adobe Illustrator & Canva.",
    levels: {
      beginner: {
        label: "🟢 Beginner",
        modules: [
          { id: "g1", title: "Design Principles & Typography", duration: "16 min", videoId: "AQpHLvzSATs" },
          { id: "g2", title: "Colour Theory for Designers", duration: "20 min", videoId: "AQpHLvzSATs" },
          { id: "g3", title: "Figma Interface & Auto Layout", duration: "22 min", videoId: "AQpHLvzSATs" },
          { id: "g4", title: "Creating Your First Social Post", duration: "18 min", videoId: "AQpHLvzSATs" },
          { id: "g5", title: "Canva Pro Deep Dive", duration: "15 min", videoId: "AQpHLvzSATs" }
        ]
      },
      intermediate: {
        label: "🟡 Intermediate",
        modules: [
          { id: "g6",  title: "Logo Design in Illustrator", duration: "35 min", videoId: "AQpHLvzSATs" },
          { id: "g7",  title: "Brand Identity Systems", duration: "30 min", videoId: "AQpHLvzSATs" },
          { id: "g8",  title: "Grids, Spacing & Alignment", duration: "25 min", videoId: "AQpHLvzSATs" },
          { id: "g9",  title: "Vector Illustration Basics", duration: "28 min", videoId: "AQpHLvzSATs" },
          { id: "g10", title: "UI Component Design in Figma", duration: "32 min", videoId: "AQpHLvzSATs" }
        ]
      },
      advanced: {
        label: "🔴 Advanced",
        modules: [
          { id: "g11", title: "Motion in Figma (Smart Animate)", duration: "28 min", videoId: "AQpHLvzSATs" },
          { id: "g12", title: "Design Systems & Tokens", duration: "40 min", videoId: "AQpHLvzSATs" },
          { id: "g13", title: "Print Production & Prepress", duration: "22 min", videoId: "AQpHLvzSATs" },
          { id: "g14", title: "Building a Design Portfolio", duration: "30 min", videoId: "AQpHLvzSATs" }
        ]
      }
    },
    quiz: [
      {
        q: "What does CMYK stand for?",
        options: ["Cyan, Magenta, Yellow, Key(Black)", "Color, Mix, Yellow, Keep", "Chrome, Mono, Yellow, Key", "None of the above"],
        correct: 0
      },
      {
        q: "Which colour model is used for screen design?",
        options: ["CMYK", "Pantone", "RGB", "HSB"],
        correct: 2
      },
      {
        q: "What is 'kerning' in typography?",
        options: ["The size of a font", "Spacing between specific letter pairs", "The weight of a font", "Paragraph spacing"],
        correct: 1
      },
      {
        q: "What file format is best for logos (scalable, no quality loss)?",
        options: ["JPEG", "PNG", "GIF", "SVG"],
        correct: 3
      },
      {
        q: "What is a 'design system'?",
        options: ["A computer hardware setup", "A collection of reusable components, styles & guidelines", "A type of software", "A printing technique"],
        correct: 1
      }
    ]
  }
};

// Make globally available
window.COURSES = COURSES;
