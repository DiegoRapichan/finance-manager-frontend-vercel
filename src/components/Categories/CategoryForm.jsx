import { useState, useEffect } from "react";
import api from "../../services/api";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
];

const CategoryForm = ({ onSuccess, editingCategory, onCancelEdit }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [color, setColor] = useState(COLORS[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setType(editingCategory.type);
      setColor(editingCategory.color);
    }
  }, [editingCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { name, type, color };

      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, data);
      } else {
        await api.post("/categories", data);
      }

      resetForm();
      onSuccess();
    } catch (error) {
      alert("Erro ao salvar categoria");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setType("expense");
    setColor(COLORS[0]);
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {editingCategory ? "Editar Categoria" : "Nova Categoria"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Alimentação"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:border-red-500 transition">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
              />
              <span
                className={type === "expense" ? "font-medium text-red-600" : ""}
              >
                Despesa
              </span>
            </label>

            <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:border-green-500 transition">
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
              />
              <span
                className={
                  type === "income" ? "font-medium text-green-600" : ""
                }
              >
                Receita
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cor
          </label>
          <div className="grid grid-cols-4 gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`h-10 rounded-lg transition ${
                  color === c ? "ring-4 ring-offset-2 ring-blue-500" : ""
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Salvando..."
              : editingCategory
                ? "Atualizar"
                : "Adicionar"}
          </button>

          {editingCategory && (
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

export default CategoryForm;
