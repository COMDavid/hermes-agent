import { invoke } from '@tauri-apps/api/core';

export interface AgentStatus {
  running: boolean;
  pid?: number;
  message: string;
}

/**
 * 启动 Hermes Agent
 */
export async function startAgent(): Promise<string> {
  try {
    return await invoke<string>('start_agent');
  } catch (error) {
    console.error('Failed to start agent:', error);
    throw error;
  }
}

/**
 * 停止 Hermes Agent
 */
export async function stopAgent(): Promise<string> {
  try {
    return await invoke<string>('stop_agent');
  } catch (error) {
    console.error('Failed to stop agent:', error);
    throw error;
  }
}

/**
 * 获取 Agent 运行状态
 */
export async function getAgentStatus(): Promise<AgentStatus> {
  try {
    return await invoke<AgentStatus>('get_agent_status');
  } catch (error) {
    console.error('Failed to get agent status:', error);
    throw error;
  }
}

/**
 * 发送消息到 Agent
 */
export async function sendMessage(message: string): Promise<string> {
  try {
    return await invoke<string>('send_message', { message });
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
}

/**
 * 获取会话历史
 */
export async function getSessionHistory(sessionId?: string): Promise<string> {
  try {
    return await invoke<string>('get_session_history', { sessionId });
  } catch (error) {
    console.error('Failed to get session history:', error);
    throw error;
  }
}

/**
 * 打开设置
 */
export async function openSettings(): Promise<void> {
  try {
    await invoke('open_settings');
  } catch (error) {
    console.error('Failed to open settings:', error);
    throw error;
  }
}
