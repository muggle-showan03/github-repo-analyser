import React, { useState } from 'react';
import { Plus, X, GitCompare } from 'lucide-react';
import { RepositoryData } from '../types';
import { StatsCard } from './StatsCard';
import { LanguageChart } from './LanguageChart';

interface RepositoryComparisonProps {
  currentRepo: RepositoryData;
  onCompareRepo: (owner: string, repo: string) => void;
  compareRepo?: RepositoryData | null;
  isCompareLoading: boolean;
  onClearComparison: () => void;
}

export function RepositoryComparison({ 
  currentRepo, 
  compareRepo, 
  onCompareRepo, 
  isCompareLoading,
  onClearComparison 
}: RepositoryComparisonProps) {
  const [compareInput, setCompareInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleCompareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let owner = '';
    let repo = '';

    if (compareInput.includes('/')) {
      [owner, repo] = compareInput.split('/');
    } else {
      return;
    }

    if (owner && repo) {
      onCompareRepo(owner.trim(), repo.trim());
      setShowInput(false);
      setCompareInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <GitCompare className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Repository Comparison</h2>
        </div>
        
        {!showInput && !compareRepo && (
          <button
            onClick={() => setShowInput(true)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Repository
          </button>
        )}

        {compareRepo && (
          <button
            onClick={onClearComparison}
            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Comparison
          </button>
        )}
      </div>

      {showInput && (
        <form onSubmit={handleCompareSubmit} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex space-x-2">
            <input
              type="text"
              value={compareInput}
              onChange={(e) => setCompareInput(e.target.value)}
              placeholder="Enter owner/repo to compare"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Compare
            </button>
            <button
              type="button"
              onClick={() => setShowInput(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {currentRepo.repository.full_name}
          </h3>
          <div className="space-y-4">
            <StatsCard repository={currentRepo.repository} />
            <LanguageChart languages={currentRepo.languages} />
          </div>
        </div>

        <div>
          {isCompareLoading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
              <div className="space-y-4">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ) : compareRepo ? (
            <>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {compareRepo.repository.full_name}
              </h3>
              <div className="space-y-4">
                <StatsCard repository={compareRepo.repository} />
                <LanguageChart languages={compareRepo.languages} />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8">
              <div className="text-center">
                <GitCompare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Add a repository to compare</p>
                <button
                  onClick={() => setShowInput(true)}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Choose repository
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}