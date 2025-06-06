
import { useState } from "react";
import { AuthPage } from "@/components/auth/AuthPage";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InvestorDashboard } from "@/components/dashboard/InvestorDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { SuperAdminDashboard } from "@/components/dashboard/SuperAdminDashboard";
import { LandingPage } from "@/components/landing/LandingPage";

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
      <AuthPage
        authMode={authMode}
        setAuthMode={setAuthMode}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onBackToLanding={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <LandingPage onAccessPlatform={() => setCurrentView('auth')} />
  );
};

export default Index;
