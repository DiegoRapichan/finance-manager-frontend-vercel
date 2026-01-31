import { useState, useEffect } from "react";
import api from "../../services/api";
import { formatDateInput } from "../../utils/formatters";

const TransactionForm = ({ onSuccess, editingTransaction, onCancelEdit }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(formatDateInput(new Date()));
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [type]);

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount);
      setType(editingTransaction.type);
      setDate(formatDateInput(editingTransaction.date));
      setCategoryId(editingTransaction.categoryId || "");
    }
  }, [editingTransaction]);

  const loadCategories = async () => {
    try {
      const response = await api.get("/categories");
      const filtered = response.data.filter((cat) => cat.type === type);
      setCategories(filtered);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        description,
        amount: parseFloat(amount),
        type,
        date,
        categoryId: categoryId || null,
      };

      if (editingTransaction) {
        await api.put(`/transactions/${editingTransaction.id}`, data);
      } else {
        await api.post("/transactions", data);
      }

      resetForm();
      onSuccess();
    } catch (error) {
      alert("Erro ao salvar transação");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setType("expense");
    setDate(formatDateInput(new Date()));
    setCategoryId("");
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {editingTransaction ? "Editar Transação" : "Nova Transação"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:border-red-500 transition">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value)}
              className="text-red-600"
            />
            <span
              className={
                type === "expense"
                  ? "font-medium text-red-600"
                  : "text-gray-600"
              }
            >
              💸 Despesa
            </span>
          </label>

          <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:border-green-500 transition">
            <input
              type="radio"
              name="type"
              value="income"
              checked={type === "income"}
              onChange={(e) => setType(e.target.value)}
              className="text-green-600"
            />
            <span
              className={
                type === "income"
                  ? "font-medium text-green-600"
                  : "text-gray-600"
              }
            >
              💰 Receita
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Compras do supermercado"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor (R$)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0,00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria (opcional)
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sem categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Salvando..."
              : editingTransaction
                ? "Atualizar"
                : "Adicionar"}
          </button>

          {editingTransaction && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
