import { forwardRef, useId } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

export const Textarea = forwardRef(function Textarea(
  { id, label, error, rows = 6, className, ...props },
  ref
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        ref={ref}
        rows={rows}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-primary-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Textarea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
};
