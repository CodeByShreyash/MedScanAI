import { Brain, Github, ExternalLink, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4"> 
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">SkinSight AI</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Advanced AI-powered skin lesion analysis for educational and research purposes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Project
                </a>
              </li>
              <li>
                <a href="#model" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Model Info
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center space-x-1">
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center space-x-1">
                  <span>Hugging Face Model</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center space-x-1">
                  <span>ISIC Dataset</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:contact@skinsight.ai" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@skinsight.ai</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/60">
              © 2024 SkinSight AI. Built for educational and research purposes.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Made Shreyash using React & AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;