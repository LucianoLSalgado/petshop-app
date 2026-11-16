import PropTypes from 'prop-types';
import { clsx } from 'clsx';

export function PostCover({ post, className, priority = false }) {
  if (!post.imageUrl) {
    return null;
  }

  return (
    <img
      src={post.imageUrl}
      alt={`Imagem de capa do post: ${post.title}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={clsx('w-full aspect-video object-cover rounded-lg', className)}
    />
  );
}

PostCover.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  priority: PropTypes.bool,
};
