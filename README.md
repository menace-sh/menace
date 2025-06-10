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
```bash
npm start
```

This will build the React app and launch it in Electron. No need to run build separately.

### Development
For development with auto-rebuild on file changes:
```bash
npm run watch
```
Then in another terminal:
```bash
electron .
```

## Tech Stack
- **Electron** - Desktop application framework
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Webpack** - Module bundler