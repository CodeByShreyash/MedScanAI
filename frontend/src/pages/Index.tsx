import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageUploader from "@/components/ImageUploader";
import ModelSelector from "@/components/ModelSelector";
import PredictionResults from "@/components/PredictionResults";
import ModelInfo from "@/components/ModelInfo";
import Footer from "@/components/Footer";

interface PredictionData {
  prediction: string;
  confidence: number;
  confidenceBreakdown: Array<{
    class: string;
    confidence: number;
  }>;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionData | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    // Clear previous results when new image is selected
    setPredictionResult(null);
  };

  const handlePredict = (model: string) => {
    // Simulate AI prediction with realistic data
    const mockResults: PredictionData[] = [
      {
        prediction: "Benign Lesion",
        confidence: 0.937,
        confidenceBreakdown: [
          { class: "Benign", confidence: 0.937 },
          { class: "Melanoma", confidence: 0.045 },
          { class: "Basal Cell Carcinoma", confidence: 0.012 },
          { class: "Squamous Cell Carcinoma", confidence: 0.006 }
        ]
      },
      {
        prediction: "Melanoma",
        confidence: 0.823,
        confidenceBreakdown: [
          { class: "Melanoma", confidence: 0.823 },
          { class: "Benign", confidence: 0.134 },
          { class: "Basal Cell Carcinoma", confidence: 0.031 },
          { class: "Squamous Cell Carcinoma", confidence: 0.012 }
        ]
      }
    ];
    
    // Randomly select a result for demo
    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    setPredictionResult(result);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <Hero />
      
      {/* Main Prediction Interface */}
      <section id="predictor" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              AI-Powered Skin Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a dermoscopic image to get instant analysis with visual explanations
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Upload & Controls */}
            <div className="space-y-6">
              <ImageUploader onImageSelect={handleImageSelect} />
              <ModelSelector 
                selectedFile={selectedFile} 
                onPredict={handlePredict} 
              />
            </div>
            
            {/* Right Column - Results */}
            <div>
              <PredictionResults prediction={predictionResult} />
            </div>
          </div>
        </div>
      </section>

      <ModelInfo />
      <Footer />
    </div>
  );
};

export default Index;
