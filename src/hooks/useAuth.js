import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout, observeAuth } from '@/lib/firebase/auth';
import { useAuthStore } from '@/stores';

export function useAuthSession() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = observeAuth((firebaseUser) => {
      setUser(
        firebaseUser
          ? { uid: firebaseUser.uid, email: firebaseUser.email }
          : null
      );
    });

    return unsubscribe;
  }, [setUser]);
}

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  return { user, isLoading };
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
