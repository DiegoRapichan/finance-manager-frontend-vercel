import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import TransactionForm from "../components/Transactions/TransactionForm";
import TransactionList from "../components/Transactions/TransactionList";
import TransactionFilters from "../components/Transactions/TransactionFilters";
import api from "../services/api";
import { getCurrentMonth } from "../utils/formatters";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState(getCurrentMonth());

  useEffect(() => {
    loadTransactions(filters);
  }, []);

  const loadTransactions = async (filterParams) => {
    try {
      const params = new URLSearchParams();
      if (filterParams.startDate)
        params.append("startDate", filterParams.startDate);
      if (filterParams.endDate) params.append("endDate", filterParams.endDate);
      if (filterParams.type) params.append("type", filterParams.type);
      if (filterParams.categoryId)
        params.append("categoryId", filterParams.categoryId);

      const response = await api.get(`/transactions?${params.toString()}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  };

  const handleFilter = (filterParams) => {
    setFilters(filterParams);
    loadTransactions(filterParams);
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja deletar esta transação?")) {
      return;
    }

    try {
      await api.delete(`/transactions/${id}`);
      loadTransactions(filters);
    } catch (error) {
      alert("Erro ao deletar transação");
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Transações</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <TransactionForm
            onSuccess={() => {
              loadTransactions(filters);
              setEditingTransaction(null);
            }}
            editingTransaction={editingTransaction}
            onCancelEdit={() => setEditingTransaction(null)}
          />
        </div>

        <div className="lg:col-span-2">
          <TransactionFilters onFilter={handleFilter} />
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
