/**
 * Error Page Component
 *
 * Fallback UI displayed when the application encounters an error.
 * Used with React Error Boundaries to catch and handle runtime errors.
 * Provides user-friendly error messages and recovery options.
 */
import { useNavigate } from 'react-router';

/**
 * ErrorPage component - Error boundary fallback UI
 *
 * @param {Object} props
 * @param {Error} props.error - The error object that was caught
 * @param {Function} props.resetErrorBoundary - Function to reset the error boundary
 * @returns {JSX.Element} Error page with recovery options
 */
export default function ErrorPage({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  /**
   * Handle navigation to home page and reset error boundary
   */
  const handleGoHome = () => {
    resetErrorBoundary();
    navigate('/feed');
  };

  return (
    <div className="error-page" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      {/* Error title */}
      <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>¡Oops! Algo salió mal</h1>

      {/* User-friendly error message */}
      <p style={{ marginBottom: '20px' }}>
        Ha ocurrido un error inesperado. No te preocupes, estamos trabajando para solucionarlo.
      </p>

      {/* Technical details for developers (collapsible) */}
      <details style={{ marginBottom: '20px' }}>
        <summary>Detalles técnicos (para desarrolladores)</summary>
        <pre style={{ color: 'red', textAlign: 'left', maxWidth: '600px' }}>
          {error.message}
        </pre>
      </details>

      {/* Recovery action buttons */}
      <div>
        <button
          onClick={resetErrorBoundary}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Intentar de nuevo
        </button>
        <button
          onClick={handleGoHome}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
}