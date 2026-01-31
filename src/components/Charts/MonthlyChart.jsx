import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, getMonthName } from "../../utils/formatters";

const MonthlyChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Nenhum dado disponível
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    month: getMonthName(item.month),
    Receitas: parseFloat(item.income),
    Despesas: parseFloat(item.expense),
    Saldo: parseFloat(item.balance),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `R$ ${value}`} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
        <Line
          type="monotone"
          dataKey="Receitas"
          stroke="#10B981"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="Despesas"
          stroke="#EF4444"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="Saldo"
          stroke="#3B82F6"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;
