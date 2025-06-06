
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { StatsSection } from "./StatsSection";
import { DemoSection } from "./DemoSection";

interface LandingPageProps {
  onAccessPlatform: () => void;
}

export const LandingPage = ({ onAccessPlatform }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <HeroSection onAccessPlatform={onAccessPlatform} />
      <FeaturesSection />
      <StatsSection />
      <DemoSection />
    </div>
  );
};
