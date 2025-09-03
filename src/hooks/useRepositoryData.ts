import { useState } from 'react';
import { RepositoryData, AIInsights } from '../types';
import { fetchRepositoryData } from '../services/githubApi';
import { AIService } from '../services/aiService';

export function useRepositoryData() {
  const [data, setData] = useState<RepositoryData | null>(null);
  const [compareData, setCompareData] = useState<RepositoryData | null>(null);
  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompareLoading, setIsCompareLoading] = useState(false);
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aiService = new AIService();

  const loadRepository = async (owner: string, repo: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setInsights(null);

    try {
      const repoData = await fetchRepositoryData(owner, repo);
      setData(repoData);

      // Generate AI insights
      setIsInsightsLoading(true);
      try {
        const aiInsights = await aiService.generateInsights(repoData);
        setInsights(aiInsights);
      } catch (error) {
        console.error('Failed to generate AI insights:', error);
      } finally {
        setIsInsightsLoading(false);
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch repository data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCompareRepository = async (owner: string, repo: string) => {
    setIsCompareLoading(true);
    try {
      const repoData = await fetchRepositoryData(owner, repo);
      setCompareData(repoData);
    } catch (error) {
      console.error('Failed to fetch comparison repository:', error);
    } finally {
      setIsCompareLoading(false);
    }
  };

  const clearComparison = () => {
    setCompareData(null);
  };

  return {
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
  };
}