import { useQuery } from '@tanstack/react-query';
import {
  getCollectionData,
  getDocumentById,
  getFilteredPosts,
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
