
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

interface AuthPageProps {
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, name: string) => void;
  onBackToLanding: () => void;
}

export const AuthPage = ({ 
  authMode, 
  setAuthMode, 
  onLogin, 
  onRegister, 
  onBackToLanding 
}: AuthPageProps) => {
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
              <LoginForm onLogin={onLogin} />
            ) : (
              <RegisterForm onRegister={onRegister} />
            )}
            
            <div className="mt-4 text-center">
              <Button 
                variant="ghost" 
                onClick={onBackToLanding}
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
};
