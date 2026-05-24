# Mishra Ji | AI-Powered Portfolio Website

This is a premium, 3D holographic portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Three.js** (via React Three Fiber).

## Features
- **Interactive 3D Backgrounds:** Procedurally generated orbiting rings, particles, and floating geometric shapes with dynamic mouse-movement parallax.
- **Holographic Data Dashboard:** A real-time rendering 3D bar chart and curved line graph with digital scanlines and glowing overlay indicators.
- **Micro-Animations:** Fluid scrolling reveals, timeline entry animations, and hover lighting effects.
- **Autonomous Contact Uplink:** The contact form saves message records locally to `localStorage` when running in dev, and seamlessly binds to **Netlify Forms** in production. No backend server needed.

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v20+ recommended).

### 1. Install Dependencies
Run the following command in the project directory:
```bash
npm install --legacy-peer-deps
```

### 2. Run the Development Server
Launch the local dev environment:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Build for Production
Compile the optimized static production bundle:
```bash
npm run build
```
The compiled frontend will be generated in the `dist/` directory, ready to be hosted on Netlify, Vercel, or GitHub Pages.
