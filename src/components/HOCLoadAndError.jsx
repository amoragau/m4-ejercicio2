import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// HOC para manejar estados de carga
const HOCLoadAndError = (WrappedComponent) => {
  const WithLoadingComponent = ({ isLoading, ...props }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
      if (props.data) {
        setData(props.data);
      }
    }, [props.data]);
    // Muestra spinner durante la carga
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
        </div>
      );
    }
    // Muestra error si existe
    if (error) {
      return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>;
    }
    return <WrappedComponent {...props} data={data} />;
  };

  WithLoadingComponent.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.any
  };
  return WithLoadingComponent;
};
export default HOCLoadAndError;