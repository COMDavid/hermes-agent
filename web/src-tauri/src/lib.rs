mod commands;

use tauri::Manager;

pub use commands::AgentState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let agent_state = AgentState::new();
    run_with_state(agent_state);
}

pub fn run_with_state(agent_state: AgentState) {
  tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .manage(agent_state)
    .invoke_handler(tauri::generate_handler![
      commands::start_agent,
      commands::stop_agent,
      commands::get_agent_status,
      commands::send_message,
      commands::get_session_history,
      commands::open_settings,
    ])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      
      // 设置窗口标题和图标
      let window = app.get_webview_window("main").unwrap();
      window.set_title("Hermes Agent").unwrap();
      
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
