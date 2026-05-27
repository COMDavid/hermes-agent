// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  // 初始化 AgentState
  let agent_state = app_lib::AgentState::new();
  
  app_lib::run_with_state(agent_state);
}
