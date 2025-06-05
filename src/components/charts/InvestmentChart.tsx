
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '01/Jan', invested: 50000, profit: 0, total: 50000 },
  { date: '02/Jan', invested: 50000, profit: 1250, total: 51250 },
  { date: '03/Jan', invested: 50000, profit: 2531, total: 52531 },
  { date: '04/Jan', invested: 50000, profit: 3845, total: 53845 },
  { date: '05/Jan', invested: 50000, profit: 5196, total: 55196 },
  { date: '06/Jan', invested: 50000, profit: 6585, total: 56585 },
  { date: '07/Jan', invested: 50000, profit: 8015, total: 58015 },
  { date: '08/Jan', invested: 50000, profit: 9485, total: 59485 },
  { date: '09/Jan', invested: 50000, profit: 10996, total: 60996 },
  { date: '10/Jan', invested: 50000, profit: 12549, total: 62549 },
  { date: '11/Jan', invested: 50000, profit: 14145, total: 64145 },
  { date: '12/Jan', invested: 50000, profit: 15785, total: 65785 },
  { date: '13/Jan', invested: 50000, profit: 17470, total: 67470 },
  { date: '14/Jan', invested: 50000, profit: 19201, total: 69201 },
  { date: '15/Jan', invested: 50000, profit: 20981, total: 70981 },
];

export const InvestmentChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number, name: string) => [
              `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
              name === 'invested' ? 'Investido' : name === 'profit' ? 'Lucro' : 'Total'
            ]}
          />
          <Line 
            type="monotone" 
            dataKey="invested" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="profit" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
