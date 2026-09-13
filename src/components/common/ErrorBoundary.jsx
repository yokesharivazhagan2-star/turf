import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * Robust React Error Boundary Component
 * Traps runtime errors in child trees, logs diagnostic traces,
 * and renders a polished fallback interface without taking down the whole app.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          resetErrorBoundary: this.handleReset,
        });
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center max-w-md mx-auto my-12 glass-panel rounded-3xl border border-red-500/20 bg-slate-950/80 backdrop-blur-xl">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 text-red-400">
            <AlertTriangle className="w-7 h-7 animate-pulse" />
          </div>

          <h2 className="text-xl font-black text-white mb-2">
            {this.props.title || 'Something went wrong'}
          </h2>

          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            {this.props.description ||
              'A component encountered an unexpected error. Your booking data and session remain secure.'}
          </p>

          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <div className="w-full bg-black/50 p-3 rounded-xl border border-white/5 text-left mb-5 overflow-auto max-h-36">
              <p className="text-[11px] font-mono text-red-300 font-bold">
                {this.state.error.toString()}
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={this.handleReset}
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>

            <button
              onClick={this.handleReload}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/10"
            >
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>Reload App</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
