import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import medicalHeroBg from "@/assets/medical-hero-bg.jpg";

const Hero = () => {
  const scrollToPredictor = () => {
    document.getElementById('predictor')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${medicalHeroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Instant Skin Lesion 
          <span className="text-accent block mt-2">Diagnosis with AI</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
          Upload a photo. Get prediction & visual explanation in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={scrollToPredictor}
            className="text-lg px-8 py-4"
          >
            Get Started
            <ArrowDown className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4 border-white/30 text-black hover:bg-black/10 hover:text-white"
          >
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;