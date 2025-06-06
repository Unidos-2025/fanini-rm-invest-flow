
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InvestorDashboard } from "@/components/dashboard/InvestorDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { SuperAdminDashboard } from "@/components/dashboard/SuperAdminDashboard";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'admin' | 'super_admin';
  investedAmount: number;
  availableProfit: number;
  totalProfit: number;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Simulate user login for demo
  const handleLogin = (email: string, password: string) => {
    // Demo users
    const demoUsers: User[] = [
      {
        id: '1',
        email: 'investor@test.com',
        name: 'João Silva',
        role: 'investor',
        investedAmount: 50000,
        availableProfit: 2580.50,
        totalProfit: 12430.75
      },
      {
        id: '2',
        email: 'admin@test.com',
        name: 'Admin User',
        role: 'admin',
        investedAmount: 0,
        availableProfit: 0,
        totalProfit: 0
      },
      {
        id: '3',
        email: 'superadmin@test.com',
        name: 'Super Admin',
        role: 'super_admin',
        investedAmount: 0,
        availableProfit: 0,
        totalProfit: 0
      }
    ];

    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setCurrentView('dashboard');
    }
  };

  const handleRegister = (email: string, password: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'investor',
      investedAmount: 0,
      availableProfit: 0,
      totalProfit: 0
    };
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  if (currentView === 'dashboard' && user) {
    const DashboardComponent = user.role === 'super_admin' ? SuperAdminDashboard 
                               : user.role === 'admin' ? AdminDashboard 
                               : InvestorDashboard;
    
    return (
      <DashboardLayout user={user} onLogout={handleLogout}>
        <DashboardComponent user={user} />
      </DashboardLayout>
    );
  }

  if (currentView === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">União Fanini RM</h1>
            <p className="text-emerald-200">Acesse sua conta de investimentos</p>
          </div>
          
          <Card className="glass-effect border-emerald-500/20">
            <CardHeader>
              <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Cadastrar</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {authMode === 'login' ? (
                <LoginForm onLogin={handleLogin} />
              ) : (
                <RegisterForm onRegister={handleRegister} />
              )}
              
              <div className="mt-4 text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentView('landing')}
                  className="text-emerald-200 hover:text-white"
                >
                  ← Voltar ao início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
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
                onClick={() => setCurrentView('auth')}
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

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Funcionalidades Premium</h2>
          <p className="text-emerald-200 text-lg">Tudo que você precisa para gerenciar seus investimentos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
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

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6">
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

      {/* Demo Login Info */}
      <div className="container mx-auto px-4 pb-20">
        <Card className="financial-card max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center">Demonstração do Sistema</CardTitle>
            <CardDescription className="text-emerald-200 text-center">
              Use essas credenciais para testar diferentes níveis de acesso:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-white/5 rounded-lg border border-emerald-500/20">
                <p className="text-emerald-400 font-semibold">Investidor</p>
                <p className="text-emerald-200">investor@test.com</p>
                <p className="text-emerald-200">senha: qualquer</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-emerald-500/20">
                <p className="text-yellow-400 font-semibold">Admin</p>
                <p className="text-emerald-200">admin@test.com</p>
                <p className="text-emerald-200">senha: qualquer</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-emerald-500/20">
                <p className="text-red-400 font-semibold">Super Admin</p>
                <p className="text-emerald-200">superadmin@test.com</p>
                <p className="text-emerald-200">senha: qualquer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
