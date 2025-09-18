import { useNavigate } from 'react-router';

export default function ErrorPage({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

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
      <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>¡Oops! Algo salió mal</h1>
      <p style={{ marginBottom: '20px' }}>
        Ha ocurrido un error inesperado. No te preocupes, estamos trabajando para solucionarlo.
      </p>
      <details style={{ marginBottom: '20px' }}>
        <summary>Detalles técnicos (para desarrolladores)</summary>
        <pre style={{ color: 'red', textAlign: 'left', maxWidth: '600px' }}>
          {error.message}
        </pre>
      </details>
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