
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  SidebarProvider, 
  SidebarTrigger, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { InvestmentPage } from "@/components/pages/InvestmentPage";
import { StatementPage } from "@/components/pages/StatementPage";
import { WithdrawPage } from "@/components/pages/WithdrawPage";
import { SupportPage } from "@/components/pages/SupportPage";
import { Wallet } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'admin' | 'super_admin';
  investedAmount: number;
  availableProfit: number;
  totalProfit: number;
}

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
  onLogout: () => void;
}

export const DashboardLayout = ({ children, user, onLogout }: DashboardLayoutProps) => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'investimentos', label: 'Investimentos', icon: '💰' },
      { id: 'extrato', label: 'Extrato', icon: '📋' },
      { id: 'saques', label: 'Saques', icon: '💸' },
      { id: 'suporte', label: 'Suporte', icon: '💬' },
    ];

    if (user.role === 'admin' || user.role === 'super_admin') {
      baseItems.push(
        { id: 'admin-users', label: 'Usuários', icon: '👥' },
        { id: 'admin-config', label: 'Configurações', icon: '⚙️' },
        { id: 'admin-reports', label: 'Relatórios', icon: '📈' }
      );
    }

    if (user.role === 'super_admin') {
      baseItems.push(
        { id: 'super-admin', label: 'Super Admin', icon: '🔧' },
        { id: 'system-config', label: 'Sistema', icon: '🖥️' }
      );
    }

    return baseItems;
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'investimentos':
        return <InvestmentPage user={user} />;
      case 'extrato':
        return <StatementPage user={user} />;
      case 'saques':
        return <WithdrawPage user={user} />;
      case 'suporte':
        return <SupportPage user={user} />;
      case 'dashboard':
      default:
        return children;
    }
  };

  const AppSidebar = () => (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 bg-gradient-financial rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">UF</span>
          </div>
          <div>
            <h2 className="font-bold text-sm text-white">União Fanini RM</h2>
            <p className="text-xs text-emerald-200">{user.name}</p>
          </div>
        </div>
        
        {/* Saldo no menu */}
        <div className="px-4 py-2 border-t border-emerald-500/20">
          <div className="flex items-center gap-2 p-2 bg-emerald-500/10 rounded-lg">
            <Wallet className="h-4 w-4 text-emerald-400" />
            <div>
              <p className="text-xs text-emerald-200">Saldo Disponível</p>
              <p className="text-sm font-bold text-white">
                R$ {user.availableProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-emerald-200">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setCurrentPage(item.id)}
                    isActive={currentPage === item.id}
                    className="text-white hover:text-emerald-300 hover:bg-emerald-500/10"
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <span className="mr-2">🚪</span>
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  const getRoleDisplay = () => {
    switch (user.role) {
      case 'super_admin': return { label: 'Super Admin', color: 'text-red-400' };
      case 'admin': return { label: 'Administrador', color: 'text-yellow-400' };
      default: return { label: 'Investidor', color: 'text-green-400' };
    }
  };

  const roleDisplay = getRoleDisplay();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-900">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-slate-800 border-b border-emerald-500/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-white hover:text-emerald-300" />
                <div>
                  <h1 className="text-xl font-bold text-white">União Fanini RM</h1>
                  <p className="text-sm text-emerald-200">Sistema de Investimentos B3</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-white font-medium">{user.name}</p>
                  <p className={`text-xs ${roleDisplay.color} font-semibold`}>
                    {roleDisplay.label}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-financial rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-6 overflow-auto bg-slate-900">
            {renderPageContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
