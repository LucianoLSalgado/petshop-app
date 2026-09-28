import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, Input } from '@/components/ui';
import { useCategory, useCreateCategory, useUpdateCategory } from '@/hooks';
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
  const { categoryId } = useParams();
  const isEditing = Boolean(categoryId);
  const { data: category } = useCategory(categoryId);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        subcategoriesText: category.subcategories?.join(', '),
      });
    }
  }, [category, reset]);

  const onSubmit = async (formData) => {
    const subcategories = formData.subcategoriesText
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    if (isEditing) {
      await updateCategory.mutateAsync({
        id: categoryId,
        name: formData.name,
        subcategories,
      });
    } else {
      const id = slugify(formData.name);
      await createCategory.mutateAsync({
        id,
        name: formData.name,
        subcategories,
      });
    }

    navigate('/admin');
  };

  return (
    <Card variant="elevated" padding="lg" className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
      </h1>

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
          {isEditing ? 'Salvar Alterações' : 'Salvar Categoria'}
        </Button>
      </form>
    </Card>
  );
}
