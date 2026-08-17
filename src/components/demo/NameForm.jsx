import { useLocalStorage } from '@/hooks';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function NameForm() {
  const [name, setName] = useLocalStorage('userName', '');

  return (
    <Card variant="elevated">
      <h3 className="text-xl font-semibold mb-4">
        Formulário com localStorage
      </h3>
      <p className="text-gray-600 mb-4">
        Seu nome será salvo mesmo se você recarregar a página!
      </p>
      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {name && (
          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-primary-700">
              Olá, <strong>{name}</strong>!
            </p>
          </div>
        )}
        <Button
          variant="secondary"
          onClick={() => setName('')}
          className="w-full"
        >
          Limpar
        </Button>
      </div>
    </Card>
  );
}
