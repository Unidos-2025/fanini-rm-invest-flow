
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCPF, validateCPF } from "@/utils/cpfUtils";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormProps {
  onRegister: (email: string, password: string, name: string) => void;
}

export const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { toast } = useToast();

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value);
    setCpf(formattedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Erro",
        description: "Nome completo é obrigatório",
        variant: "destructive",
      });
      return;
    }
    
    if (!email.trim()) {
      toast({
        title: "Erro",
        description: "Email é obrigatório",
        variant: "destructive",
      });
      return;
    }
    
    if (!cpf.trim()) {
      toast({
        title: "Erro",
        description: "CPF é obrigatório",
        variant: "destructive",
      });
      return;
    }
    
    if (!validateCPF(cpf)) {
      toast({
        title: "Erro",
        description: "CPF inválido",
        variant: "destructive",
      });
      return;
    }
    
    if (!password.trim()) {
      toast({
        title: "Erro",
        description: "Senha é obrigatória",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "Senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Erro",
        description: "Você deve aceitar os termos de uso",
        variant: "destructive",
      });
      return;
    }

    // Mensagem de alerta obrigatória
    toast({
      title: "Importante",
      description: "Recolhimento de impostos por conta exclusiva do investidor.",
      duration: 5000,
    });

    onRegister(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">Nome Completo *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="João Silva"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email *</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="seu@email.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cpf" className="text-white">CPF *</Label>
        <Input
          id="cpf"
          value={cpf}
          onChange={handleCpfChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="000.000.000-00"
          maxLength={14}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">Senha *</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="••••••••"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-white">Confirmar Senha *</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="••••••••"
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          className="border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
        />
        <Label htmlFor="terms" className="text-white text-sm">
          Aceito os termos de uso e política de privacidade *
        </Label>
      </div>
      
      <Button type="submit" className="financial-button-primary w-full">
        Cadastrar
      </Button>
    </form>
  );
};
