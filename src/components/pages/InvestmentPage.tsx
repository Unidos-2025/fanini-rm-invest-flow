
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, Clock, DollarSign } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'admin' | 'super_admin';
  investedAmount: number;
  availableProfit: number;
  totalProfit: number;
}

interface InvestmentPageProps {
  user: User;
}

export const InvestmentPage = ({ user }: InvestmentPageProps) => {
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleInvestment = () => {
    const amount = parseFloat(investmentAmount);
    if (amount && amount > 0) {
      // TODO: Implement investment logic
      console.log('Investing:', amount);
      setInvestmentAmount('');
    }
  };

  const investmentPlans = [
    {
      name: "Plano Básico",
      minAmount: 1000,
      dailyReturn: 2.5,
      duration: 30,
      badge: "Popular"
    },
    {
      name: "Plano Premium",
      minAmount: 5000,
      dailyReturn: 3.0,
      duration: 30,
      badge: "Recomendado"
    },
    {
      name: "Plano VIP",
      minAmount: 25000,
      dailyReturn: 3.5,
      duration: 30,
      badge: "Exclusivo"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Wallet className="h-8 w-8 text-emerald-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Investimentos</h1>
          <p className="text-emerald-200">Faça novos investimentos ou acompanhe os existentes</p>
        </div>
      </div>

      {/* Investment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">Total Investido</CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              R$ {user.investedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">Rendimento Mensal</CardDescription>
            <CardTitle className="text-2xl font-bold text-emerald-400">
              R$ {(user.investedAmount * 0.75).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">ROI Atual</CardDescription>
            <CardTitle className="text-2xl font-bold text-emerald-400">75%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Investment Plans */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white">Planos de Investimento</CardTitle>
          <CardDescription className="text-emerald-200">
            Escolha o plano que melhor se adequa ao seu perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {investmentPlans.map((plan, index) => (
              <Card key={index} className="financial-card border-emerald-500/30">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                      {plan.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-emerald-200">Valor Mínimo:</span>
                      <span className="text-white font-semibold">
                        R$ {plan.minAmount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-200">Retorno Diário:</span>
                      <span className="text-emerald-400 font-semibold">{plan.dailyReturn}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-200">Duração:</span>
                      <span className="text-white font-semibold">{plan.duration} dias</span>
                    </div>
                  </div>
                  <Button className="financial-button-primary w-full">
                    Investir Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Investment */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            Fazer Novo Investimento
          </CardTitle>
          <CardDescription className="text-emerald-200">
            Escolha o valor que deseja investir
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="investment" className="text-white">Valor do Investimento</Label>
            <Input
              id="investment"
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="bg-slate-800/50 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
              placeholder="1.000,00"
              min="1000"
            />
            <p className="text-xs text-emerald-200">Valor mínimo: R$ 1.000,00</p>
          </div>
          
          <Button 
            onClick={handleInvestment}
            className="financial-button-success w-full"
            disabled={!investmentAmount || parseFloat(investmentAmount) < 1000}
          >
            Confirmar Investimento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
