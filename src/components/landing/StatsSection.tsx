
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const StatsSection = () => {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <Card className="financial-card text-center">
          <CardHeader>
            <CardTitle className="financial-metric">2.5%</CardTitle>
            <CardDescription className="text-emerald-200">Rendimento Diário Médio</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="financial-card text-center">
          <CardHeader>
            <CardTitle className="financial-metric">R$ 2.8M</CardTitle>
            <CardDescription className="text-emerald-200">Volume Total Investido</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="financial-card text-center">
          <CardHeader>
            <CardTitle className="financial-metric">30</CardTitle>
            <CardDescription className="text-emerald-200">Investidores Ativos</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="financial-card text-center">
          <CardHeader>
            <CardTitle className="financial-metric">99.9%</CardTitle>
            <CardDescription className="text-emerald-200">Uptime da Plataforma</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
