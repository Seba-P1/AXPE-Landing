import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white text-center">
          <div className="max-w-md border border-red-500/30 bg-red-900/10 p-8 rounded-xl backdrop-blur-md">
            <h1 className="text-3xl font-bold mb-4 text-red-400">Algo salió mal</h1>
            <p className="mb-6 text-gray-300">
              La aplicación ha encontrado un error inesperado. Por favor, recarga la página.
            </p>
            <pre className="bg-black/50 p-4 rounded text-xs text-left mb-6 overflow-auto max-h-40 text-red-200">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#00E091] text-black font-bold rounded-lg hover:bg-white transition-colors"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}