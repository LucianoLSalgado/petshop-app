import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './config';

/**
 * Envia um arquivo para o Storage e devolve a URL pública dele.
 * @param {string} path - Caminho dentro do bucket (ex: 'posts/foto.jpg')
 * @param {File} file - Arquivo selecionado pelo usuário
 * @returns {Promise<string>} URL pública do arquivo enviado
 */
export async function uploadFile(path, file) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);

  return getDownloadURL(storageRef);
}

/**
 * Exclui um arquivo do Storage. Se o arquivo já não existir,
 * não faz nada (e não gera erro).
 * @param {string} path - Caminho do arquivo no bucket
 */
export async function deleteFile(path) {
  try {
    await deleteObject(ref(storage, path));
  } catch (error) {
    if (error.code !== 'storage/object-not-found') {
      throw error;
    }
  }
}
