# Hermes Agent Desktop App (Tauri)

基于 Tauri 框架构建的 Hermes Agent 桌面应用程序，提供原生桌面体验。

## 功能特性

- 🖥️ **原生桌面应用** - 跨平台支持 (Windows, macOS, Linux)
- ⚡ **高性能** - 基于 Rust 后端，轻量级且快速
- 🔌 **Python 集成** - 无缝调用 Python agent 后端
- 🎨 **现代 UI** - 使用 React + TypeScript + Tailwind CSS
- 📦 **独立打包** - 生成可执行文件，无需安装 Python 环境（可选）

## 前置要求

### 1. Rust 工具链

访问 [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install) 安装 Rust。

Windows 用户可以使用：
```powershell
winget install --id Rustlang.Rustup
```

### 2. Node.js 和 npm

确保已安装 Node.js >= 20.0.0 和 npm。

### 3. Python 3.11+

用于运行 Hermes Agent 后端（如果需要集成功能）。

## 开发

### 安装依赖

```bash
cd web
npm install
```

### 启动开发模式

```bash
npm run tauri:dev
```

这将同时启动：
- Vite 开发服务器 (http://localhost:5173)
- Tauri 桌面应用窗口

### 单独运行前端

```bash
npm run dev
```

## 构建

### 生产构建

```bash
npm run tauri:build
```

构建产物位于 `web/src-tauri/target/release/bundle/` 目录下。

### Debug 构建

```bash
npm run tauri:build:debug
```

## 项目结构

```
web/
├── src/                    # React 前端源码
│   ├── components/         # React 组件
│   │   └── AgentStatusCard.tsx  # Agent 状态卡片组件
│   ├── hooks/             # React Hooks
│   │   └── useAgent.ts    # Agent 状态管理 Hook
│   ├── lib/               # 工具库
│   │   └── tauri-api.ts   # Tauri API 封装
│   └── ...
├── src-tauri/             # Tauri Rust 后端
│   ├── src/
│   │   ├── main.rs        # 应用入口
│   │   ├── lib.rs         # Tauri 配置和插件
│   │   └── commands.rs    # Tauri 命令实现
│   ├── Cargo.toml         # Rust 依赖配置
│   └── tauri.conf.json    # Tauri 应用配置
└── package.json           # Node.js 依赖配置
```

## Tauri Commands

可用的 Rust 命令：

- `start_agent()` - 启动 Python agent 进程
- `stop_agent()` - 停止 agent 进程
- `get_agent_status()` - 获取 agent 运行状态
- `send_message(message)` - 发送消息到 agent
- `get_session_history(sessionId?)` - 获取会话历史
- `open_settings()` - 打开设置

## 在前端中使用

```typescript
import { useAgent } from './hooks/useAgent';

function MyComponent() {
  const { status, start, stop, loading, error } = useAgent();

  return (
    <div>
      <p>Status: {status.message}</p>
      <button onClick={start} disabled={loading}>
        Start Agent
      </button>
      <button onClick={stop} disabled={loading}>
        Stop Agent
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

## 配置

### 窗口配置

编辑 `web/src-tauri/tauri.conf.json`:

```json
{
  "app": {
    "windows": [
      {
        "title": "Hermes Agent",
        "width": 1280,
        "height": 800,
        "minWidth": 800,
        "minHeight": 600
      }
    ]
  }
}
```

### Rust 依赖

编辑 `web/src-tauri/Cargo.toml` 添加新的插件或依赖。

## 故障排除

### Rust 编译错误

确保安装了最新版本的 Rust：
```bash
rustup update
```

### 端口冲突

如果 5173 端口被占用，修改 `vite.config.ts` 中的端口配置。

### Python 路径问题

确保 `run_agent.py` 在项目根目录存在，或者修改 `commands.rs` 中的路径。

## 更多资源

- [Tauri 官方文档](https://tauri.app/)
- [Tauri API 参考](https://tauri.app/reference/)
- [Rust 书籍](https://doc.rust-lang.org/book/)

## License

MIT - 与主项目保持一致
