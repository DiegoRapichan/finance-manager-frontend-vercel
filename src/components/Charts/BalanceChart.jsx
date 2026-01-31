import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";

const BalanceChart = ({ summary }) => {
  if (!summary) {
    return null;
  }

  const data = [
    {
      name: "Resumo",
      Receitas: parseFloat(summary.income || 0),
      Despesas: parseFloat(summary.expense || 0),
      Saldo: parseFloat(summary.balance || 0),
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `R$ ${value}`} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
        <Bar dataKey="Receitas" fill="#10B981" />
        <Bar dataKey="Despesas" fill="#EF4444" />
        <Bar dataKey="Saldo" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
