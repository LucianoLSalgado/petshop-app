import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function TitleUpdater() {
  const [title, setTitle] = useState('PetShop');

  useEffect(() => {
    // Atualiza o título da página
    document.title = title;

    // Cleanup: roda antes do próximo efeito, ou quando o componente sai de tela
    return () => {
      document.title = 'PetShop App';
    };
  }, [title]); // Dependência: o efeito roda de novo sempre que 'title' mudar

  return (
    <Card variant="elevated">
      <h3 className="text-xl font-semibold mb-4">Atualizar Título da Página</h3>
      <p className="text-gray-600 mb-4">
        Título atual: <strong>{title}</strong>
      </p>
      <div className="flex gap-2">
        <Button onClick={() => setTitle('Home')} size="sm">
          Home
        </Button>
        <Button onClick={() => setTitle('Sobre')} size="sm">
          Sobre
        </Button>
        <Button onClick={() => setTitle('Admin')} size="sm">
          Admin
        </Button>
      </div>
    </Card>
  );
}
