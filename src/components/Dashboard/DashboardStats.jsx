import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

const DashboardStats = ({ summary }) => {
  const income = summary?.income || 0;
  const expense = summary?.expense || 0;
  const balance = summary?.balance || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <TrendingUp size={32} />
          <span className="text-sm font-medium opacity-90">Receitas</span>
        </div>
        <p className="text-3xl font-bold">{formatCurrency(income)}</p>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <TrendingDown size={32} />
          <span className="text-sm font-medium opacity-90">Despesas</span>
        </div>
        <p className="text-3xl font-bold">{formatCurrency(expense)}</p>
      </div>

      <div
        className={`bg-gradient-to-br ${balance >= 0 ? "from-blue-500 to-blue-600" : "from-orange-500 to-orange-600"} rounded-xl p-6 text-white shadow-lg`}
      >
        <div className="flex items-center justify-between mb-4">
          <Wallet size={32} />
          <span className="text-sm font-medium opacity-90">Saldo</span>
        </div>
        <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
