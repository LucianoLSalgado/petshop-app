import { useParams, Link } from 'react-router';
import { Card } from '@/components/ui';
import { usePost } from '@/hooks';

export function Post() {
  const { id } = useParams();
  const { data: post, isPending, isError } = usePost(id);

  if (isPending) {
    return <p className="container-custom py-8 text-gray-600">Carregando...</p>;
  }

  if (isError || !post) {
    return (
      <div className="container-custom py-8">
        <p className="text-red-600 mb-4">Post não encontrado.</p>
        <Link to="/" className="text-primary-500 underline">
          Voltar para a Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <Link to="/" className="text-primary-500 underline">
        ← Voltar
      </Link>

      <Card variant="elevated" padding="lg" className="mt-4">
        <span className="text-sm text-secondary-500 uppercase">
          {post.category}
        </span>
        <h1 className="text-3xl font-bold mt-2 mb-4">{post.title}</h1>
        <p className="text-gray-700">{post.body}</p>
      </Card>
    </div>
  );
}
