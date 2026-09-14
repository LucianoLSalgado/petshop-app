import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { Button, Card, Input } from '@/components/ui';
import { useCreateCategory } from '@/hooks';
import { slugify } from '@/lib/utils';

const schema = yup.object({
  name: yup
    .string()
    .required('Informe o nome da categoria')
    .min(3, 'Use pelo menos 3 caracteres'),
  subcategoriesText: yup.string().required('Informe ao menos uma subcategoria'),
});

export function CategoryForm() {
  const navigate = useNavigate();
  const createCategory = useCreateCategory();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const id = slugify(formData.name);
    const subcategories = formData.subcategoriesText
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    await createCategory.mutateAsync({
      id,
      name: formData.name,
      subcategories,
    });

    navigate('/admin');
  };

  return (
    <Card variant="elevated" padding="lg" className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nova Categoria</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome"
          placeholder="Ex: Alimentação"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Subcategorias (separadas por vírgula)"
          placeholder="Ex: racao, petiscos"
          error={errors.subcategoriesText?.message}
          {...register('subcategoriesText')}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
        >
          Salvar Categoria
        </Button>
      </form>
    </Card>
  );
}
