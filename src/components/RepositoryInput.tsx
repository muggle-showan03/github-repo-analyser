import React, { useState } from 'react';
import { Search, Github } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface RepositoryInputProps {
  onSubmit: (owner: string, repo: string) => void;
  isLoading: boolean;
}

export function RepositoryInput({ onSubmit, isLoading }: RepositoryInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!input.trim()) {
      setError('Please enter a repository URL or owner/repo format');
      return;
    }

    // Parse different input formats
    let owner = '';
    let repo = '';

    if (input.includes('github.com/')) {
      // URL format: https://github.com/owner/repo
      const match = input.match(/github\.com\/([^\/]+)\/([^\/\?\#]+)/);
      if (match) {
        [, owner, repo] = match;
      }
    } else if (input.includes('/')) {
      // owner/repo format
      [owner, repo] = input.split('/');
    } else {
      setError('Please use format: owner/repo or full GitHub URL');
      return;
    }

    if (!owner || !repo) {
      setError('Invalid format. Use: owner/repo or GitHub URL');
      return;
    }

    onSubmit(owner.trim(), repo.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Analyze Repository
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="repo-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub Repository
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Try: microsoft/vscode, facebook/react, or vercel/next.js
            </p>
            <div className="relative">
              <input
                id="repo-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter owner/repo or GitHub URL"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Analyzing Repository...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze Repository
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}