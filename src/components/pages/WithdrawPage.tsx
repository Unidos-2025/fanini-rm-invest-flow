
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, Clock, CreditCard, AlertCircle } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'admin' | 'super_admin';
  investedAmount: number;
  availableProfit: number;
  totalProfit: number;
}

interface WithdrawPageProps {
  user: User;
}

export const WithdrawPage = ({ user }: WithdrawPageProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawType, setWithdrawType] = useState('');

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount && amount > 0 && withdrawType) {
      // TODO: Implement withdrawal logic
      console.log('Withdrawing:', amount, 'Type:', withdrawType);
      setWithdrawAmount('');
      setWithdrawType('');
    }
  };

  const pendingWithdrawals = [
    {
      id: 1,
      amount: 2000.00,
      type: 'Lucro',
      date: '13/01/2024',
      status: 'processing',
      estimatedDate: '15/01/2024'
    },
    {
      id: 2,
      amount: 1500.00,
      type: 'Lucro',
      date: '10/01/2024',
      status: 'pending',
      estimatedDate: '12/01/2024'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-500/20 text-blue-400">Processando</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400">Pendente</Badge>;
      case 'completed':
        return <Badge className="bg-emerald-500/20 text-emerald-400">Concluído</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">Desconhecido</Badge>;
    }
  };

  const withdrawalFee = 3; // 3% fee

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ArrowDown className="h-8 w-8 text-cyan-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Saques</h1>
          <p className="text-emerald-200">Solicite o saque dos seus lucros ou investimentos</p>
        </div>
      </div>

      {/* Available Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">Lucro Disponível</CardDescription>
            <CardTitle className="text-2xl font-bold text-emerald-400">
              R$ {user.availableProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">Valor Investido</CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              R$ {user.investedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">Taxa de Saque</CardDescription>
            <CardTitle className="text-2xl font-bold text-red-400">
              {withdrawalFee}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* New Withdrawal Request */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-cyan-400" />
            Solicitar Saque
          </CardTitle>
          <CardDescription className="text-emerald-200">
            Preencha as informações para solicitar um saque
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="withdrawType" className="text-white">Tipo de Saque</Label>
              <Select value={withdrawType} onValueChange={setWithdrawType}>
                <SelectTrigger className="bg-slate-800/50 border-emerald-500/30 text-white">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-emerald-500/30">
                  <SelectItem value="profit" className="text-white hover:bg-emerald-500/10">
                    Saque de Lucros
                  </SelectItem>
                  <SelectItem value="root" className="text-white hover:bg-emerald-500/10">
                    Saque da Raiz (Investimento)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdrawAmount" className="text-white">Valor do Saque</Label>
              <Input
                id="withdrawAmount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-slate-800/50 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                placeholder="0,00"
                max={withdrawType === 'profit' ? user.availableProfit : user.investedAmount}
              />
            </div>
          </div>

          {withdrawAmount && withdrawType && (
            <div className="bg-slate-800/30 rounded-lg p-4 border border-emerald-500/20">
              <h4 className="text-white font-semibold mb-2">Resumo do Saque</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-200">Valor solicitado:</span>
                  <span className="text-white">R$ {parseFloat(withdrawAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-200">Taxa ({withdrawalFee}%):</span>
                  <span className="text-red-400">- R$ {(parseFloat(withdrawAmount) * withdrawalFee / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-emerald-500/20 pt-1">
                  <span className="text-white">Valor líquido:</span>
                  <span className="text-emerald-400">R$ {(parseFloat(withdrawAmount) * (100 - withdrawalFee) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-amber-400 font-semibold">Importante:</p>
              <p className="text-amber-200">
                {withdrawType === 'root' 
                  ? 'Saques da raiz são processados em até 2 dias úteis. Após o saque da raiz, sua conta será encerrada.'
                  : 'Saques de lucro são processados em até 24 horas durante dias úteis.'
                }
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleWithdraw}
            className="financial-button-primary w-full"
            disabled={!withdrawAmount || !withdrawType || parseFloat(withdrawAmount) <= 0}
          >
            Solicitar Saque
          </Button>
        </CardContent>
      </Card>

      {/* Pending Withdrawals */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-400" />
            Saques Pendentes
          </CardTitle>
          <CardDescription className="text-emerald-200">
            Acompanhe o status dos seus saques
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingWithdrawals.length > 0 ? (
            <div className="space-y-4">
              {pendingWithdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <ArrowDown className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        R$ {withdrawal.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-emerald-200 text-sm">
                        {withdrawal.type} • Solicitado em {withdrawal.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(withdrawal.status)}
                    <p className="text-emerald-200 text-sm mt-1">
                      Previsão: {withdrawal.estimatedDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-emerald-400 mx-auto mb-4 opacity-50" />
              <p className="text-emerald-200">Nenhum saque pendente</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
