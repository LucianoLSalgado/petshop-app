import { forwardRef, useId } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

export const Select = forwardRef(function Select(
  {
    id,
    label,
    error,
    options = [],
    placeholder = 'Selecione...',
    className,
    ...props
  },
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
      <select
        id={fieldId}
        ref={ref}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2',
          'disabled:bg-gray-100 disabled:text-gray-400',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-primary-500',
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};
