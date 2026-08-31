import { useParams, Link } from 'react-router';
import { clsx } from 'clsx';
import { Card } from '@/components/ui';
import { useCategory, usePostsByCategory } from '@/hooks';

export function Category() {
  const { categoryId, subcategoryId } = useParams();
  const { data: category, isPending: isCategoryPending } =
    useCategory(categoryId);
  const {
    data: posts,
    isPending: isPostsPending,
    isError,
  } = usePostsByCategory(categoryId, subcategoryId);

  if (isCategoryPending) {
    return <p className="container-custom py-8 text-gray-600">Carregando...</p>;
  }

  if (!category) {
    return (
      <div className="container-custom py-8">
        <p className="text-red-600 mb-4">Categoria não encontrada.</p>
        <Link to="/" className="text-primary-500 underline">
          Voltar para a Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-4xl font-logo text-primary-500 mb-4">
        {category.name}
      </h1>

      {category.subcategories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory}
              to={`/categorias/${categoryId}/${subcategory}`}
              className={clsx(
                'px-3 py-1 rounded-full text-sm transition-colors',
                subcategory === subcategoryId
                  ? 'bg-primary-500 text-white'
                  : 'bg-secondary-100 text-gray-700 hover:bg-secondary-500 hover:text-white'
              )}
            >
              {subcategory}
            </Link>
          ))}
        </div>
      )}

      {isPostsPending && <p className="text-gray-600">Carregando posts...</p>}
      {isError && (
        <p className="text-red-600">Não foi possível carregar os posts.</p>
      )}
      {!isPostsPending && !isError && posts.length === 0 && (
        <p className="text-gray-600">Nenhum post encontrado nesta categoria.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <Card
              variant="elevated"
              className="h-full hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
