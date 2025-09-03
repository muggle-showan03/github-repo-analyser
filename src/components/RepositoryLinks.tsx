import React from 'react';
import { ExternalLink, Bug, GitPullRequest, Package, Github } from 'lucide-react';
import { Repository } from '../types';

interface RepositoryLinksProps {
  repository: Repository;
}

export function RepositoryLinks({ repository }: RepositoryLinksProps) {
  const links = [
    {
      icon: Github,
      label: 'Repository',
      url: repository.html_url,
      description: 'View source code'
    },
    {
      icon: Bug,
      label: 'Issues',
      url: `${repository.html_url}/issues`,
      description: `${repository.open_issues_count} open`
    },
    {
      icon: GitPullRequest,
      label: 'Pull Requests',
      url: `${repository.html_url}/pulls`,
      description: 'View contributions'
    },
    {
      icon: Package,
      label: 'Releases',
      url: `${repository.html_url}/releases`,
      description: 'Download releases'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Access</h3>
      
      <div className="space-y-3">
        {links.map(({ icon: Icon, label, url, description }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </a>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">{repository.name}</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {repository.description || 'No description available'}
        </p>
      </div>
    </div>
  );
}