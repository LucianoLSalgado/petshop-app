import { useQuery } from '@tanstack/react-query';
import { getCollectionData, getDocumentById } from '@/lib/firebase/firestore';

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
