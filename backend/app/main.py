import io, base64
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import torch
from torchvision import transforms

from .models_loader import (
    load_efficientnet, load_resnet18,
    EFFICIENTNET_CLASSES, RESNET18_CLASSES
)
from .utils.gradcam import GradCAM, overlay_heatmap
from .schemas import PredictionResponse

app = FastAPI(title="SkinSight AI Backend")

# Enable CORS for frontend-backend connection during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- image pre-processing ----------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ---------- helper to run inference ----------
def run_inference(image: Image.Image, model_name: str):
    if model_name == "efficientnet":
        model      = load_efficientnet()
        class_list = EFFICIENTNET_CLASSES
        target_layer = model.features[-1]
    elif model_name == "resnet18":
        model      = load_resnet18()
        class_list = RESNET18_CLASSES
        target_layer = model.layer4[-1]
    else:
        raise ValueError("model_name must be 'efficientnet' or 'resnet18'")

    input_tensor = transform(image).unsqueeze(0)
    gradcam      = GradCAM(model, target_layer)
    heatmap      = gradcam.generate(input_tensor)

    with torch.no_grad():
        logits = model(input_tensor)
        probs  = torch.softmax(logits, dim=1).squeeze().numpy()

    pred_idx   = int(np.argmax(probs))
    pred_class = class_list[pred_idx]
    confidence = float(probs[pred_idx])

    # overlay heatmap
    img_np     = np.array(image.resize((224, 224)))
    cam_overlay= overlay_heatmap(heatmap, img_np)
    buf        = io.BytesIO()
    Image.fromarray(cam_overlay).save(buf, format="PNG")
    gradcam_b64= base64.b64encode(buf.getvalue()).decode()

    prob_dict  = {cls: float(p) for cls, p in zip(class_list, probs)}

    return PredictionResponse(
        model=model_name,
        predicted_class=pred_class,
        confidence=confidence,
        probabilities=prob_dict,
        gradcam_png=gradcam_b64
    )

# ---------- routes ----------
@app.post("/predict/{model_name}", response_model=PredictionResponse)
async def predict(model_name: str, file: UploadFile = File(...)):
    try:
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image")

    try:
        return run_inference(image, model_name.lower())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok"}
