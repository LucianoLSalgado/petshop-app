import { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, Input, Select, Textarea } from '@/components/ui';
import { useCategories, usePost, useCreatePost, useUpdatePost } from '@/hooks';

const schema = yup.object({
  title: yup
    .string()
    .required('Informe o título do post')
    .min(3, 'Use pelo menos 3 caracteres'),
  excerpt: yup
    .string()
    .required('Informe um resumo')
    .max(160, 'O resumo deve ter no máximo 160 caracteres'),
  body: yup
    .string()
    .required('Escreva o texto do post')
    .min(20, 'O texto precisa ter pelo menos 20 caracteres'),
  category: yup.string().required('Selecione uma categoria'),
  subcategory: yup.string().required('Selecione uma subcategoria'),
});

export function PostForm() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditing = Boolean(postId);
  const { data: categories } = useCategories();
  const { data: post } = usePost(postId);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      excerpt: '',
      body: '',
      category: '',
      subcategory: '',
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title ?? '',
        excerpt: post.excerpt ?? '',
        body: post.body ?? '',
        category: post.category ?? '',
        subcategory: post.subcategory ?? '',
      });
    }
  }, [post, reset]);

  const selectedCategory = useWatch('category');

  const categoryOptions = (categories ?? []).map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const subcategories =
    categories?.find((item) => item.id === selectedCategory)?.subcategories ??
    [];
  const subcategoryOptions = subcategories.map((name) => ({
    value: name,
    label: name,
  }));

  const onSubmit = async (formData) => {
    if (isEditing) {
      await updatePost.mutateAsync({ id: postId, ...formData });
    } else {
      await createPost.mutateAsync(formData);
    }

    navigate('/admin/posts');
  };

  return (
    <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Post' : 'Novo Post'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Título"
          error={errors.title?.message}
          {...register('title')}
        />
        <Input
          label="Resumo (aparece nos cartões da Home)"
          error={errors.excerpt?.message}
          {...register('excerpt')}
        />
        <Textarea
          label="Texto do post"
          error={errors.body?.message}
          {...register('body')}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Categoria"
              placeholder="Selecione uma categoria"
              options={categoryOptions}
              error={errors.category?.message}
              onChange={(event) => {
                field.onChange(event);
                setValue('subcategory', '');
              }}
            />
          )}
        />

        <Controller
          name="subcategory"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Subcategoria"
              placeholder="Selecione uma subcategoria"
              options={subcategoryOptions}
              disabled={!selectedCategory}
              error={errors.subcategory?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
        >
          {isEditing ? 'Salvar Alterações' : 'Salvar Post'}
        </Button>
      </form>
    </Card>
  );
}
