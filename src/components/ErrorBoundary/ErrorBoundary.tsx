import React, { ReactNode, Component, ErrorInfo } from "react";

import { Nullable } from "../../utils/types";
import "./ErrorBoundary.less";

interface ErrorBoundaryProp {}

interface ErrorBoundaryState {
  error: Nullable<Error>;
  errorInfo: Nullable<ErrorInfo>;
}

class ErrorBoundary extends Component<ErrorBoundaryProp, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProp) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch = (error: Error, errorInfo: ErrorInfo): void => {
    this.setState({ error, errorInfo });
    console.error(error, errorInfo);
  };

  render(): ReactNode {
    const { error, errorInfo } = this.state;

    if (error) {
      return (
        <div>
          <pre>{error}</pre>
          <br />
          <pre>{errorInfo?.componentStack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
