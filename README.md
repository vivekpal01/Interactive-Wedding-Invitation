<div align="center">

# Nishant & Purwa — A Wedding Invitation Experience

**Two worlds. One story. A little bit of magic.**

A personalized, interactive wedding invitation built with React, TypeScript, and Vite — bringing together an illustrated couple, celebration schedule, music, memories, and the journey to Nagpur.

[Overview](#-the-experience) · [Tech Stack](#-built-with) · [Run Locally](#-run-locally) · [Customize](#-make-it-yours)

</div>

---

## The experience

This project turns a traditional wedding invitation into a small, scrollable digital experience. It was designed around the couple's story: Indian roots, life abroad, and family coming together in Nagpur.

- **A cinematic opening** — animated names, illustrated couple artwork, decorative lights, and a clear invitation entry point.
- **The couple's story** — separate introductions and personal details for the bride and groom.
- **A journey across borders** — an illustrated route connecting Ireland and the UK to Nagpur.
- **Celebration timeline** — Haldi, Sangeet, Wedding, and Reception details with dress-code notes.
- **Interactive memories** — a photo gallery and scratch-to-reveal moment.
- **Music controls** — optional background music with play, pause, and mute controls.
- **Venue and directions** — an embedded map and a directions link.
- **Responsive presentation** — layouts designed to work across mobile and desktop, with reduced-motion support for visitors who request it.

> The names, family details, event schedule, venue, photos, and artwork in this repository are specific to this invitation. Replace them before reusing the project for another event.

## Built with

| Technology | What it does |
|---|---|
| React 18 | Component-based user interface |
| TypeScript | Typed application code |
| Vite | Local development and production builds |
| GSAP + ScrollTrigger | Scroll-led and entrance animations |
| CSS | Responsive layout, visual styling, and decorative effects |
| Lucide React | Interface icons |

## Run locally

**Requirements:** Node.js (LTS recommended) and npm.

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repository>.git
cd <your-repository>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

```bash
# Type-check and create a production build
npm run build

# Preview the production build locally
npm run preview
```

The production output is generated in `dist/` and can be deployed to a static hosting provider such as GitHub Pages, Netlify, or Vercel. Configure the deployment base path if the site is hosted from a repository subpath.

## Make it yours

Most event-specific content is centralized in `src/config.ts`.

| What to change | Where |
|---|---|
| Couple and family details | `src/config.ts` |
| Event names, dates, times, and dress codes | `src/config.ts` |
| Venue name and location | `src/config.ts` |
| Google Maps embed and directions | `src/config.ts` |
| Background music | `public/audio/wedding-song.mp3` and `src/config.ts` |
| Gallery images | `public/photos/` and `src/components/Gallery.tsx` |
| Sticker / illustration artwork | `public/stickers/` |
| Page title and browser metadata | `index.html` |
| Global styles and responsive layouts | `src/styles.css` |

**Before publishing a customized version:**
1. Replace the couple's names, family details, event information, and venue.
2. Replace personal photos, illustrations, and music with files you have permission to use.
3. Update the map embed and directions URL, then test them on a phone.
4. Check that all image and audio paths load correctly.
5. Run `npm run build` and test the production output.

## Project structure

```text
.
├── public/
│   ├── audio/              # Background music
│   ├── photos/             # Couple's photo gallery
│   ├── stickers/           # Couple and event illustrations
│   └── map.jpg             # Illustrated journey map background
├── src/
│   ├── components/
│   │   ├── Gallery.tsx     # Interactive photo gallery
│   │   ├── Music.tsx       # Audio playback controls
│   │   ├── RouteMap.tsx    # Animated travel route
│   │   └── Scratch.tsx     # Scratch-to-reveal interaction
│   ├── App.tsx             # Main invitation and page composition
│   ├── config.ts           # Event and venue configuration
│   ├── main.tsx            # React application entry point
│   └── styles.css          # Visual system and responsive styling
├── index.html
├── package.json
└── README.md
```

## Design and implementation notes

- Motion is part of the visual storytelling, but the app checks the visitor's `prefers-reduced-motion` setting before running key animations.
- Audio playback is controlled by the visitor. Browser autoplay policies can prevent sound from starting until the first interaction.
- The event configuration is kept separate from the main page so common invitation details can be updated without editing the page composition.
- Artwork and personal media are stored in `public/` and referenced by their public paths.

## About this project

I built this as a hands-on frontend project: taking a personal idea, shaping its visual direction, integrating interactive elements, and bringing the pieces together into a working experience.

AI-assisted tools were part of the development workflow. The project is included here as a practical example of how I explore ideas, work with modern frontend tools, iterate on a UI, and turn a concept into something people can use.

**Created by Vivek Pal** · [GitHub](https://github.com/vivekpal01)

---

<div align="center">

*Made to celebrate two people, two journeys, and one beginning.*

</div>
