import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CommitActivity } from '../types';

interface CommitChartProps {
  commitActivity: CommitActivity[];
}

export function CommitChart({ commitActivity }: CommitChartProps) {
  const chartData = commitActivity.map((week, index) => ({
    week: index + 1,
    commits: week.total,
    date: new Date(week.week * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }));

  const totalCommits = commitActivity.reduce((sum, week) => sum + week.total, 0);
  const avgCommitsPerWeek = Math.round(totalCommits / Math.max(commitActivity.length, 1));

  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{data.date}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {data.commits} commit{data.commits !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Commit Activity</h3>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Last 52 weeks</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Avg: {avgCommitsPerWeek}/week
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Tooltip content={renderTooltip} />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, fill: '#1D4ED8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Commits</p>
          <p className="font-semibold text-gray-900 dark:text-white">{totalCommits.toLocaleString()}</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg/Week</p>
          <p className="font-semibold text-gray-900 dark:text-white">{avgCommitsPerWeek}</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Peak Week</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {Math.max(...commitActivity.map(w => w.total))}
          </p>
        </div>
      </div>
    </div>
  );
}