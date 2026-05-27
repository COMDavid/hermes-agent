import React from 'react';
import { useAgent } from '../hooks/useAgent';
import { Play, Square, RefreshCw, AlertCircle } from 'lucide-react';

export const AgentStatusCard: React.FC = () => {
  const { status, loading, error, start, stop, refresh } = useAgent();

  const getStatusColor = () => {
    if (status.running) return 'bg-green-500';
    if (error) return 'bg-red-500';
    return 'bg-gray-500';
  };

  const getStatusText = () => {
    if (status.running) return 'Running';
    if (error) return 'Error';
    return 'Stopped';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Hermes Agent Status
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {status.pid && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Process ID: {status.pid}
          </div>
        )}
        
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {status.message}
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-200">{error}</div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {!status.running ? (
            <button
              onClick={start}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              {loading ? 'Starting...' : 'Start Agent'}
            </button>
          ) : (
            <button
              onClick={stop}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Square className="w-4 h-4" />
              {loading ? 'Stopping...' : 'Stop Agent'}
            </button>
          )}

          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};
