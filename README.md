# Minecraft Server Store Frontend

A modern, unique, and fully configurable Minecraft server store frontend. The entire website—including themes, categories, items, and visibility—is driven by JSON configuration files.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Framer Motion
- **Background**: Three.js (Animated 3D Cubes)
- **Backend**: Express.js (Node.js)
- **State Management**: Zustand (Currency Toggle)

## Project Structure
- `/client` - React frontend application
- `/server` - Express backend and storage layer
- `/shared` - Shared schemas and API route definitions
- `/client/src/components` - Reusable UI components
- `/client/src/components/ThreeBackground.tsx` - Three.js animation logic

## Configuration System
The store is entirely driven by JSON data served by the backend.

- **site.json**: Controls server name, IP, logo, social links, theme colors, and background animation settings.
- **categories.json**: Defines store categories (e.g., Ranks, Coins) with descriptions and banners.
- **products.json**: Lists all items with prices in multiple currencies (INR/USD), images, and checkout links.

## Development Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Project
```bash
npm run dev
```
- The Express server runs the API on port 5000.
- Vite serves the frontend and proxies API requests to the backend.

## Features
- **JSON Configurable**: Update your store without touching the code.
- **Animated 3D Background**: High-performance Three.js cube animation with mouse parallax.
- **Currency Switcher**: Toggle between INR and USD with instant price updates.
- **Dynamic Catalog**: Automatically generated category sections and product grids.
- **Tebex Integration**: Products redirect to external Tebex checkout links.
- **Copy to Clipboard**: One-click server IP copying with visual feedback.

## Deployment Instructions

### Deploying to Vercel/Netlify
1. Connect your repository to Vercel or Netlify.
2. Set the **Build Command** to: `npm run build`
3. Set the **Output Directory** to: `dist/public` (if using the full-stack build) or follow the specific framework defaults.
4. Ensure environment variables (if any) are configured in the deployment dashboard.
5. For a full-stack deployment on Replit, simply use the "Deploy" button.
