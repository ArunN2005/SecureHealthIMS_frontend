# SecureHealthIMS Frontend

A modern healthcare information management system frontend built with React 19 and Vite.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| Vite | 7.3.1 | Build Tool |
| React Router | 7.13.0 | Client-side Routing |
| Axios | 1.13.5 | HTTP Client |
| Framer Motion | 12.34.0 | Animations |
| Lucide React | 0.563.0 | Icons |

## Live Demo

**Production:** https://secure-health-ims-frontend.vercel.app/

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/avkbsurya119/SecureHealthIMS_frontend.git

# Install dependencies
cd SecureHealthIMS_frontend
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── api/           # Axios configuration
├── assets/        # Static assets
├── components/    # Reusable UI components
│   ├── layout/    # Layout components (Navbar, etc.)
│   └── ui/        # UI primitives (Button, Card, etc.)
├── context/       # React context providers
├── pages/         # Route-based pages
│   ├── Auth/      # Login, Register
│   └── Dashboard/ # Role-based dashboards
├── App.jsx        # Root component
└── main.jsx       # Entry point
```

## Features

- Role-based dashboards (Admin, Doctor, Patient)
- Patient search and management
- Appointment scheduling
- Medical records management
- Consent management
- Dark/Light theme support
- Responsive design

## CI/CD Pipeline

The project uses GitHub Actions for CI and Vercel for CD.

| Stage | Tool | Status |
|-------|------|--------|
| Lint | ESLint | Required |
| Build | Vite | Required |
| Security | npm audit | Warning |
| Deploy | Vercel | Auto on main |

## Security

- JWT-based authentication
- Role-based access control
- Secure HTTP headers via Vercel config
- HTTPS enforced

## Related

- [Backend Repository](https://github.com/avkbsurya119/SecureHealthIMS_backend)

## License

MIT
