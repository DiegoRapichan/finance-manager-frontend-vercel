import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import CategoryForm from "../components/Categories/CategoryForm";
import CategoryList from "../components/Categories/CategoryList";
import api from "../services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja deletar esta categoria?")) {
      return;
    }

    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
    } catch (error) {
      alert("Erro ao deletar categoria");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Categorias</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <CategoryForm
            onSuccess={() => {
              loadCategories();
              setEditingCategory(null);
            }}
            editingCategory={editingCategory}
            onCancelEdit={() => setEditingCategory(null)}
          />
        </div>

        <div className="lg:col-span-2">
          <CategoryList
            categories={categories}
            onEdit={setEditingCategory}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
