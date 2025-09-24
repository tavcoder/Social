/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "@/context";
import App from './App.jsx'
import "./styles/index.css";

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>¡Oops! Algo salió mal</h1>
      <p style={{ marginBottom: '20px', fontSize: '18px' }}>
        Ha ocurrido un error inesperado. No te preocupes, puedes intentar recargar la página.
      </p>
      <details style={{ marginBottom: '20px' }}>
        <summary style={{ cursor: 'pointer', color: '#007bff' }}>Detalles técnicos (para desarrolladores)</summary>
        <pre style={{
          color: 'red',
          textAlign: 'left',
          maxWidth: '600px',
          margin: '10px auto',
          padding: '10px',
          backgroundColor: '#f1f1f1',
          borderRadius: '5px',
          overflow: 'auto'
        }}>
          {error.message}
        </pre>
      </details>
      <div>
        <button
          onClick={resetErrorBoundary}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Intentar de nuevo
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Recargar página
        </button>
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

function AppSetup() {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={Fallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<AppSetup />);
