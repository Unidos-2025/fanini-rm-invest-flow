
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, FileText, Download, Calendar } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'admin' | 'super_admin';
  investedAmount: number;
  availableProfit: number;
  totalProfit: number;
}

interface StatementPageProps {
  user: User;
}

export const StatementPage = ({ user }: StatementPageProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const transactions = [
    {
      id: 1,
      date: '15/01/2024',
      type: 'profit',
      description: 'Rendimento diário',
      amount: 1250.50,
      status: 'completed'
    },
    {
      id: 2,
      date: '14/01/2024',
      type: 'reinvest',
      description: 'Reinvestimento automático',
      amount: 5000.00,
      status: 'completed'
    },
    {
      id: 3,
      date: '13/01/2024',
      type: 'withdraw',
      description: 'Saque de lucros',
      amount: 2000.00,
      status: 'completed'
    },
    {
      id: 4,
      date: '12/01/2024',
      type: 'investment',
      description: 'Novo investimento',
      amount: 10000.00,
      status: 'completed'
    },
    {
      id: 5,
      date: '11/01/2024',
      type: 'profit',
      description: 'Rendimento diário',
      amount: 1225.75,
      status: 'completed'
    },
    {
      id: 6,
      date: '10/01/2024',
      type: 'withdraw',
      description: 'Saque pendente',
      amount: 1500.00,
      status: 'pending'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'profit':
        return <ArrowUp className="h-4 w-4 text-emerald-400" />;
      case 'reinvest':
        return <ArrowUp className="h-4 w-4 text-cyan-400" />;
      case 'withdraw':
        return <ArrowDown className="h-4 w-4 text-red-400" />;
      case 'investment':
        return <ArrowUp className="h-4 w-4 text-blue-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'withdraw':
        return 'text-red-400';
      default:
        return 'text-emerald-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-500/20 text-emerald-400">Concluído</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400">Pendente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/20 text-red-400">Cancelado</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-emerald-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Extrato</h1>
          <p className="text-emerald-200">Histórico completo de movimentações</p>
        </div>
      </div>

      {/* Period Selector and Export */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          {['7', '30', '90', '365'].map((days) => (
            <Button
              key={days}
              variant={selectedPeriod === days ? "default" : "outline"}
              onClick={() => setSelectedPeriod(days)}
              className={selectedPeriod === days ? "financial-button-primary" : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"}
            >
              {days === '365' ? '1 Ano' : `${days} Dias`}
            </Button>
          ))}
        </div>
        
        <Button className="financial-button-primary">
          <Download className="h-4 w-4 mr-2" />
          Exportar PDF
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">Total de Entradas</CardDescription>
            <CardTitle className="text-xl font-bold text-emerald-400">
              R$ 17.476,25
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">Total de Saídas</CardDescription>
            <CardTitle className="text-xl font-bold text-red-400">
              R$ 3.500,00
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">Saldo Líquido</CardDescription>
            <CardTitle className="text-xl font-bold text-white">
              R$ 13.976,25
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="financial-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-200">Transações</CardDescription>
            <CardTitle className="text-xl font-bold text-white">
              {transactions.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-white">Histórico de Transações</CardTitle>
          <CardDescription className="text-emerald-200">
            Últimas {selectedPeriod} dias de movimentações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-emerald-500/20">
                <TableHead className="text-emerald-200">Data</TableHead>
                <TableHead className="text-emerald-200">Tipo</TableHead>
                <TableHead className="text-emerald-200">Descrição</TableHead>
                <TableHead className="text-emerald-200">Status</TableHead>
                <TableHead className="text-right text-emerald-200">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-emerald-500/10 hover:bg-emerald-500/5">
                  <TableCell className="text-white">{transaction.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      <span className="text-emerald-200 capitalize">
                        {transaction.type === 'profit' ? 'Lucro' :
                         transaction.type === 'reinvest' ? 'Reinvestimento' :
                         transaction.type === 'withdraw' ? 'Saque' :
                         transaction.type === 'investment' ? 'Investimento' : transaction.type}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{transaction.description}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className={`text-right font-bold ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'withdraw' ? '-' : '+'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
