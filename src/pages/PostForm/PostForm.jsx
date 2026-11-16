import { useEffect, useMemo } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, Input, Select, Textarea } from '@/components/ui';
import { useCategories, usePost, useCreatePost, useUpdatePost } from '@/hooks';

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

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
  image: yup
    .mixed()
    .test(
      'fileType',
      'Use uma imagem JPG, PNG ou WebP',
      (files) => !files?.[0] || ACCEPTED_IMAGE_TYPES.includes(files[0].type)
    )
    .test(
      'fileSize',
      'A imagem deve ter no máximo 3 MB',
      (files) => !files?.[0] || files[0].size <= MAX_IMAGE_SIZE
    ),
  removeImage: yup.boolean(),
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
      removeImage: false,
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

  const selectedCategory = useWatch({
    control,
    name: 'category',
  });

  const watchedImage = useWatch({
    control,
    name: 'image',
  });

  const newImageFile = watchedImage?.[0];

  const previewUrl = useMemo(
    () => (newImageFile ? URL.createObjectURL(newImageFile) : null),
    [newImageFile]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const currentImageUrl = post?.imageUrl;

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
    const { image, removeImage, ...fields } = formData;
    const imageFile = image?.[0];

    if (isEditing) {
      await updatePost.mutateAsync({
        id: postId,
        ...fields,
        imageFile,
        removeImage,
        oldImagePath: post?.imagePath,
      });
    } else {
      await createPost.mutateAsync({ ...fields, imageFile });
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

        <Input
          label="Imagem de capa (opcional)"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          error={errors.image?.message}
          {...register('image')}
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Pré-visualização da nova imagem"
            className="mb-4 w-full aspect-video object-cover rounded-lg"
          />
        )}

        {isEditing && currentImageUrl && !previewUrl && (
          <div className="mb-4">
            <img
              src={currentImageUrl}
              alt="Imagem atual do post"
              className="mb-2 w-full aspect-video object-cover rounded-lg"
            />
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" {...register('removeImage')} />
              Remover a imagem atual
            </label>
          </div>
        )}

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
