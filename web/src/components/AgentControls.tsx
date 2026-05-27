import React from 'react';
import { useAgent } from '../hooks/useAgent';
import { Activity, Terminal } from 'lucide-react';

/**
 * AgentControlBar - 一个简洁的 Agent 控制栏组件
 * 可以嵌入到任何页面中
 */
export const AgentControlBar: React.FC = () => {
  const { status, loading, start, stop } = useAgent();

  if (!status.running && !loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Agent is stopped
          </span>
          <button
            onClick={start}
            disabled={loading}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors disabled:opacity-50"
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-green-200 dark:border-green-800">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Activity className="w-5 h-5 text-green-500" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Agent Running
          </span>
          {status.pid && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              PID: {status.pid}
            </span>
          )}
        </div>
        <button
          onClick={stop}
          disabled={loading}
          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors disabled:opacity-50"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

/**
 * AgentTerminal - 简化的终端显示组件
 */
export const AgentTerminal: React.FC<{ messages: string[] }> = ({ messages }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
        <Terminal className="w-4 h-4 text-green-400" />
        <span className="text-gray-300">Hermes Agent Terminal</span>
      </div>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-green-400">
            <span className="text-gray-500">{`>`}</span> {msg}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-gray-500 italic">No messages yet...</div>
        )}
      </div>
    </div>
  );
};

/**
 * QuickActionCard - 快速操作卡片
 */
export const QuickActionCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: 'blue' | 'purple' | 'green' | 'orange';
}> = ({ title, description, icon, onClick, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-800',
    green: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 border-orange-200 dark:border-orange-800',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border transition-all text-left ${colorClasses[color]}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};
