import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
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
