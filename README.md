# SkinSight AI

A full-stack AI-powered skin lesion analysis platform. Upload a dermoscopic image, select a model, and get instant predictions with visual Grad-CAM explanations.

---

## 🚀 Features

- **AI Models:** EfficientNet B0 & ResNet18 for skin lesion classification
- **Visual Explanations:** Grad-CAM heatmaps for interpretability
- **Modern UI:** React + Tailwind CSS frontend
- **FastAPI Backend:** Robust, production-ready API
- **Easy Deployment:** Vercel (frontend) & Render (backend) ready

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite, TypeScript, Tailwind CSS)
- **Backend:** FastAPI, PyTorch, TorchVision
- **Model Serving:** Pretrained PyTorch models

---

## 📁 Folder Structure

```
MedScanAI/
├── backend/
│   └── app/
│       ├── main.py           # FastAPI entrypoint
│       ├── models_loader.py  # Model loading logic
│       ├── schemas.py        # Pydantic schemas
│       ├── utils/            # GradCAM, prediction utils
│       └── model/            # Place model.pth & resnet18_skin_cancer.pth here
├── frontend/
│   ├── src/                  # React app source
│   └── ...                   # Vite, Tailwind, config files
└── README.md
```

---

## ⚡ Quickstart

### 1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/MedScanAI.git
cd MedScanAI
```

### 2. **Backend Setup**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

#### **Model Files**

- Download `model.pth` and `resnet18_skin_cancer.pth` and place them in `backend/app/model/`.
- (These files are large and not included in the repo.)

#### **Run Backend Locally**

```bash
uvicorn app.main:app --reload
# API docs: http://localhost:8000/docs
```

### 3. **Frontend Setup**

```bash
cd ../frontend
npm install
npm run dev
# App: http://localhost:5173 (or http://localhost:8080)
```

#### **Configure API URL**

- By default, the frontend expects the backend at `http://localhost:8000`.
- For production, set the API URL in an environment variable (e.g., `.env` or Vercel dashboard):
  ```env
  VITE_API_URL=https://your-backend.onrender.com
  ```
- Update API calls in `ModelSelector.tsx` to use this variable.

---

## 🌍 Deployment

### **Frontend (Vercel)**

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com/), import your repo, and select the `frontend` folder.
3. Set `VITE_API_URL` in Vercel dashboard to your backend URL.
4. Deploy!

### **Backend (Render)**

1. Push your code to GitHub.
2. Go to [render.com](https://render.com/), create a new Web Service, and connect your repo.
3. Set build command: `pip install -r backend/requirements.txt`
4. Set start command: `uvicorn backend.app.main:app --host 0.0.0.0 --port 10000`
5. Make sure model files are in `backend/app/model/`.
6. Set CORS in `main.py` to allow your Vercel domain.
7. Deploy!

---

## 🧑‍💻 Developer Notes

- **CORS:** Update `allow_origins` in FastAPI to your frontend domain for production.
- **Model Files:** Not tracked in git. Download and place manually.
- **Troubleshooting:**
  - 404 or 500 errors: Check model file paths and API URLs.
  - CORS errors: Ensure backend allows your frontend domain.
  - Large file upload issues: Adjust FastAPI and Nginx settings if needed.
- **API Docs:** FastAPI auto-generates docs at `/docs`.

---

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first to discuss what you’d like to change.

---

## 📫 Contact

- **Author:** Shreyash
- **Email:** shreyashvishwakarma0000@gmail.com
- **Project:** [GitHub Repo](https://github.com/yourusername/MedScanAI)

---

**Enjoy building with MedScanAI!**
