import { Link } from 'react-router';
import { Card } from '@/components/ui';
import { usePosts } from '@/hooks';

export function Home() {
  const { data: posts, isPending, isError, error } = usePosts();

  return (
    <div className="container-custom py-8">
      <h1 className="text-4xl font-logo text-primary-500 mb-8">Pet Notícias</h1>

      {isPending && <p className="text-gray-600">Carregando posts...</p>}

      {isError && (
        <p className="text-red-600">
          Não foi possível carregar os posts: {error.message}
        </p>
      )}

      {!isPending && !isError && posts.length === 0 && (
        <p className="text-gray-600">
          Nenhum post cadastrado ainda. Volte à Atividade 4.1 e crie alguns
          documentos na coleção posts.
        </p>
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
