import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Languages } from '../types';

interface LanguageChartProps {
  languages: Languages;
}

const LANGUAGE_COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

export function LanguageChart({ languages }: LanguageChartProps) {
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  
  const chartData = Object.entries(languages)
    .map(([language, bytes], index) => ({
      name: language,
      bytes,
      percentage: ((bytes / totalBytes) * 100).toFixed(1),
      color: LANGUAGE_COLORS[index % LANGUAGE_COLORS.length]
    }))
    .sort((a, b) => b.bytes - a.bytes);

  const renderTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {(data.bytes / 1024).toFixed(1)} KB ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Language Composition</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="bytes"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={renderTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {chartData.slice(0, 6).map((lang) => (
          <div key={lang.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
              {lang.name} ({lang.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}