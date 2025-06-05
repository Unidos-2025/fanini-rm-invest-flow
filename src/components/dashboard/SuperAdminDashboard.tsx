
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface SuperAdminDashboardProps {
  user: User;
}

export const SuperAdminDashboard = ({ user }: SuperAdminDashboardProps) => {
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('admin');
  const [apiKey, setApiKey] = useState('');

  const admins = [
    { id: '1', name: 'Admin Principal', email: 'admin@test.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Super Admin', email: 'superadmin@test.com', role: 'super_admin', status: 'active' },
  ];

  const systemLogs = [
    { id: '1', action: 'User Login', user: 'João Silva', timestamp: '2024-01-15 14:30:22', status: 'success' },
    { id: '2', action: 'Withdrawal Request', user: 'Maria Santos', timestamp: '2024-01-15 14:25:10', status: 'pending' },
    { id: '3', action: 'System Backup', user: 'Admin', timestamp: '2024-01-15 12:00:00', status: 'success' },
    { id: '4', action: 'Configuration Update', user: 'Super Admin', timestamp: '2024-01-15 11:45:33', status: 'success' },
  ];

  const securityMetrics = {
    activeUsers: 28,
    failedLogins: 2,
    suspiciousActivity: 0,
    lastBackup: '2024-01-15 12:00:00'
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Usuários Ativos</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-400">
              {securityMetrics.activeUsers}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Logins Falharam</CardDescription>
            <CardTitle className="text-2xl font-bold text-yellow-400">
              {securityMetrics.failedLogins}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Atividade Suspeita</CardDescription>
            <CardTitle className="text-2xl font-bold text-red-400">
              {securityMetrics.suspiciousActivity}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-200">Status do Sistema</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-400">
              Operacional
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Admin Management */}
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white">Gerenciar Administradores</CardTitle>
            <CardDescription className="text-blue-200">
              Adicione ou remova administradores do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="adminEmail" className="text-white">Email do Novo Admin</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="admin@exemplo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminRole" className="text-white">Nível de Acesso</Label>
                <Select value={newAdminRole} onValueChange={setNewAdminRole}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="super_admin">Super Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="financial-button-primary w-full">
                Adicionar Administrador
              </Button>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h4 className="text-white font-medium mb-3">Administradores Atuais</h4>
              <div className="space-y-2">
                {admins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{admin.name}</p>
                      <p className="text-blue-200 text-sm">{admin.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        admin.role === 'super_admin' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                      {admin.role !== 'super_admin' && (
                        <Button size="sm" variant="destructive">
                          Remover
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white">Configurações de API</CardTitle>
            <CardDescription className="text-blue-200">
              Configure integrações e chaves de API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="interApiKey" className="text-white">Chave API Banco Inter</Label>
              <Input
                id="interApiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="••••••••••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Contatos WhatsApp Business</Label>
              <div className="space-y-2">
                <Input
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="+55 11 99999-0001"
                />
                <Input
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="+55 11 99999-0002"
                />
                <Input
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="+55 11 99999-0003"
                />
              </div>
            </div>

            <Button className="financial-button-primary w-full">
              Salvar Configurações de API
            </Button>

            <div className="border-t border-white/10 pt-4">
              <h4 className="text-white font-medium mb-2">Status das Integrações</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Banco Inter API</span>
                  <span className="text-green-400 text-sm">✓ Conectado</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">WhatsApp Business</span>
                  <span className="text-green-400 text-sm">✓ Ativo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Sistema de Backup</span>
                  <span className="text-green-400 text-sm">✓ Funcionando</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white">Logs do Sistema</CardTitle>
          <CardDescription className="text-blue-200">
            Acompanhe todas as atividades do sistema em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    log.status === 'success' ? 'bg-green-400' :
                    log.status === 'pending' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`} />
                  <div>
                    <p className="text-white font-medium">{log.action}</p>
                    <p className="text-blue-200 text-sm">por {log.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-sm">{log.timestamp}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    log.status === 'success' ? 'bg-green-500/20 text-green-300' :
                    log.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Actions */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white text-lg">Backup Completo</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="financial-button-primary w-full">
              Backup Agora
            </Button>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white text-lg">Manutenção</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="financial-button-danger w-full">
              Modo Manutenção
            </Button>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white text-lg">Logs de Auditoria</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="financial-button-primary w-full">
              Exportar Logs
            </Button>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white text-lg">Reset Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="financial-button-danger w-full">
              Reset Completo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
