import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollectionData,
  getDocumentById,
  getFilteredPosts,
  createDocument,
  updateDocumentById,
  deleteDocumentById,
} from '@/lib/firebase/firestore';

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
    mutationFn: (id) => deleteDocumentById('posts', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createDocument('posts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateDocumentById('posts', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
