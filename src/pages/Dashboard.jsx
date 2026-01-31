import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import DashboardStats from "../components/Dashboard/DashboardStats";
import QuickActions from "../components/Dashboard/QuickActions";
import BalanceChart from "../components/Charts/BalanceChart";
import CategoryPieChart from "../components/Charts/CategoryPieChart";
import api from "../services/api";
import { getCurrentMonth } from "../utils/formatters";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { startDate, endDate } = getCurrentMonth();

      const [summaryRes, categoryRes] = await Promise.all([
        api.get(`/reports/summary?startDate=${startDate}&endDate=${endDate}`),
        api.get(
          `/reports/by-category?startDate=${startDate}&endDate=${endDate}&type=expense`,
        ),
      ]);

      setSummary(summaryRes.data);
      setCategoryData(categoryRes.data);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Carregando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <DashboardStats summary={summary} />

        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Resumo do Mês
            </h2>
            <BalanceChart summary={summary} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Despesas por Categoria
            </h2>
            <CategoryPieChart data={categoryData} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
