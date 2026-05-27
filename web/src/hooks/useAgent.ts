import { useState, useEffect, useCallback } from 'react';
import * as tauriApi from '../lib/tauri-api';
import type { AgentStatus } from '../lib/tauri-api';

export function useAgent() {
  const [status, setStatus] = useState<AgentStatus>({
    running: false,
    message: 'Agent is not running',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取 agent 状态
  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const newStatus = await tauriApi.getAgentStatus();
      setStatus(newStatus);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch status');
    } finally {
      setLoading(false);
    }
  }, []);

  // 启动 agent
  const start = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await tauriApi.startAgent();
      console.log('Agent started:', result);
      await fetchStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start agent');
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  // 停止 agent
  const stop = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await tauriApi.stopAgent();
      console.log('Agent stopped:', result);
      await fetchStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop agent');
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  // 发送消息
  const send = useCallback(async (message: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await tauriApi.sendMessage(message);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 获取会话历史
  const getHistory = useCallback(async (sessionId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await tauriApi.getSessionHistory(sessionId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get session history');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 组件挂载时获取状态
  useEffect(() => {
    fetchStatus();
    
    // 每 5 秒刷新一次状态
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return {
    status,
    loading,
    error,
    start,
    stop,
    send,
    getHistory,
    refresh: fetchStatus,
  };
}
