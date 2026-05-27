use serde::{Deserialize, Serialize};
use std::process::Command;
use tauri::State;
use tokio::sync::Mutex;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentStatus {
    pub running: bool,
    pub pid: Option<u32>,
    pub message: String,
}

#[derive(Debug)]
pub struct AgentState {
    pub process: Mutex<Option<std::process::Child>>,
}

impl AgentState {
    pub fn new() -> Self {
        Self {
            process: Mutex::new(None),
        }
    }
}

#[tauri::command]
pub async fn start_agent(state: State<'_, AgentState>) -> Result<String, String> {
    let mut process_guard = state.process.lock().await;
    
    if process_guard.is_some() {
        return Err("Agent is already running".to_string());
    }
    
    // 启动 Python agent
    let child = Command::new("python")
        .args(&["run_agent.py"])
        .current_dir("..")
        .spawn()
        .map_err(|e| format!("Failed to start agent: {}", e))?;
    
    *process_guard = Some(child);
    
    Ok("Agent started successfully".to_string())
}

#[tauri::command]
pub async fn stop_agent(state: State<'_, AgentState>) -> Result<String, String> {
    let mut process_guard = state.process.lock().await;
    
    if let Some(mut child) = process_guard.take() {
        child.kill().map_err(|e| format!("Failed to stop agent: {}", e))?;
        child.wait().map_err(|e| format!("Failed to wait for agent: {}", e))?;
        Ok("Agent stopped successfully".to_string())
    } else {
        Err("Agent is not running".to_string())
    }
}

#[tauri::command]
pub async fn get_agent_status(state: State<'_, AgentState>) -> Result<AgentStatus, String> {
    let mut process_guard = state.process.lock().await;
    
    if let Some(ref mut child) = *process_guard {
        // 检查进程是否还在运行
        match child.try_wait() {
            Ok(Some(status)) => {
                Ok(AgentStatus {
                    running: false,
                    pid: None,
                    message: format!("Agent exited with status: {}", status),
                })
            }
            Ok(None) => {
                Ok(AgentStatus {
                    running: true,
                    pid: Some(child.id()),
                    message: "Agent is running".to_string(),
                })
            }
            Err(e) => {
                Ok(AgentStatus {
                    running: false,
                    pid: None,
                    message: format!("Error checking agent status: {}", e),
                })
            }
        }
    } else {
        Ok(AgentStatus {
            running: false,
            pid: None,
            message: "Agent is not running".to_string(),
        })
    }
}

#[tauri::command]
pub async fn send_message(message: String) -> Result<String, String> {
    // 这里可以通过 HTTP API 或其他方式与运行的 agent 通信
    // 暂时返回模拟响应
    Ok(format!("Message sent: {}", message))
}

#[tauri::command]
pub async fn get_session_history(_session_id: Option<String>) -> Result<String, String> {
    // 获取会话历史
    Ok("Session history retrieved".to_string())
}

#[tauri::command]
pub async fn open_settings() -> Result<(), String> {
    // 打开设置窗口或对话框
    Ok(())
}
