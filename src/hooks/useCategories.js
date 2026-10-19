import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollectionData,
  getDocumentById,
  createDocumentWithId,
  updateDocumentById,
  deleteDocumentById,
} from '@/lib/firebase/firestore';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCollectionData('categories'),
  });
}

export function useCategory(id) {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getDocumentById('categories', id),
    enabled: Boolean(id),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) =>
      createDocumentWithId('categories', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateDocumentById('categories', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteDocumentById('categories', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
