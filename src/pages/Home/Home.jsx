import { Card } from '@/components/ui';

export function Home() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-4xl font-logo text-primary-500 mb-8">Pet Notícias</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card variant="elevated">
          <h2 className="text-xl font-semibold mb-2">Bem-vindo!</h2>
          <p className="text-gray-600">
            Confira as últimas novidades sobre cuidados com pets.
          </p>
        </Card>

        <Card variant="elevated">
          <h2 className="text-xl font-semibold mb-2">Blog</h2>
          <p className="text-gray-600">Artigos e dicas para seu pet.</p>
        </Card>

        <Card variant="elevated">
          <h2 className="text-xl font-semibold mb-2">Produtos</h2>
          <p className="text-gray-600">Confira nossos produtos.</p>
        </Card>
      </div>
    </div>
  );
}
