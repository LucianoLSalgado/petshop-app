import { Button, Card, Counter } from '@/components/ui';
import { TitleUpdater } from '@/components/demo/TitleUpdater';
import { NameForm } from '@/components/demo/NameForm';

function App() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-primary-500 mb-2 font-logo text-center">
          PetShop App
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Demonstração de Componentes React
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="elevated">
            <h3 className="text-xl font-semibold mb-4">Botões</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                Primário
              </Button>
              <Button variant="secondary" className="w-full">
                Secundário
              </Button>
              <Button variant="danger" className="w-full">
                Perigo
              </Button>
              <Button variant="primary" isLoading className="w-full">
                Carregando
              </Button>
            </div>
          </Card>

          <Counter initialValue={10} step={5} />
          <TitleUpdater />
          <NameForm />
        </div>
      </div>
    </div>
  );
}

export default App;
