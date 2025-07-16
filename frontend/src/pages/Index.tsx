import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageUploader from "@/components/ImageUploader";
import ModelSelector from "@/components/ModelSelector";
import PredictionResults from "@/components/PredictionResults";
import ModelInfo from "@/components/ModelInfo";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictionResult, setPredictionResult] = useState<any | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setPredictionResult(null);
  };

  // handlePredict now receives backend response
  const handlePredict = (result: any) => {
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
              Upload a dermoscopic image to get instant analysis with visual
              explanations
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
