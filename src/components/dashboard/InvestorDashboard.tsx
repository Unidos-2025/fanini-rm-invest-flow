
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown } from "lucide-react";
import { InvestmentChart } from "@/components/charts/InvestmentChart";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'admin' | 'super_admin';
  investedAmount: number;
  availableProfit: number;
  totalProfit: number;
}

interface InvestorDashboardProps {
  user: User;
}

export const InvestorDashboard = ({ user }: InvestorDashboardProps) => {
  const [reinvestAmount, setReinvestAmount] = useState('');
  const [autoReinvest, setAutoReinvest] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const dailyYield = 2.5; // 2.5% daily yield
  const bonusRate = 0.5; // 0.5% bonus
  const withdrawalFee = 3; // 3% withdrawal fee

  const handleReinvest = () => {
    const amount = parseFloat(reinvestAmount);
    if (amount && amount <= user.availableProfit) {
      // TODO: Implement reinvestment logic
      console.log('Reinvesting:', amount);
      setReinvestAmount('');
    }
  };

  const handleAutoReinvest = () => {
    if (user.availableProfit > 0) {
      // TODO: Implement auto reinvestment
      console.log('Auto-reinvesting all profits:', user.availableProfit);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount && amount <= user.availableProfit) {
      // TODO: Implement withdrawal logic
      console.log('Withdrawing:', amount);
      setWithdrawAmount('');
    }
  };

  const handleWithdrawRoot = () => {
    // TODO: Implement root withdrawal request
    console.log('Requesting root withdrawal:', user.investedAmount);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Valor Investido</CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              R$ {user.investedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Lucro Disponível</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-400">
              R$ {user.availableProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Lucro Total</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-400">
              R$ {user.totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Rendimento Diário</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-400">
              {dailyYield}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Chart */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white">Evolução dos Investimentos</CardTitle>
          <CardDescription className="text-blue-200">
            Acompanhe o crescimento dos seus investimentos ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentChart />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Reinvestment */}
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ArrowUp className="h-5 w-5 text-green-400" />
              Reinvestir
            </CardTitle>
            <CardDescription className="text-blue-200">
              Reinvista seus lucros para aumentar seus rendimentos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reinvest" className="text-white">Valor para Reinvestir</Label>
              <Input
                id="reinvest"
                type="number"
                value={reinvestAmount}
                onChange={(e) => setReinvestAmount(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="0,00"
                max={user.availableProfit}
              />
            </div>
            
            <Button 
              onClick={handleReinvest}
              className="financial-button-success w-full"
              disabled={!reinvestAmount || parseFloat(reinvestAmount) > user.availableProfit}
            >
              Reinvestir Valor
            </Button>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-reinvest" className="text-white">
                  Reinvestimento Automático
                </Label>
                <Switch
                  id="auto-reinvest"
                  checked={autoReinvest}
                  onCheckedChange={setAutoReinvest}
                />
              </div>
              <p className="text-sm text-blue-200 mt-2">
                Reinveste automaticamente todos os lucros disponíveis
              </p>
              
              {autoReinvest && (
                <Button 
                  onClick={handleAutoReinvest}
                  className="financial-button-success w-full mt-4"
                  disabled={user.availableProfit <= 0}
                >
                  Reinvestir Tudo (R$ {user.availableProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal */}
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ArrowDown className="h-5 w-5 text-blue-400" />
              Sacar
            </CardTitle>
            <CardDescription className="text-blue-200">
              Solicite o saque dos seus lucros ou valor investido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw" className="text-white">Valor para Saque (Lucro)</Label>
              <Input
                id="withdraw"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="0,00"
                max={user.availableProfit}
              />
              <p className="text-xs text-blue-200">
                Taxa de saque: {withdrawalFee}%
              </p>
            </div>
            
            <Button 
              onClick={handleWithdraw}
              className="financial-button-primary w-full"
              disabled={!withdrawAmount || parseFloat(withdrawAmount) > user.availableProfit}
            >
              Sacar Lucro
            </Button>

            <div className="border-t border-white/10 pt-4">
              <Button 
                onClick={handleWithdrawRoot}
                className="financial-button-danger w-full"
                disabled={user.investedAmount <= 0}
              >
                Sacar Raiz (R$ {user.investedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
              </Button>
              <p className="text-xs text-blue-200 mt-2 text-center">
                Sua solicitação será processada em até 2 dias úteis
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white">Atividades Recentes</CardTitle>
          <CardDescription className="text-blue-200">
            Últimas movimentações da sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'profit', amount: 1250.50, date: '2024-01-15', description: 'Rendimento diário' },
              { type: 'reinvest', amount: 5000, date: '2024-01-14', description: 'Reinvestimento automático' },
              { type: 'withdraw', amount: 2000, date: '2024-01-13', description: 'Saque de lucros' },
              { type: 'profit', amount: 1225.75, date: '2024-01-12', description: 'Rendimento diário' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'profit' ? 'bg-green-500/20' :
                    activity.type === 'reinvest' ? 'bg-blue-500/20' :
                    'bg-red-500/20'
                  }`}>
                    {activity.type === 'profit' ? <ArrowUp className="h-4 w-4 text-green-400" /> :
                     activity.type === 'reinvest' ? <ArrowUp className="h-4 w-4 text-blue-400" /> :
                     <ArrowDown className="h-4 w-4 text-red-400" />}
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.description}</p>
                    <p className="text-blue-200 text-sm">{activity.date}</p>
                  </div>
                </div>
                <p className={`font-bold ${
                  activity.type === 'withdraw' ? 'text-red-400' : 'text-green-400'
                }`}>
                  {activity.type === 'withdraw' ? '-' : '+'}R$ {activity.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
