import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import CategoryPieChart from "../components/Charts/CategoryPieChart";
import MonthlyChart from "../components/Charts/MonthlyChart";
import api from "../services/api";
import { formatCurrency } from "../utils/formatters";

const Reports = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState([]);
  const [incomeByCategory, setIncomeByCategory] = useState([]);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadReports();
  }, [year]);

  const loadReports = async () => {
    try {
      const [monthlyRes, incomeRes, expenseRes, summaryRes] = await Promise.all(
        [
          api.get(`/reports/monthly?year=${year}`),
          api.get(
            `/reports/by-category?type=income&startDate=${year}-01-01&endDate=${year}-12-31`,
          ),
          api.get(
            `/reports/by-category?type=expense&startDate=${year}-01-01&endDate=${year}-12-31`,
          ),
          api.get(
            `/reports/summary?startDate=${year}-01-01&endDate=${year}-12-31`,
          ),
        ],
      );

      setMonthlyData(monthlyRes.data);
      setIncomeByCategory(incomeRes.data);
      setExpenseByCategory(expenseRes.data);
      setSummary(summaryRes.data);
    } catch (error) {
      console.error("Erro ao carregar relatórios:", error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>

        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">Total de Receitas</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.income)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">Total de Despesas</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(summary.expense)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">Saldo do Ano</p>
            <p
              className={`text-2xl font-bold ${summary.balance >= 0 ? "text-blue-600" : "text-orange-600"}`}
            >
              {formatCurrency(summary.balance)}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Evolução Mensal
        </h2>
        <MonthlyChart data={monthlyData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Receitas por Categoria
          </h2>
          <CategoryPieChart data={incomeByCategory} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Despesas por Categoria
          </h2>
          <CategoryPieChart data={expenseByCategory} />
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
