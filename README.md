# Devora - Hangman Game

A full-stack hangman game built with React (frontend) and Node.js/Express (backend).

## Prerequisites

- Node.js (v18 or higher)
- npm

## Setup

### 1. Install Dependencies

```bash
# Install server dependencies
npm run server:install

# Install frontend dependencies
npm run frontend:install
```

### 2. Environment Variables

Create a `.env` file in the `server` directory based on `.env.example`:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file with your configuration values.

### 3. Run the Project

In separate terminal windows:

```bash
# Start the server (runs on http://localhost:5001)
npm run server

# Start the frontend (runs on http://localhost:5173)
npm run frontend
```

The frontend will automatically connect to the backend API.

## Build for Production

```bash
# Build server
npm run server:build

# Build frontend
npm run frontend:build
```
