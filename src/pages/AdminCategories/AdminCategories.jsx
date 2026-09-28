import { Link } from 'react-router';
import { Button, Card } from '@/components/ui';
import { useCategories, useDeleteCategory } from '@/hooks';

export function AdminCategories() {
  const { data: categories, isPending } = useCategories();
  const deleteCategory = useDeleteCategory();

  const handleDelete = (category) => {
    const confirmed = window.confirm(
      `Excluir a categoria "${category.name}"? Essa ação não pode ser desfeita.`
    );

    if (confirmed) {
      deleteCategory.mutate(category.id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <Link to="/admin/categorias/nova">
          <Button variant="primary">Nova Categoria</Button>
        </Link>
      </div>

      {isPending && <p className="text-gray-600">Carregando...</p>}

      <div className="space-y-3">
        {categories?.map((category) => (
          <Card
            key={category.id}
            variant="outlined"
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{category.name}</p>
              <p className="text-sm text-gray-500">
                {category.subcategories?.join(', ')}
              </p>
            </div>

            <div className="flex gap-2">
              <Link to={`/admin/categorias/${category.id}/editar`}>
                <Button variant="secondary" size="sm">
                  Editar
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(category)}
              >
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
