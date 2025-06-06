
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const DemoSection = () => {
  return (
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
  );
};
