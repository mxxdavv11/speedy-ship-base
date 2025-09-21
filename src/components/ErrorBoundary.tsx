import React from "react";

type State = { hasError: boolean; error?: Error; info?: React.ErrorInfo };

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App crashed:", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-xl w-full rounded-2xl border p-6 bg-white shadow-sm">
            <h1 className="text-xl font-bold mb-2">Произошла ошибка</h1>
            <p className="text-sm text-gray-600 mb-4">Страница не может отобразиться. Подробности ниже:</p>
            <pre className="text-xs overflow-auto p-3 rounded bg-gray-50 border">
{String(this.state.error?.message || 'Unknown error')}
            </pre>
            {this.state.info?.componentStack && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-gray-600">Стек компонентов</summary>
                <pre className="text-[11px] overflow-auto p-3 rounded bg-gray-50 border whitespace-pre-wrap">
{this.state.info.componentStack}
                </pre>
              </details>
            )}
            <button onClick={() => location.reload()} className="mt-4 inline-flex items-center px-4 py-2 rounded-md border bg-white text-sm">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
