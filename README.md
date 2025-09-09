# Elide Website

A modern, interactive website built with Next.js 15 and React 19, featuring advanced UI components and 3D visualizations.

## Overview

This project showcases a contemporary web application with sophisticated user interface components, including neural network visualizations, floating navigation docks, and animated backgrounds. Built with performance and user experience in mind.

## Tech Stack

### Core Framework
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - JavaScript library for building user interfaces
- **TypeScript 5** - Static type checking

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **tailwindcss-animate 1.0.7** - Animation utilities for Tailwind
- **tw-animate-css 1.3.8** - Additional CSS animations
- **PostCSS 8.5.6** - CSS processing tool
- **Autoprefixer 10.4.21** - CSS vendor prefixing

### UI Components & Libraries
- **Lucide React 0.542.0** - Beautiful & consistent icon library
- **Tabler Icons React 3.34.1** - Additional icon set
- **class-variance-authority 0.7.1** - Component variant management
- **clsx 2.1.1** - Conditional className utility
- **tailwind-merge 3.3.1** - Merge Tailwind classes efficiently

### Animation & 3D Graphics
- **GSAP 3.13.0** - Professional animation library
- **@gsap/react 2.1.2** - React integration for GSAP
- **Motion 12.23.12** - Animation library for React
- **Three.js 0.180.0** - 3D graphics library
- **@react-three/fiber 9.3.0** - React renderer for Three.js
- **@react-three/drei 10.7.5** - Useful helpers for react-three-fiber
- **simplex-noise 4.0.3** - Noise generation for procedural effects

### Development Tools
- **ESLint 9** - JavaScript/TypeScript linting
- **@eslint/eslintrc 3** - ESLint configuration
- **eslint-config-next 15.5.2** - Next.js ESLint configuration

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog page
│   ├── download/          # Download page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   │   ├── floating-dock.tsx
│   │   ├── neural-network-hero.tsx
│   │   ├── wavy-background.tsx
│   │   └── glowing-effect.tsx
│   ├── blog-cards-demo.tsx
│   ├── floating-dock-demo.tsx
│   ├── navbar.tsx
│   └── neural-network-demo.tsx
└── lib/
    └── utils.ts           # Utility functions
```

## Features

- **Interactive Neural Network Visualization** - 3D animated neural network using Three.js
- **Floating Navigation Dock** - macOS-style floating dock with smooth animations
- **Wavy Background Effects** - Dynamic animated backgrounds
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Custom-built components with animations
- **Blog System** - Content management for blog posts
- **Download Center** - Dedicated download page
- **Performance Optimized** - Built with Next.js 15 App Router

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/baasilali/web-demo-09-09-2025.git
cd elide-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Dependencies

### Animation Libraries
- **GSAP** - Industry-standard animation library for complex animations
- **Motion** - Declarative animations for React components
- **Three.js ecosystem** - 3D graphics and WebGL rendering

### Utility Libraries
- **simplex-noise** - Generates smooth, natural-looking noise patterns
- **clsx & tailwind-merge** - Efficient className management
- **class-variance-authority** - Type-safe component variants

## Browser Support

This application supports all modern browsers with ES6+ support:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is private and not licensed for public use.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/) and [Tabler Icons](https://tabler-icons.io/)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Animations by [GSAP](https://gsap.com/)