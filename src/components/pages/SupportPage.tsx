
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, Clock, Send } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'admin' | 'super_admin';
  investedAmount: number;
  availableProfit: number;
  totalProfit: number;
}

interface SupportPageProps {
  user: User;
}

export const SupportPage = ({ user }: SupportPageProps) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (subject && message && category) {
      // TODO: Implement support ticket creation
      console.log('Creating support ticket:', { subject, message, category });
      setSubject('');
      setMessage('');
      setCategory('');
    }
  };

  const supportTickets = [
    {
      id: 1,
      subject: "Dúvida sobre rendimentos",
      category: "Investimentos",
      status: "open",
      date: "15/01/2024",
      lastUpdate: "15/01/2024 14:30"
    },
    {
      id: 2,
      subject: "Problema no saque",
      category: "Financeiro",
      status: "in_progress",
      date: "12/01/2024",
      lastUpdate: "13/01/2024 09:15"
    },
    {
      id: 3,
      subject: "Alteração de dados cadastrais",
      category: "Conta",
      status: "resolved",
      date: "08/01/2024",
      lastUpdate: "09/01/2024 16:45"
    }
  ];

  const faqItems = [
    {
      question: "Como funcionam os rendimentos?",
      answer: "Os rendimentos são calculados diariamente com base no valor investido e creditados automaticamente na sua conta."
    },
    {
      question: "Qual o prazo para saques?",
      answer: "Saques de lucro são processados em até 24 horas. Saques da raiz podem levar até 2 dias úteis."
    },
    {
      question: "Posso reinvestir meus lucros?",
      answer: "Sim, você pode reinvestir seus lucros a qualquer momento através da página de investimentos."
    },
    {
      question: "Como alterar meus dados?",
      answer: "Para alterar dados cadastrais, entre em contato com nosso suporte através de um ticket."
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500/20 text-blue-400">Aberto</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500/20 text-yellow-400">Em Andamento</Badge>;
      case 'resolved':
        return <Badge className="bg-emerald-500/20 text-emerald-400">Resolvido</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500/20 text-gray-400">Fechado</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-emerald-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Suporte</h1>
          <p className="text-emerald-200">Central de ajuda e atendimento ao cliente</p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="financial-card">
          <CardHeader className="text-center">
            <Phone className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <CardTitle className="text-white">Telefone</CardTitle>
            <CardDescription className="text-emerald-200">
              Atendimento de segunda a sexta
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-emerald-400 font-semibold">(11) 99999-9999</p>
            <p className="text-emerald-200 text-sm">08:00 às 18:00</p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="text-center">
            <Mail className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <CardTitle className="text-white">Email</CardTitle>
            <CardDescription className="text-emerald-200">
              Resposta em até 24 horas
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-emerald-400 font-semibold">suporte@uniaofanini.com</p>
            <p className="text-emerald-200 text-sm">Sempre disponível</p>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="text-center">
            <MessageSquare className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <CardTitle className="text-white">WhatsApp</CardTitle>
            <CardDescription className="text-emerald-200">
              Atendimento rápido
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-emerald-400 font-semibold">(11) 99999-9999</p>
            <p className="text-emerald-200 text-sm">08:00 às 22:00</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* New Ticket */}
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Send className="h-5 w-5 text-emerald-400" />
              Abrir Ticket
            </CardTitle>
            <CardDescription className="text-emerald-200">
              Descreva sua dúvida ou problema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Categoria</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800/50 border border-emerald-500/30 text-white rounded-md px-3 py-2"
              >
                <option value="">Selecione uma categoria</option>
                <option value="investimentos">Investimentos</option>
                <option value="financeiro">Financeiro</option>
                <option value="conta">Conta</option>
                <option value="tecnico">Técnico</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">Assunto</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-800/50 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                placeholder="Descreva brevemente o assunto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">Mensagem</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-slate-800/50 border-emerald-500/30 text-white placeholder:text-emerald-200/50 min-h-32"
                placeholder="Descreva detalhadamente sua dúvida ou problema..."
              />
            </div>

            <Button 
              onClick={handleSubmit}
              className="financial-button-primary w-full"
              disabled={!subject || !message || !category}
            >
              Enviar Ticket
            </Button>
          </CardContent>
        </Card>

        {/* My Tickets */}
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              Meus Tickets
            </CardTitle>
            <CardDescription className="text-emerald-200">
              Acompanhe o status dos seus chamados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 bg-slate-800/30 rounded-lg border border-emerald-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">{ticket.subject}</h4>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <p className="text-emerald-200 text-sm mb-2">Categoria: {ticket.category}</p>
                  <div className="flex justify-between text-xs text-emerald-200">
                    <span>Criado: {ticket.date}</span>
                    <span>Atualizado: {ticket.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white">Perguntas Frequentes</CardTitle>
          <CardDescription className="text-emerald-200">
            Encontre respostas para as dúvidas mais comuns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-emerald-500/20 last:border-b-0 pb-4 last:pb-0">
                <h4 className="text-white font-medium mb-2">{item.question}</h4>
                <p className="text-emerald-200 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
