import { formatCurrency, formatDate } from "../../utils/formatters";
import { Pencil, Trash2 } from "lucide-react";

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
        Nenhuma transação encontrada
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Data
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Categoria
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
              Valor
            </th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(transaction.date)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">
                    {transaction.description}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                {transaction.Category ? (
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: transaction.Category.color }}
                  >
                    {transaction.Category.name}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">Sem categoria</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <span
                  className={`text-sm font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}{" "}
                  {formatCurrency(transaction.amount)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
