# 🧠 ApplyIQ — AI-Powered Job Application Tracker

> Apply Smarter. Track Better.

ApplyIQ is a full-stack AI-powered career assistant that helps you track job applications, analyze job descriptions, score your resume against ATS systems, identify skill gaps, and generate optimized resumes — all in one place.

---

## 🚀 Live Demo

| | URL |
|---|---|
| 🌐 **Frontend** | [https://applyiq-beryl.vercel.app](https://applyiq-beryl.vercel.app) | >>click here to run 
| ⚙️ **Backend API** | [https://applyiq-production.up.railway.app](https://applyiq-production.up.railway.app) |

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login/signup with email and password
- 📋 **Job Tracker** — Track all your job applications in one clean dashboard
- 🤖 **AI Analysis** — Paste a job description and get instant insights
- 📊 **ATS Score** — Know how well your resume passes ATS filters
- 💯 **Job Match Score** — See how strong you are for a specific role
- ❌ **Skill Gap Analysis** — Find out exactly what skills you're missing
- 📺 **YouTube Resources** — Get learning resources for missing skills
- 💡 **Resume Tips** — Get personalized resume improvement suggestions
- 📄 **LaTeX Resume Generator** — Auto-generate an optimized Overleaf resume
- 🎨 **Notion-style UI** — Clean, minimal, and aesthetic design

---

## 🛠️ Tech Stack

### Backend
- **Python** — Core language
- **Django** — Web framework
- **Django REST Framework** — REST API
- **SimpleJWT** — JWT Authentication
- **Groq API (Llama 3.3 70B)** — AI Analysis
- **PostgreSQL** — Production database
- **SQLite** — Development database

### Frontend
- **React.js** — UI library
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **Axios** — API calls
- **React Router** — Navigation

### DevOps
- **Docker** — Containerization
- **Railway** — Backend deployment
- **Vercel** — Frontend deployment
- **GitHub** — Version control

---

## 📁 Project Structure

```
applyiq/
├── backend/
│   ├── accounts/          ← Custom User Model, Auth
│   ├── jobs/              ← Job CRUD, AI Analysis
│   ├── backend/           ← Django settings
│   ├── Dockerfile         ← Docker config
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobList.jsx    ← Job cards + AI panel
│   │   │   ├── Login.jsx      ← Login page
│   │   │   └── Signup.jsx     ← Signup page
│   │   └── router/
│   │       └── AppRouter.jsx
│   └── Dockerfile         ← Docker config
│
└── docker-compose.yml     ← Run both together
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.12+
- Node.js 20+
- Git
- Docker (optional)

### Option 1 — Run with Docker (Recommended)

```bash
# Clone the repo
git clone https://github.com/b-karthikselvam/applyiq.git
cd applyiq

# Create .env file in backend folder
echo "GROQ_API_KEY=your-groq-api-key" > backend/.env

# Run both frontend and backend together
docker-compose up --build
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

---

### Option 2 — Run Manually

#### Backend Setup

```bash
cd applyiq/backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GROQ_API_KEY=your-groq-api-key" > .env

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver
```

#### Frontend Setup

```bash
cd applyiq/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

#### Access the app
- Frontend: `http://localhost:5173`
- Backend API: `http://127.0.0.1:8000/api/`
- Admin Panel: `http://127.0.0.1:8000/admin/`

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder:

```
GROQ_API_KEY=your-groq-api-key-here
```

Get your free Groq API key at: https://console.groq.com

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/accounts/signup/` | Register new user |
| POST | `/api/token/` | Login - get JWT tokens |
| POST | `/api/token/refresh/` | Refresh access token |
| GET | `/api/jobs/` | Get all jobs (authenticated) |
| POST | `/api/jobs/` | Add new job |
| PATCH | `/api/jobs/{id}/` | Update job status |
| DELETE | `/api/jobs/{id}/` | Delete job |
| POST | `/api/analyze/` | AI analysis of JD + Resume |

---

## 🤖 AI Analysis

Paste a job description and your resume to get:

```json
{
  "job_details": { "role": "...", "required_skills": [...] },
  "skill_analysis": {
    "matching_skills": [...],
    "lacking_skills": [
      {
        "skill": "TypeScript",
        "importance": "High",
        "youtube_channels": [{ "channel": "Fireship", "url": "..." }]
      }
    ]
  },
  "ats_score": 80,
  "job_match_score": 75,
  "resume_recommendations": [...],
  "overleaf_resume_code": "..."
}
```

---

## 🐳 Docker

```bash
# Build and run both containers
docker-compose up --build

# Stop containers
docker-compose down

# View running containers
docker ps
```

---

## 👨‍💻 Author

**Karthik Selvam B**
- GitHub: [@b-karthikselvam](https://github.com/b-karthikselvam)
- LinkedIn: [b-karthikselvam](https://linkedin.com/in/b-karthikselvam)

---

## 📄 License

MIT License — feel free to use this project!

---

*உ Built with passion — ApplyIQ* 🧠🚀