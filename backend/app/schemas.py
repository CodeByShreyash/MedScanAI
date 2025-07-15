from pydantic import BaseModel
from typing import Dict

class PredictionResponse(BaseModel):
    model: str
    predicted_class: str
    confidence: float
    probabilities: Dict[str, float]
    gradcam_png: str  # base64-encoded PNG image
