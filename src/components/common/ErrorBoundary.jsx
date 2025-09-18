// Componente para capturar errores en la aplicación y mostrar una página de error - Props: children (ReactNode)
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import ErrorPage from '@/pages/ErrorPage';

export default function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorPage}>
      {children}
    </ReactErrorBoundary>
  );
}