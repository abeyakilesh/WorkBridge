# BridgeWork

<br/>

The **BridgeWork** Platform enables organizations and professionals to connect seamlessly by providing tools to:

- **Create & manage job postings** with detailed requirements, company culture, and extensive employer contact info.
- **Automated ID & Aadhaar Verification**: Embedded Machine Learning for OCR. Candidates can upload a PDF/PNG or use a live camera to snap their ID. The system automatically extracts text (Name, Aadhaar Number, Contact, Address) and auto-fills the registration forms. 
- **Intelligent matching** that connects candidates to the right opportunities using comprehensive data points.
- **Interactive dashboards** for tracking applications, viewing candidate profiles, and managing postings.
- **Role-based access** to ensure Employers have management capabilities while Candidates have distinct interfaces.

---

## Tech Stack

### Why MERN + ML Extraction?

MERN provides a unified full-stack JavaScript environment, making the application easy to implement and scale. To simplify the architecture for document scanning, we integrate **Tesseract.js (Client-side ML)** or **Cloud Vision APIs**, completely skipping the need to build complex Python ML microservices, while vastly improving user onboarding speeds.

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite | Fast, modern, component-based UI |
| | React Webcam | Live picture capturing from user devices |
| | Tesseract.js (ML) | In-browser Machine Learning OCR to extract text from PDFs/PNGs |
| | Tailwind CSS v4 | Clean enterprise styling and responsiveness |
| | Axios | HTTP client for reliable API communication |
| **Backend** | Node.js + Express.js | REST API server handling business logic |
| | MongoDB Atlas + Mongoose | Cloud database + Object Data Modeling |
| | Cloudinary / AWS S3 | External storage for uploaded images and PDFs |
| | Google Cloud Vision (Opt) | Server-side Machine learning alternative for advanced text extraction |
| | JWT + bcrypt | Secure Authentication & password hashing |
| **DevOps** | Git + GitHub | Version control and collaborative development |
| | Vercel | Frontend deployment and hosting |
| | Render | Backend containerized deployment |

---

## System Architecture

```text
User (Webcam / File Upload)
  ↓
React Frontend (Tesseract.js ML OCR)
  ↓  → Auto-fills Aadhaar, Name, Phone, Address visually for the User
Express Backend (Render)
  ↓  → Authenticates & Validates Data
  ├──> Cloudinary / S3 (Stores Image/PDF Securely)
  └──> MongoDB Atlas (Saves User Data & Verification Status)
```

**Request Flow (Registration & Verification):**

1. User uploads an ID (Aadhaar/License) as PDF/PNG or takes a live photo via Web Camera during registration.
2. The ML algorithm (`Tesseract.js`) scans the image, extracts text, and instantly auto-fills the name, Aadhaar number, phone, and address into the form.
3. User verifies the auto-filled data and submits.
4. Axios sends the multipart form data (Image + JSON) to the Express Backend.
5. Express routes the image to Cloudinary for permanent secure storage and retrieves a URL.
6. Mongoose saves the new user securely in MongoDB with the verification URL and extracted contact details.

---

## Database Schema

### Core Entities

| Entity | Description |
| :--- | :--- |
| **User** | Platform users (Employer/Candidate). Contains Name, Aadhaar, Phone, Address, Verification Status (Verified/Pending), and ID Image URL. |
| **Job** | Active job opportunities. Includes job details and deep **Contact Info** (HR Email, Phone, WhatsApp) for easy outside communication. |
| **Application** | Candidate requests to apply for specific Jobs |
| **MatchProfile** | Aggregated data, skills, and past work photos for candidates |
| **Organization** | Company profiles grouping multiple Employer accounts |

### Key Relationships

```text
User —creates—> MatchProfile (contains work portfolio images)
User —has—> VerificationDocument (Aadhaar/ID)
Organization —creates—> Job (includes extended contact lists)
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
│   │   ├── components/         # Reusable UI (Navbar, CameraCapture, ImageUploader)
│   │   ├── pages/              # Application views (Home, Register, Dashboard)
│   │   ├── utils/              # Helper functions (e.g., Tesseract OCR functions)
│   │   └── App.jsx             # Main Router
│   ├── vite.config.js          
│   └── package.json            
│
├── server/                     # Express Backend
│   ├── config/                 # DB & Cloudinary connection
│   ├── controllers/            # Logic (Auth, Jobs, Matching, Uploads)
│   ├── models/                 # Mongoose schemas (User, Job, App)
│   ├── routes/                 # Express route definitions
│   ├── middleware/             # Auth, File Upload (Multer)
│   └── package.json            
│
└── README.md                   
```

---

##  API Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register user (Accepts auto-filled OCR data & photo URL) | Public |
| `POST` | `/api/auth/login` | Login & receive JWT | Public |
| `POST` | `/api/upload/document`| Upload ID/Work Photo to Cloudinary (returns URL) | Private |
| `POST` | `/api/upload/verify`  | Optional server-side Vision API fallback for text extraction | Private |
| `GET`  | `/api/jobs` | List active jobs (includes contact listing) | Public |
| `POST` | `/api/jobs` | Create a new job posting with contact info | Employer |
| `GET`  | `/api/jobs/match` | Get algorithmic job/candidate matches | Private|
| `POST` | `/api/applications` | Apply for a specific job | Candidate |

---

##  Setup & Installation

> **Prerequisites:** Node.js 18+, npm 9+, MongoDB Atlas, Cloudinary Account

```bash
# Clone the repo
git clone https://github.com/abeyakilesh/WorkBridge.git
cd WorkBridge

# Install frontend dependencies (bridgework-app)
cd bridgework-app
npm install

# (Optional ML dependency if adding Tesseract)
npm install tesseract.js react-webcam

# Start the frontend development server
npm run dev
```

*(Once the backend server is added)*
```bash
# Install backend dependencies
cd ../server
npm install multer cloudinary # For image uploads

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
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Branching & Commit Strategy

- `main`: Stable production-ready code.
- `dev`: Primary development branch.
- **Feature Branches**: Iterative branches formatted as `feature/add-ocr-scanning` or `fix/camera-upload`.
- **Commits**: Follow standard conventional commits format (e.g., `feat: add webcam to registration`, `docs: update readme`). 

---

## Deployment

- **Frontend**: Automatically deployed via **Vercel** configured to watch the `main` branch. 
- **Backend**: Containerized/Hosted on **Render**. Requires MongoDB and Cloudinary configured in environment variables.

---
*Built to modern standards for BridgeWork*
