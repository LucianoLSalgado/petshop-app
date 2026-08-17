import { useNavigate } from 'react-router';
import { Button, Card } from '@/components/ui';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card
        variant="elevated"
        padding="lg"
        className="max-w-md w-full text-center"
      >
        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Au, au, foi mau!</h2>
        <p className="text-gray-600 mb-6">Página não encontrada</p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={() => navigate('/')}>
            Ir para Home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </div>
      </Card>
    </div>
  );
}
