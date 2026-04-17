# Focus Tracker - Frontend

The frontend client for the Focus Tracker application, built with React and Next.js. This application features a custom authentication flow, dynamic SVG/CSS components (like the Pomodoro hourglass), and a fully responsive UI styled with Tailwind CSS.

🌍 **Live Demo:** [https://focus-tracker-frontend-six.vercel.app/](https://focus-tracker-frontend-six.vercel.app/)

> ⚠️ **Note on Performance:** The backend server is currently hosted on a free tier. Your very first register or login attempt may take up to **1 minute** to process while the server "warms up" from sleep mode. All subsequent requests will be fast!

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Library:** React
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **HTTP Client:** Axios

## ✨ Key Features

- **Authentication:** Custom JWT-based login and registration flows with robust error handling.
- **Session Management:** Secure token storage and global Axios interceptors to handle session expiration (401 Unauthorized) gracefully.
- **Interactive UI:** Custom-built components, including a visually dynamic CSS-driven Hourglass timer built to handle edge-case rendering quirks.

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   git clone https://github.com/cesarzb/focus-tracker-frontend.git
   cd focus-tracker-frontend

2. Install dependencies:
   npm install

3. Set up environment variables:
   Create a .env.local file in the root directory and add your API URL:
   NEXT_PUBLIC_API_URL=http://localhost:3000

4. Run the development server:
   npm run dev

5. Open http://localhost:3000 with your browser to see the result.

## 📁 Project Structure Highlights

- `/src/app` - Next.js App Router pages (login, register, dashboard).
- `/src/components` - Reusable UI components (e.g., Hourglass.tsx).
- `/src/api` - Axios client configuration and global interceptors.
- `/src/hooks` - Custom React hooks (e.g., useAuth).
