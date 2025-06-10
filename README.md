# menace

Open source Codex that runs locally.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
git clone https://github.com/menace-sh/menace.git
cd menace
npm install
```

### Running the App

#### Development Mode (with hot reload)
```bash
npm run dev
```
This runs the app with hot reload enabled. Your React changes will update instantly without restarting Electron. The app uses a local development server (localhost:5173) for fast refresh.

#### Production Mode
```bash
npm run build  # Build the app
npm start      # Run the built app
```
This runs the production version with everything bundled inside Electron - no localhost, no external servers. This is how your app will run for real users.

### Quick Start
- Use `npm run dev` while developing (hot reload for fast iteration)
- Use `npm start` to test the final bundled app

## Tech Stack
- **Electron** - Desktop application framework
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool with instant hot reload
- **electron-vite** - Electron + Vite integration