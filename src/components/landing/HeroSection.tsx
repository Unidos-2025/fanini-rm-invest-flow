
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onAccessPlatform: () => void;
}

export const HeroSection = ({ onAccessPlatform }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10" />
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center animate-fade-in">
          <h1 className="hero-title mb-6">
            União Fanini RM
          </h1>
          <p className="text-xl text-emerald-200 mb-8 max-w-2xl mx-auto">
            Sistema avançado de distribuição de valores de operações financeiras na B3. 
            Invista com segurança e acompanhe seus rendimentos em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onAccessPlatform}
              className="financial-button-primary text-lg px-8 py-4"
            >
              Acessar Plataforma
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 border-emerald-500/30 text-white hover:bg-emerald-500/20 text-lg px-8 py-4"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
