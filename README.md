# React Unity WebGL Template

A modern React application built with Vite that integrates Unity WebGL content. This template provides a streamlined development experience with React 18, Vite, Tailwind CSS, and React Router.

## Features

- 🚀 **Vite** - Fast development server and optimized builds
- ⚛️ **React 18** - Latest React features and improvements
- 🎮 **Unity WebGL Integration** - Seamlessly embed Unity content in your React app
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🧭 **React Router** - Client-side routing for single-page applications

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- Basic knowledge of React, TypeScript, and Vite

## Getting Started

Follow these steps to get the project up and running:

### 1. Clone the repository

```bash
git clone <repository-url>
cd react-unity-webgl-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

Choose one of the following commands based on your target environment:

Will start on https://localhost:3000

```bash
# For mainnet environment
npm run start:mainnet

# For testnet environment
npm run start:testnet

# For development environment
npm run start:devnet

# Default development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests

### Environment-specific commands

- `npm run start:mainnet` - Start with mainnet configuration
- `npm run start:testnet` - Start with testnet configuration
- `npm run start:devnet` - Start with development network configuration

## Project Structure

```
├── public/              # Static assets
│   └── unitybuild/      # Unity WebGL build files
├── src/
│   ├── config/          # Environment configurations
│   ├── pages/           # Page components
│   ├── providers/       # Context providers
│   ├── routes/          # Route definitions
│   ├── app.component.tsx # Main app component
│   ├── dashboard.tsx    # Dashboard component
│   ├── main.tsx         # Application entry point
│   └── styles.css       # Global styles and Tailwind imports
├── index.html           # HTML template
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Unity WebGL Integration

This template includes integration with Unity WebGL content. The Unity build files should be placed in the `public/unitybuild/` directory.

The `react-unity-webgl` package is used to load and interact with the Unity content. See the `app.component.tsx` file for an example of how to use it.

## Customization

### Tailwind CSS

This project uses Tailwind CSS for styling. You can customize the Tailwind configuration in the `tailwind.config.js` file.

### Environment Configuration

The project supports different environments through configuration files:

- `src/config/config.mainnet.ts` - Production environment
- `src/config/config.testnet.ts` - Testing environment
- `src/config/config.devnet.ts` - Development environment
