import { useState } from "react";
import { Cpu, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ModelOption {
  id: string;
  name: string;
  accuracy: string;
  description: string;
  recommended?: boolean;
}

const models: ModelOption[] = [
  {
    id: "efficientnet-b0",
    name: "EfficientNet B0",
    accuracy: "89.2%",
    description: "Balanced accuracy and speed",
    recommended: true
  },
  {
    id: "resnet50",
    name: "ResNet-50",
    accuracy: "87.8%",
    description: "Robust feature extraction"
  },
  {
    id: "mobilenet-v3",
    name: "MobileNet V3",
    accuracy: "85.1%",
    description: "Optimized for fast inference"
  }
];

const ModelSelector = ({ 
  selectedFile, 
  onPredict 
}: { 
  selectedFile: File | null; 
  onPredict: (model: string) => void; 
}) => {
  const [selectedModel, setSelectedModel] = useState("efficientnet-b0");
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    
    // Simulate prediction delay
    setTimeout(() => {
      onPredict(selectedModel);
      setIsLoading(false);
    }, 2000);
  };

  const selectedModelInfo = models.find(m => m.id === selectedModel);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Model Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Select AI Model
          </label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center space-x-2">
                    <span>{model.name}</span>
                    {model.recommended && (
                      <Badge variant="secondary" className="text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Model Info */}
        {selectedModelInfo && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">{selectedModelInfo.name}</h4>
              <Badge variant="outline">{selectedModelInfo.accuracy}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedModelInfo.description}
            </p>
          </div>
        )}

        {/* Predict Button */}
        <Button
          variant="medical"
          size="lg"
          className="w-full"
          onClick={handlePredict}
          disabled={!selectedFile || isLoading}
        >
          <Cpu className="w-5 h-5 mr-2" />
          {isLoading ? "Analyzing..." : "Predict Diagnosis"}
        </Button>

        {!selectedFile && (
          <p className="text-xs text-muted-foreground text-center">
            Upload an image first to start prediction
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelSelector;