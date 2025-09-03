const CACHE_PREFIX = 'github-analytics-';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

interface CachedData<T> {
  data: T;
  timestamp: number;
}

export function setCache<T>(key: string, data: T): void {
  const cacheData: CachedData<T> = {
    data,
    timestamp: Date.now()
  };
  
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to cache data:', error);
  }
}

export function getCache<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + key);
    if (!cached) return null;

    const parsedData: CachedData<T> = JSON.parse(cached);
    const isExpired = Date.now() - parsedData.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return parsedData.data;
  } catch (error) {
    console.warn('Failed to retrieve cache:', error);
    return null;
  }
}

export function clearCache(): void {
  try {
    const keys = Object.keys(localStorage).filter(key => key.startsWith(CACHE_PREFIX));
    keys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}