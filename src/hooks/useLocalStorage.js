import { useState } from 'react';

/**
 * Hook para gerenciar um valor sincronizado com o localStorage
 * @param {string} key - Chave usada no localStorage
 * @param {any} initialValue - Valor inicial, caso a chave ainda não exista
 * @returns {[any, Function]} [valor, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // Estado inicial: busca do localStorage ou usa o initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Erro ao ler localStorage:', error);
      return initialValue;
    }
  });

  // Atualiza o estado em memória e o localStorage ao mesmo tempo
  const setValue = (value) => {
    try {
      // Aceita tanto um valor direto quanto uma função, como o useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
