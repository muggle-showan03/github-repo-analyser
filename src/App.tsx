import React from 'react';
import { Header } from './components/Header';
import { RepositoryInput } from './components/RepositoryInput';
import { Dashboard } from './components/Dashboard';
import { ErrorMessage } from './components/ErrorMessage';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ThemeProvider } from './contexts/ThemeContext';
import { useRepositoryData } from './hooks/useRepositoryData';

function AppContent() {
  const {
    data,
    compareData,
    insights,
    isLoading,
    isCompareLoading,
    isInsightsLoading,
    error,
    loadRepository,
    loadCompareRepository,
    clearComparison
  } = useRepositoryData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <OfflineIndicator />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Repository Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get comprehensive insights into any GitHub repository with AI-powered analysis and interactive visualizations
            </p>
          </div>

          <RepositoryInput onSubmit={loadRepository} isLoading={isLoading} />

          {error && (
            <ErrorMessage 
              message={error} 
              onRetry={() => window.location.reload()}
            />
          )}

          {data && (
            <Dashboard
              data={data}
              insights={insights}
              isInsightsLoading={isInsightsLoading}
              onCompareRepo={loadCompareRepository}
              compareData={compareData}
              isCompareLoading={isCompareLoading}
              onClearComparison={clearComparison}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;