import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './config';

/**
 * Busca todos os documentos de uma coleção.
 * @param {string} collectionName - Nome da coleção no Firestore
 * @returns {Promise<Array>} Lista de documentos, cada um com seu id
 */
export async function getCollectionData(collectionName) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }));
}

/**
 * Busca um único documento pelo id.
 * @param {string} collectionName - Nome da coleção no Firestore
 * @param {string} id - Id do documento
 * @returns {Promise<Object|null>} O documento, ou null se não existir
 */
export async function getDocumentById(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    return null;
  }

  return { id: docSnapshot.id, ...docSnapshot.data() };
}

/**
 * Busca posts filtrados por um ou mais campos.
 * @param {Object} filters - Pares campo/valor, ex: { category: 'bem-estar' }
 * @returns {Promise<Array>} Lista de posts que atendem a todos os filtros
 */
export async function getFilteredPosts(filters = {}) {
  const constraints = Object.entries(filters)
    .filter(([, value]) => value != null)
    .map(([field, value]) => where(field, '==', value));

  const postsQuery = query(collection(db, 'posts'), ...constraints);
  const snapshot = await getDocs(postsQuery);

  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }));
}

/**
 * Cria (ou substitui) um documento com um id específico.
 * @param {string} collectionName - Nome da coleção
 * @param {string} id - Id do documento
 * @param {Object} data - Dados a salvar
 */
export async function createDocumentWithId(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, data);
  return { id, ...data };
}

/**
 * Exclui um documento pelo id.
 * @param {string} collectionName - Nome da coleção
 * @param {string} id - Id do documento
 */
export async function deleteDocumentById(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
