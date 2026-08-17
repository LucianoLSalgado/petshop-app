import { Card } from '@/components/ui';

export function About() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-4xl font-logo text-primary-500 mb-8">
        Sobre o PetShop
      </h1>

      <Card variant="elevated" padding="lg">
        <p className="text-lg text-gray-700 mb-4">
          Na <strong>Meu Amigo Cão</strong>, nosso sucesso como organização é
          conduzido pelo cuidado que temos com nossos animais.
        </p>
        <p className="text-gray-600">
          Oferecemos serviços de qualidade e informações relevantes para
          garantir o bem-estar do seu pet.
        </p>
      </Card>
    </div>
  );
}
