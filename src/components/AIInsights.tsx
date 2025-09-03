import React from 'react';
import { Brain, Code, Users, Sparkles } from 'lucide-react';
import { AIInsights } from '../types';
import { SkeletonLoader } from './SkeletonLoader';

interface AIInsightsProps {
  insights: AIInsights | null;
  isLoading: boolean;
}

export function AIInsightsComponent({ insights, isLoading }: AIInsightsProps) {
  const sections = [
    {
      icon: Sparkles,
      title: 'Repository Summary',
      content: insights?.summary,
      color: 'text-purple-600'
    },
    {
      icon: Code,
      title: 'Language Analysis', 
      content: insights?.languageAnalysis,
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Contribution Patterns',
      content: insights?.contributionPatterns,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h3>
      </div>

      <div className="space-y-6">
        {sections.map(({ icon: Icon, title, content, color }) => (
          <div key={title} className="border-l-4 border-gray-200 dark:border-gray-600 pl-4">
            <div className="flex items-center mb-3">
              <Icon className={`w-5 h-5 ${color} dark:opacity-80 mr-2`} />
              <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
            </div>
            {isLoading ? (
              <div className="space-y-2">
                <SkeletonLoader className="h-3 w-full" />
                <SkeletonLoader className="h-3 w-4/5" />
                <SkeletonLoader className="h-3 w-3/4" />
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content || 'Analysis unavailable'}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          AI insights are generated based on repository metadata, commit patterns, and contributor analysis
        </p>
      </div>
    </div>
  );
}