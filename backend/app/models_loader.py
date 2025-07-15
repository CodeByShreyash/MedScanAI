import torch
import torch.nn as nn
from torchvision.models import efficientnet_b0, resnet18

MODEL_PATH_EFFNET = "model/model.pth"
MODEL_PATH_RESNET = "model/resnet18_skin_cancer.pth"

EFFICIENTNET_CLASSES = ['nv', 'mel', 'bkl', 'bcc', 'akiec', 'vasc', 'df']
RESNET18_CLASSES = ['benign', 'malignant', 'suspicious', 'other']

def load_efficientnet():
    model = efficientnet_b0(weights=None)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, len(EFFICIENTNET_CLASSES))
    model.load_state_dict(torch.load(MODEL_PATH_EFFNET, map_location='cpu'))
    model.eval()
    return model

def load_resnet18():
    model = resnet18(weights=None)
    model.fc = nn.Linear(model.fc.in_features, len(RESNET18_CLASSES))
    model.load_state_dict(torch.load(MODEL_PATH_RESNET, map_location='cpu'))
    model.eval()
    return model
