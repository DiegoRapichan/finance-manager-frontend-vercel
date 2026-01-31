import { Pencil, Trash2 } from "lucide-react";

const CategoryList = ({ categories, onEdit, onDelete }) => {
  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  const renderCategories = (cats, title) => (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cats.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium text-gray-800">{category.name}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(category)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Minhas Categorias
      </h2>

      {renderCategories(incomeCategories, "💰 Receitas")}
      {renderCategories(expenseCategories, "💸 Despesas")}

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Nenhuma categoria cadastrada
        </div>
      )}
    </div>
  );
};

export default CategoryList;
