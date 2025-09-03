import React from 'react';
import { Star, GitFork, AlertCircle, Calendar, Database, GitBranch } from 'lucide-react';
import { Repository } from '../types';

interface StatsCardProps {
  repository: Repository;
}

export function StatsCard({ repository }: StatsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSize = (sizeInKB: number) => {
    if (sizeInKB < 1024) return `${sizeInKB} KB`;
    const sizeInMB = sizeInKB / 1024;
    if (sizeInMB < 1024) return `${sizeInMB.toFixed(1)} MB`;
    return `${(sizeInMB / 1024).toFixed(1)} GB`;
  };

  const stats = [
    { icon: Star, label: 'Stars', value: repository.stargazers_count.toLocaleString(), color: 'text-yellow-600' },
    { icon: GitFork, label: 'Forks', value: repository.forks_count.toLocaleString(), color: 'text-blue-600' },
    { icon: AlertCircle, label: 'Issues', value: repository.open_issues_count.toLocaleString(), color: 'text-red-600' },
    { icon: Database, label: 'Size', value: formatSize(repository.size), color: 'text-green-600' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Repository Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Icon className={`w-5 h-5 ${color} dark:opacity-80`} />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
              <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Created:</span>
          <span className="text-gray-900 dark:text-white font-medium">{formatDate(repository.created_at)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Updated:</span>
          <span className="text-gray-900 dark:text-white font-medium">{formatDate(repository.updated_at)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Default Branch:</span>
          <span className="inline-flex items-center text-gray-900 dark:text-white font-medium">
            <GitBranch className="w-3 h-3 mr-1" />
            {repository.default_branch}
          </span>
        </div>
        {repository.license && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">License:</span>
            <span className="text-gray-900 dark:text-white font-medium">{repository.license.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}