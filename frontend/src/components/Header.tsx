import { Brain, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">SkinSight AI</h1>
            <p className="text-xs text-muted-foreground">Intelligent Diagnosis</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#model" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Model Info
          </a>
          <a href="#disclaimer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Disclaimer
          </a>
        </nav>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;