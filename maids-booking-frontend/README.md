# Maids Booking Frontend

A modern React frontend for the Maids Booking System, built with TypeScript, Tailwind CSS, and Vite.

## Features

- 🔐 **Authentication System** - Login/Register with JWT support
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎯 **Dashboard** - Overview of bookings and quick actions
- 📅 **Booking System** - Multi-step form for scheduling services
- 👤 **User Profile** - Account management and preferences
- 🚀 **Modern Tech Stack** - React 18, TypeScript, Vite

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Development**: Hot reload, ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   └── LoadingSpinner.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── pages/              # Page components
│   ├── Login.tsx       # Login/Register page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Booking.tsx     # Service booking form
│   └── Profile.tsx     # User profile management
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend is configured to proxy API requests to the backend:

- **Development**: `/api/*` → `http://localhost:4000/v1/*`
- **Production**: Update Vite config for production API endpoint

## Features Overview

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Persistent sessions

### Dashboard
- Welcome message with user info
- Quick action cards
- Upcoming bookings overview
- Recent booking history

### Booking System
- Multi-step form (3 steps)
- Home details collection
- Schedule and address input
- Review and confirmation

### User Profile
- Personal information editing
- Account security settings
- Booking statistics
- Quick action shortcuts

## Styling

The project uses Tailwind CSS with custom component classes:

- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling  
- `.input-field` - Form input styling
- `.card` - Card container styling

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Ensure responsive design
4. Test on multiple devices

## License

This project is part of the Maids Booking System.
