import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ThemeProvider } from './app/contexts/ThemeContext';
import { LanguageProvider } from './app/contexts/LanguageContext';
import { AdminProvider } from './app/contexts/AdminContext';
import { EmergencyProvider } from './app/contexts/EmergencyContext';
import { NotificationProvider } from './app/contexts/NotificationContext';
import './styles/index.css';

// Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur Application</h1>
            <p className="text-red-500 mb-4">{this.state.error?.message}</p>
            <pre className="bg-red-100 p-4 rounded text-left overflow-auto text-sm">
              {this.state.error?.stack}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <LanguageProvider>
            <AdminProvider>
              <EmergencyProvider>
                <NotificationProvider>
                  <App />
                </NotificationProvider>
              </EmergencyProvider>
            </AdminProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
