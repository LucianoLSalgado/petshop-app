import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollectionData,
  getDocumentById,
  getFilteredPosts,
  createDocument,
  updateDocumentById,
  deleteDocumentById,
} from '@/lib/firebase/firestore';
import { uploadFile, deleteFile } from '@/lib/firebase/storage';
import { buildImagePath } from '@/lib/utils';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getCollectionData('posts'),
  });
}

export function usePost(id) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => getDocumentById('posts', id),
    enabled: Boolean(id),
  });
}

export function usePostsByCategory(category, subcategory) {
  return useQuery({
    queryKey: ['posts', { category, subcategory }],
    queryFn: () => getFilteredPosts({ category, subcategory }),
    enabled: Boolean(category),
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, imagePath }) => {
      await deleteDocumentById('posts', id);

      if (imagePath) {
        await deleteFile(imagePath);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ imageFile, ...data }) => {
      let image = {};

      if (imageFile) {
        const imagePath = buildImagePath('posts', imageFile);
        const imageUrl = await uploadFile(imagePath, imageFile);
        image = { imageUrl, imagePath };
      }

      return createDocument('posts', { ...data, ...image });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      imageFile,
      removeImage,
      oldImagePath,
      ...data
    }) => {
      let image = {};

      if (imageFile) {
        const imagePath = buildImagePath('posts', imageFile);
        const imageUrl = await uploadFile(imagePath, imageFile);
        image = { imageUrl, imagePath };
      } else if (removeImage) {
        image = { imageUrl: null, imagePath: null };
      }

      const result = await updateDocumentById('posts', id, {
        ...data,
        ...image,
      });

      if (oldImagePath && (imageFile || removeImage)) {
        await deleteFile(oldImagePath);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
