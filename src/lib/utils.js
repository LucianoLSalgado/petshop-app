/**
 * Converte um texto livre em um id de URL: minúsculo, sem acentos,
 * espaços trocados por hífen.
 * @param {string} text - Texto de entrada, ex: 'Alimentação Saudável'
 * @returns {string} Ex: 'alimentacao-saudavel'
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
