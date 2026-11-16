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

/**
 * Monta um caminho único para um arquivo, a partir do nome original.
 * @param {string} folder - Pasta de destino, ex: 'posts'
 * @param {File} file - Arquivo escolhido pelo usuário
 * @returns {string} Ex: 'posts/1730000000000-foto-do-cao.jpg'
 */
export function buildImagePath(folder, file) {
  const extension = file.name.split('.').pop().toLowerCase();
  const baseName = slugify(file.name.replace(/\.[^.]+$/, ''));

  return `${folder}/${Date.now()}-${baseName}.${extension}`;
}
