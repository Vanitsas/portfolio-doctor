# 🩺 Portfolio Doctor

A web app that analyzes any portfolio website and returns a detailed quality report — powered by the **Google PageSpeed Insights API**.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## ✨ Features

- 🔗 Analyze any website by URL
- ⚡ Real scores via Google PageSpeed Insights API
- 📊 4 categories: Performance, SEO, Accessibility, Best Practices
- 🐛 Detailed issue breakdown with severity levels
- 🗺️ Actionable improvement roadmap
- 🎨 Clean, modern dark UI with smooth animations
- 🔄 Demo mode works without an API key

## 🚀 Live Demo

>> 🔗 [portfolio-doctor-aygun.netlify.app](https://portfolio-doctor-aygun.netlify.app)

## 🛠️ Tech Stack

- **React 18** — component-based UI
- **Google PageSpeed Insights API** — real website analysis
- **CSS Modules** — scoped, maintainable styles
- **Google Fonts** — DM Serif Display + Outfit

## 📁 Project Structure

```
src/
├── App.js                  # Main component, state management
├── App.css                 # Layout styles
├── index.js                # Entry point
├── index.css               # Global styles & CSS variables
└── components/
    ├── Header.js            # Hero title & badge
    ├── UrlInput.js          # URL input + API key setup
    ├── LoadingState.js      # Animated loading steps
    ├── ScoreHero.js         # Animated score ring
    ├── CategoryCards.js     # Performance / SEO / A11y / BP cards
    ├── IssuesList.js        # Issues with severity badges
    └── SuggestionsList.js   # Improvement roadmap
```

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Vanitsas/portfolio-doctor.git
cd portfolio-doctor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Get a free API key (optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable **PageSpeed Insights API**
4. Generate an API key under **Credentials**
5. Paste it into the app — without it, the app runs in demo mode

## 📸 How It Works

1. User enters a portfolio URL
2. App calls the Google PageSpeed Insights API
3. Returns scores across 4 categories (0–100)
4. Displays issues found + a prioritized improvement roadmap

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📄 License

MIT
