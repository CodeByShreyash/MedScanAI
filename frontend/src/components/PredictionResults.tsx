import { useState } from "react";
import { CheckCircle, AlertTriangle, Info, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PredictionData {
  prediction: string;
  confidence: number;
  confidenceBreakdown: Array<{
    class: string;
    confidence: number;
  }>;
}

const PredictionResults = ({ prediction }: { prediction: PredictionData | null }) => {
  const [showHeatmap, setShowHeatmap] = useState(false);

  if (!prediction) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Upload an image and click predict to see results</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isHighConfidence = prediction.confidence > 0.8;
  const isBenign = prediction.prediction.toLowerCase().includes('benign');

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {isBenign ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-destructive" />
            )}
            <span>Prediction Result</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-2">
              {prediction.prediction}
            </h3>
            <Badge 
              variant={isHighConfidence ? "default" : "secondary"}
              className="text-lg px-4 py-2"
            >
              {(prediction.confidence * 100).toFixed(1)}% Confidence
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Confidence Level</p>
            <Progress 
              value={prediction.confidence * 100} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Confidence Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Class Probabilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {prediction.confidenceBreakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">
                  {item.class}
                </span>
                <span className="text-sm text-muted-foreground">
                  {(item.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={item.confidence * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Grad-CAM Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Visual Explanation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The model focused on the highlighted regions to make its prediction.
          </p>
          
          <div className="relative">
            <div className="w-full h-48 bg-gradient-subtle rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <Eye className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Grad-CAM Heatmap
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Visual explanation coming soon
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowHeatmap(!showHeatmap)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {showHeatmap ? "Hide" : "Show"} Attention Map
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResults;