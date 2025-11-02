# Portfolio Website

A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 18+ installed on your system
- npm or pnpm package manager

## Installation

### Option 1: Using npm (recommended if pnpm is not installed)

```bash
npm install --legacy-peer-deps
```

**Note:** The `--legacy-peer-deps` flag is required due to some packages expecting React 18, while this project uses React 19.

### Option 2: Using pnpm (if you have pnpm installed)

```bash
pnpm install
```

If you don't have pnpm installed, you can install it globally:
```bash
npm install -g pnpm
```

## Running the Development Server

### Using npm:
```bash
npm run dev
```

### Using pnpm:
```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` or `pnpm dev` - Start the development server
- `npm run build` or `pnpm build` - Build the application for production
- `npm run start` or `pnpm start` - Start the production server (requires build first)
- `npm run lint` or `pnpm lint` - Run ESLint to check code quality

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **next-themes** - Theme management

## Project Structure

```
├── app/              # Next.js app directory
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles
├── components/       # React components
│   ├── ui/          # UI component library
│   └── theme-provider.tsx
├── lib/             # Utility functions
├── public/          # Static assets
└── styles/          # Additional stylesheets
```

## Troubleshooting

If you encounter any issues:

1. **Clear cache and reinstall dependencies:**
   ```bash
   rm -rf node_modules .next
   npm install --legacy-peer-deps
   ```

2. **Check Node.js version:**
   ```bash
   node --version  # Should be 18 or higher
   ```

3. **Port already in use:**
   If port 3000 is already in use, Next.js will automatically try the next available port.

