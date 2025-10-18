import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-red-500">
          <h1 className="text-xl font-semibold mb-2">Something went wrong.</h1>
          <pre className="whitespace-pre-wrap text-sm bg-red-50 p-3 rounded">{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
