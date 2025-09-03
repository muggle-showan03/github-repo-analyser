import React from 'react';
import { RepositoryData, AIInsights } from '../types';
import { StatsCard } from './StatsCard';
import { LanguageChart } from './LanguageChart';
import { CommitChart } from './CommitChart';
import { RepositoryLinks } from './RepositoryLinks';
import { AIInsightsComponent } from './AIInsights';
import { RepositoryComparison } from './RepositoryComparison';

interface DashboardProps {
  data: RepositoryData;
  insights: AIInsights | null;
  isInsightsLoading: boolean;
  onCompareRepo: (owner: string, repo: string) => void;
  compareData?: RepositoryData | null;
  isCompareLoading: boolean;
  onClearComparison: () => void;
}

export function Dashboard({ 
  data, 
  insights, 
  isInsightsLoading, 
  onCompareRepo, 
  compareData,
  isCompareLoading,
  onClearComparison 
}: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatsCard repository={data.repository} />
        <LanguageChart languages={data.languages} />
        <RepositoryLinks repository={data.repository} />
      </div>

      {/* Commit Activity Chart */}
      <CommitChart commitActivity={data.commitActivity} />

      {/* AI Insights */}
      <AIInsightsComponent insights={insights} isLoading={isInsightsLoading} />

      {/* Repository Comparison */}
      <RepositoryComparison
        currentRepo={data}
        compareRepo={compareData}
        onCompareRepo={onCompareRepo}
        isCompareLoading={isCompareLoading}
        onClearComparison={onClearComparison}
      />
    </div>
  );
}