import { Repository, Languages, CommitActivity, Contributor } from '../types';
import { getCache, setCache } from '../utils/cache';

const GITHUB_API_BASE = 'https://api.github.com';

function getAuthHeaders() {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  return token ? {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  } : {
    'Accept': 'application/vnd.github.v3+json'
  };
}

export async function fetchRepository(owner: string, repo: string): Promise<Repository> {
  const cacheKey = `repo-${owner}-${repo}`;
  const cached = getCache<Repository>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Repository "${owner}/${repo}" not found. Please check the repository name and ensure it's public.`);
    } else if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please add a GitHub token or try again later.');
    } else {
      throw new Error(`Failed to fetch repository: ${response.status} ${response.statusText}`);
    }
  }
  
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

export async function fetchLanguages(owner: string, repo: string): Promise<Languages> {
  const cacheKey = `languages-${owner}-${repo}`;
  const cached = getCache<Languages>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please add a GitHub token or try again later.');
    }
    throw new Error(`Failed to fetch languages: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

export async function fetchCommitActivity(owner: string, repo: string): Promise<CommitActivity[]> {
  const cacheKey = `commits-${owner}-${repo}`;
  const cached = getCache<CommitActivity[]>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/commit_activity`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please add a GitHub token or try again later.');
    }
    throw new Error(`Failed to fetch commit activity: ${response.status} ${response.statusText}`);
  }
  
  // GitHub returns 202 when data is still being computed
  if (response.status === 202) {
    return [];
  }
  
  const data = await response.json();
  // Ensure we always return an array
  const result = Array.isArray(data) ? data : [];
  setCache(cacheKey, result);
  return result;
}

export async function fetchContributors(owner: string, repo: string): Promise<Contributor[]> {
  const cacheKey = `contributors-${owner}-${repo}`;
  const cached = getCache<Contributor[]>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=10`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please add a GitHub token or try again later.');
    }
    throw new Error(`Failed to fetch contributors: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  // Ensure we always return an array
  const result = Array.isArray(data) ? data : [];
  setCache(cacheKey, result);
  return result;
}

export async function fetchRepositoryData(owner: string, repo: string) {
  const [repository, languages, commitActivity, contributors] = await Promise.all([
    fetchRepository(owner, repo),
    fetchLanguages(owner, repo),
    fetchCommitActivity(owner, repo),
    fetchContributors(owner, repo)
  ]);

  return {
    repository,
    languages,
    commitActivity,
    contributors
  };
}