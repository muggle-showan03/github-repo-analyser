import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  type?: 'text' | 'card' | 'chart';
}

export function SkeletonLoader({ className = '', type = 'text' }: SkeletonLoaderProps) {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded";
  
  const typeClasses = {
    text: 'h-4',
    card: 'h-32',
    chart: 'h-64'
  };

  return <div className={`${baseClasses} ${typeClasses[type]} ${className}`} />;
}