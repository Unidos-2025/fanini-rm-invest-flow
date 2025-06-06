
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Funcionalidades Premium</h2>
        <p className="text-emerald-200 text-lg">Tudo que você precisa para gerenciar seus investimentos</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="financial-card floating-animation">
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-financial rounded-lg flex items-center justify-center mb-4">
              <ArrowUp className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-white">Reinvestimento Automático</CardTitle>
            <CardDescription className="text-emerald-200">
              Configure reinvestimentos automáticos e maximize seus rendimentos sem esforço
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="financial-card floating-animation" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center mb-4">
              <ArrowDown className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-white">Saques Inteligentes</CardTitle>
            <CardDescription className="text-emerald-200">
              Solicite saques de lucros instantâneos ou de valor investido com aprovação
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="financial-card floating-animation" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-white rounded" />
            </div>
            <CardTitle className="text-white">Painel Administrativo</CardTitle>
            <CardDescription className="text-emerald-200">
              Controle total com configurações dinâmicas e aprovações de transações
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
