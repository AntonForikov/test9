import React from 'react';

interface Props {
  color?: string
}

const Spinner: React.FC<Props> = ({color='primary'}) => {
  return (
    <div className={`spinner-border text-${color}`} role="status"></div>
  );
};

export default Spinner;