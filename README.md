# RestaurantOS

A modern restaurant management system built with React and Vite.

## Features

- **Dashboard** - Overview of daily stats, recent orders, and popular items
- **Menu Management** - Add, edit, and manage menu items and categories
- **Orders** - Track and manage all restaurant orders in real-time
- **Tables** - Monitor table occupancy and status
- **Inventory** - Track stock levels and get low stock alerts
- **Reports** - View analytics and performance insights
- **Settings** - Configure restaurant information and preferences

## Tech Stack

- React 18
- Vite
- React Router
- TailwindCSS
- Radix UI Components
- Lucide Icons
- React Query

## Getting Started

### Prerequisites

- Node.js 18+ or Bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/
│   ├── dashboard/    # Dashboard components
│   ├── layout/       # Layout components (Sidebar, MainLayout)
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```
