import { Link } from "react-router-dom";
import { PlusCircle, FolderOpen } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Ações Rápidas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/transactions"
          className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
        >
          <PlusCircle className="text-blue-600" size={24} />
          <div>
            <p className="font-medium text-gray-800">Nova Transação</p>
            <p className="text-sm text-gray-500">
              Adicionar receita ou despesa
            </p>
          </div>
        </Link>

        <Link
          to="/categories"
          className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
        >
          <FolderOpen className="text-green-600" size={24} />
          <div>
            <p className="font-medium text-gray-800">Gerenciar Categorias</p>
            <p className="text-sm text-gray-500">Criar e editar categorias</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
