
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'admin' | 'super_admin';
  investedAmount: number;
  availableProfit: number;
  totalProfit: number;
}

interface AdminDashboardProps {
  user: User;
}

export const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [dailyYield, setDailyYield] = useState(2.5);
  const [bonusRate, setBonusRate] = useState(0.5);
  const [withdrawalFee, setWithdrawalFee] = useState(3);
  const [withdrawalDays, setWithdrawalDays] = useState(2);
  const [autoWithdrawEnabled, setAutoWithdrawEnabled] = useState(true);
  const [supportEnabled, setSupportEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  const pendingWithdrawals = [
    { id: '1', user: 'João Silva', amount: 5000, type: 'root', date: '2024-01-15' },
    { id: '2', user: 'Maria Santos', amount: 1500, type: 'root', date: '2024-01-14' },
  ];

  const systemStats = {
    totalUsers: 28,
    totalInvested: 2845000,
    totalProfits: 156780,
    pendingWithdrawals: 6500
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Total de Usuários</CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              {systemStats.totalUsers}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Total Investido</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-400">
              R$ {systemStats.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Lucros Gerados</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-400">
              R$ {systemStats.totalProfits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Saques Pendentes</CardDescription>
            <CardTitle className="text-2xl font-bold text-yellow-400">
              R$ {systemStats.pendingWithdrawals.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* System Configuration */}
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white">Configurações do Sistema</CardTitle>
            <CardDescription className="text-blue-200">
              Configure os parâmetros principais do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dailyYield" className="text-white">Rendimento Diário (%)</Label>
              <Input
                id="dailyYield"
                type="number"
                value={dailyYield}
                onChange={(e) => setDailyYield(parseFloat(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bonusRate" className="text-white">Taxa de Bônus (%)</Label>
              <Input
                id="bonusRate"
                type="number"
                value={bonusRate}
                onChange={(e) => setBonusRate(parseFloat(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdrawalFee" className="text-white">Taxa de Saque (%)</Label>
              <Input
                id="withdrawalFee"
                type="number"
                value={withdrawalFee}
                onChange={(e) => setWithdrawalFee(parseFloat(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdrawalDays" className="text-white">Dias para Saque Raiz</Label>
              <Input
                id="withdrawalDays"
                type="number"
                value={withdrawalDays}
                onChange={(e) => setWithdrawalDays(parseInt(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <Button className="financial-button-primary w-full">
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>

        {/* Feature Controls */}
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white">Controles de Funcionalidades</CardTitle>
            <CardDescription className="text-blue-200">
              Ative ou desative funcionalidades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoWithdraw" className="text-white">Saques Automáticos</Label>
                <p className="text-sm text-blue-200">Habilitar processamento automático de saques</p>
              </div>
              <Switch
                id="autoWithdraw"
                checked={autoWithdrawEnabled}
                onCheckedChange={setAutoWithdrawEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="support" className="text-white">Suporte por Chat</Label>
                <p className="text-sm text-blue-200">Sistema de tickets e chat de suporte</p>
              </div>
              <Switch
                id="support"
                checked={supportEnabled}
                onCheckedChange={setSupportEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="whatsapp" className="text-white">Suporte WhatsApp</Label>
                <p className="text-sm text-blue-200">Integração com WhatsApp Business</p>
              </div>
              <Switch
                id="whatsapp"
                checked={whatsappEnabled}
                onCheckedChange={setWhatsappEnabled}
              />
            </div>

            <div className="border-t border-white/10 pt-4">
              <Button className="financial-button-success w-full">
                Atualizar Configurações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Withdrawals */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white">Saques Pendentes de Aprovação</CardTitle>
          <CardDescription className="text-blue-200">
            Solicitações de saque que precisam de aprovação manual
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingWithdrawals.length === 0 ? (
            <p className="text-center text-blue-200 py-8">
              Nenhuma solicitação de saque pendente
            </p>
          ) : (
            <div className="space-y-4">
              {pendingWithdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{withdrawal.user}</p>
                    <p className="text-blue-200 text-sm">
                      Saque {withdrawal.type === 'root' ? 'de Raiz' : 'de Lucro'} - {withdrawal.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-yellow-400 font-bold">
                      R$ {withdrawal.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex gap-2">
                      <Button className="financial-button-success" size="sm">
                        Aprovar
                      </Button>
                      <Button className="financial-button-danger" size="sm">
                        Rejeitar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white text-lg">Distribuir Rendimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="financial-button-primary w-full">
              Processar Rendimentos Diários
            </Button>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white text-lg">Backup de Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="financial-button-primary w-full">
              Gerar Backup do Sistema
            </Button>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white text-lg">Relatório Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="financial-button-primary w-full">
              Exportar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
