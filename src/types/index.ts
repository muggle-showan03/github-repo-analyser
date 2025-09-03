export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  license: {
    name: string;
    spdx_id: string;
  } | null;
  created_at: string;
  updated_at: string;
  size: number;
  default_branch: string;
  language: string;
  languages_url: string;
}

export interface Languages {
  [key: string]: number;
}

export interface CommitActivity {
  week: number;
  total: number;
  days: number[];
}

export interface Contributor {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
}

export interface RepositoryData {
  repository: Repository;
  languages: Languages;
  commitActivity: CommitActivity[];
  contributors: Contributor[];
}

export interface AIInsights {
  summary: string;
  languageAnalysis: string;
  contributionPatterns: string;
}