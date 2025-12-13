# Edcode Portfolio

## Overview

A personal portfolio website for Rwego Edward (Edcode), a self-taught developer from Uganda specializing in AI and Web3 products. The site showcases projects, achievements, and blog posts with a modern dark-mode-first design inspired by award-winning portfolios. Built as a full-stack application with React frontend and Express backend, deployable to both Replit and Vercel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and interactions
- **State Management**: TanStack React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Theme**: Dark mode primary with light mode toggle, using CSS variables

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Pattern**: RESTful endpoints under `/api/*`
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod with drizzle-zod integration
- **Storage**: Currently uses in-memory storage (MemStorage class) with interface ready for PostgreSQL migration

### Build System
- **Frontend Build**: Vite with React plugin
- **Backend Build**: esbuild for production bundling
- **Development**: Vite dev server with HMR, proxied through Express
- **Path Aliases**: `@/` for client source, `@shared/` for shared code

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route pages (Home, About, Projects, Blog, Contact)
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
├── server/              # Express backend (Replit/Render)
│   ├── app.ts           # Express app creation (shared)
│   ├── index.ts         # Server entry point with listen()
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Data storage interface and implementation
│   ├── static.ts        # Static file serving for production
│   └── vite.ts          # Vite dev server setup
├── api/                 # Vercel serverless functions
│   └── index.ts         # Serverless API entry point
├── shared/              # Shared TypeScript types and schemas
│   └── schema.ts        # Drizzle schema definitions
├── script/              # Build scripts
│   └── build.ts         # Dual-platform build script
├── vercel.json          # Vercel deployment configuration
└── render.yaml          # Render deployment configuration
```

### Data Models
- **Projects**: Portfolio projects with tech stack, categories (AI/Web3/Full-Stack), featured flag
- **Posts**: Blog/achievement posts with hashtags, likes, images
- **Contact Messages**: Form submissions from visitors
- **Users**: Basic auth structure (prepared for future use)

### Design System
- Minimal dark/neutral aesthetic with strategic accent colors
- Typography: Inter/DM Sans for body, monospace for code
- Spacing: Tailwind's 4/8/12/16/24 unit rhythm
- Components: shadcn/ui with custom theming via CSS variables

## External Dependencies

### Third-Party Services
- **Database**: PostgreSQL (via DATABASE_URL environment variable)
- **Analytics**: Google Analytics 4 (optional, via VITE_GA_MEASUREMENT_ID)
- **Deployment**: Vercel serverless functions for production API

### Key NPM Packages
- **UI Components**: Full shadcn/ui suite (@radix-ui primitives)
- **Database**: drizzle-orm, drizzle-kit, pg
- **API**: express, zod, @tanstack/react-query
- **Styling**: tailwindcss, class-variance-authority, clsx
- **Animation**: framer-motion

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `VITE_GA_MEASUREMENT_ID`: Google Analytics ID (optional)

### Deployment Configuration

**Replit (Development)**
- Run: `npm run dev` - Starts Express + Vite dev server on port 5000

**Vercel (Serverless Production)**
- Build: `npm run build:client` - Builds frontend to dist/public
- Config: vercel.json routes API requests to serverless function
- API: api/index.ts handles all /api/* requests

**Render (Traditional Production)**
- Build: `npm run build` - Builds frontend + server bundle
- Start: `npm run start` - Runs ESM server bundle (dist/server.js)
- Config: render.yaml defines web service settings

**Database Migrations**: Run `npm run db:push` to sync schema with PostgreSQL