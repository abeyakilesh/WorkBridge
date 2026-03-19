# BridgeWork

<br/>

The **BridgeWork** Platform enables organizations and professionals to connect seamlessly by providing tools to:

- **Create & manage job postings** with ease, detailing requirements and company culture.
- **Intelligent matching** that connects candidates to the right opportunities using comprehensive data points.
- **Interactive dashboards** for tracking applications, viewing candidate profiles, and managing postings.
- **Role-based access** to ensure Employers have management capabilities while Candidates have distinct interfaces.
- **Secure authentication** to protect sensitive professional data and maintain platform trust.

---

## Tech Stack

### Why MERN?

MERN provides a **full JavaScript ecosystem** — unified language across frontend, backend, and database queries. MongoDB's flexible schema suits the dynamic nature of job listings and candidate profiles. React (with Vite) enables a blazing-fast component-based UI. Express provides scalable middleware-driven API design for our matching engine and user management.

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite | Fast, modern, component-based UI |
| | Tailwind CSS v4 | Clean enterprise styling and responsiveness |
| | Axios | HTTP client for reliable API communication |
| | React Router v7 | Client-side routing and navigation |
| | Zustand / Context | Global client state management |
| **Backend** | Node.js + Express.js | REST API server handling business logic |
| | MongoDB Atlas + Mongoose | Cloud database + Object Data Modeling |
| | JWT + bcrypt | Secure Authentication & password hashing |
| | Helmet & CORS | Security headers and cross-origin resource sharing |
| **DevOps** | Git + GitHub | Version control and collaborative development |
| | Vercel | Frontend deployment and hosting |
| | Render | Backend containerized deployment |
| | Postman | API testing and documentation |

---

## System Architecture

```text
User (Browser)
  ↓
React Frontend (bridgework-app/Vercel)
  ↓  Axios (HTTPS)
Express Backend (Server/Render)
  ↓  Mongoose
MongoDB Atlas (Cloud DB)
```

**Request Flow:**

1. User interacts with React UI to view matches or post jobs.
2. Axios sends REST API request over HTTPS to the backend.
3. Express receives the request → middleware validates & authenticates (JWT).
4. Controller processes the core business and matching logic.
5. Mongoose retrieves/updates records within MongoDB Atlas.
6. Secure response returned to the frontend.
7. React state updates locally to reflect the latest UI changes efficiently.

---

## Database Schema

### Core Entities

| Entity | Description |
| :--- | :--- |
| **User** | Platform users, differentiated by roles (`employer`, `candidate`, `admin`) |
| **Job** | Active job opportunities posted by Employers |
| **Application** | Candidate requests to apply for specific Jobs |
| **MatchProfile** | Aggregated data for candidates to fuel the matching engine |
| **Organization** | Company profiles grouping multiple Employer accounts |

### Key Relationships

```text
User —creates—> MatchProfile
Organization —creates—> Job
User(Employer) —belongs to—> Organization
User(Candidate) —applies to—> Job (creates Application)
MatchEngine —binds—> (MatchProfile, Job)
```

---

## Folder Structure

```text
BridgeWork/
├── bridgework-app/             # React Frontend (Client)
│   ├── public/                 # Static assets
│   ├── src/                    
│   │   ├── api/                # Axios API service functions
│   │   ├── components/         # Reusable UI components (Navbar, buttons)
│   │   ├── pages/              # Page-level components (Home, Register, Match)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layout/             # Layout wrappers
│   │   └── App.jsx             # Main Router definitions
│   ├── vite.config.js          # Vite build configuration
│   ├── tailwind.config.js      # Utility styling configuration
│   └── package.json            # Client dependencies
│
├── server/                     # Express Backend (Future Implementation)
│   ├── config/                 # DB connection, environment config
│   ├── controllers/            # Route handler logic / matching algorithms
│   ├── models/                 # Mongoose schemas (User, Job, App)
│   ├── routes/                 # Express route definitions
│   ├── middleware/             # Auth, error handling, validation
│   └── package.json            # Server dependencies
│
├── README.md                   # Platform documentation
└── .gitignore                  # Git tracking rules
```

---

##  API Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user (Candidate/Employer) | Public |
| `POST` | `/api/auth/login` | Login & receive JWT | Public |
| `GET`  | `/api/auth/profile` | Get current authenticated user profile | Private |
| `GET`  | `/api/jobs` | List active jobs (with filters/search) | Public |
| `POST` | `/api/jobs` | Create a new job posting | Employer |
| `GET`  | `/api/jobs/match` | Get algorithmic job/candidate matches | Private|
| `POST` | `/api/applications` | Apply for a specific job | Candidate |
| `GET`  | `/api/dashboard/stats`| Get metrics for the user dashboard | Private |

---

##  Setup & Installation

> **Prerequisites:** Node.js 18+, npm 9+, MongoDB Atlas account

```bash
# Clone the repo
git clone https://github.com/abeyakilesh/WorkBridge.git
cd WorkBridge

# Install frontend dependencies (bridgework-app)
cd bridgework-app && npm install

# Start the frontend development server
npm run dev
```

*(Once the backend server is added)*
```bash
# Install backend dependencies
cd ../server && npm install

# Start the backend development server
npm run dev
```

---

## Environment Variables

**Frontend (`bridgework-app/.env`):**
```text
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend (`server/.env`):**
```text
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bridgework
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
NODE_ENV=development
```

---

## Branching & Commit Strategy

- `main`: Stable production-ready code.
- `dev`: Primary development branch.
- **Feature Branches**: Iterative branches formatted as `feature/add-matching-algo` or `fix/auth-bug`.
- **Commits**: Follow standard conventional commits format (e.g., `feat: user login`, `fix: header padding`, `docs: update readme`). 

---

## Deployment

- **Frontend**: Automatically deployed via **Vercel** configured to watch the `main` branch. Environment variables populated in the Vercel Dashboard.
- **Backend**: Containerized/Hosted on **Render**. Requires MongoDB Atlas IP configuration and corresponding `.env` setup.

---
*Built to modern standards for BridgeWork*
