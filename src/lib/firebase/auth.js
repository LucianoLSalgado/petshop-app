import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './config';

/**
 * Faz login com e-mail e senha.
 * @param {string} email - E-mail do usuário
 * @param {string} password - Senha do usuário
 */
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/** Encerra a sessão do usuário logado. */
export function logout() {
  return signOut(auth);
}

/**
 * Avisa sempre que a sessão mudar (login, logout ou sessão recuperada).
 * @param {Function} callback - Recebe o usuário, ou null se não há ninguém logado
 * @returns {Function} Função que cancela a escuta
 */
export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
