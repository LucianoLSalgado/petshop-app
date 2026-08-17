import { Button } from '@/components/ui';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-500 mb-8">
          PetShop App
        </h1>
        <div className="flex gap-4 justify-center">
          <Button variant="primary">Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="danger">Perigo</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
