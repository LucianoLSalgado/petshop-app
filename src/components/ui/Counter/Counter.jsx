import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Card } from '../Card';

export function Counter({ initialValue = 0, step = 1 }) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => setCount(initialValue);

  return (
    <Card variant="elevated">
      <h3 className="text-xl font-semibold mb-4">Contador</h3>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button variant="danger" onClick={decrement}>
          -
        </Button>
        <span className="text-4xl font-bold text-primary-500 min-w-[80px] text-center">
          {count}
        </span>
        <Button variant="primary" onClick={increment}>
          +
        </Button>
      </div>
      <Button variant="secondary" onClick={reset} className="w-full">
        Resetar
      </Button>
    </Card>
  );
}

Counter.propTypes = {
  initialValue: PropTypes.number,
  step: PropTypes.number,
};
