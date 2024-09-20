import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, };
    }
  
    static getDerivedStateFromError(error) {
      // Update state to render fallback UI
      return { hasError: true, error: error.toString() };
    }
  
    componentDidCatch(error, info) {
      // Log error details
      console.error(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        return <>
            <h2>Something went wrong.</h2>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </>;
      }
      return this.props.children;
    }
}

export default ErrorBoundary;
