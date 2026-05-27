# Hermes Agent Desktop - Quick Start Guide

## 5分钟快速开始

### 1. 安装前置依赖

#### Windows
```powershell
# 安装 Rust
winget install --id Rustlang.Rustup

# 安装 Node.js (如果还没有)
winget install OpenJS.NodeJS.LTS
```

#### macOS
```bash
# 使用 Homebrew 安装
brew install rustup node
rustup-init
```

#### Linux (Ubuntu/Debian)
```bash
# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. 启动桌面应用

**方式一：使用启动脚本（推荐）**

Windows:
```powershell
.\launch-desktop.bat
```

Linux/macOS:
```bash
chmod +x launch-desktop.sh
./launch-desktop.sh
```

**方式二：手动启动**

```bash
cd web
npm install
npm run tauri:dev
```

### 3. 首次使用

启动后你会看到：
1. **Agent 状态卡片** - 显示当前运行状态
2. **控制按钮** - 启动/停止 Agent
3. **快速操作** - 新建聊天、查看历史、设置

点击 "Start Agent" 按钮启动 Python 后端。

## 常用操作

### 开发模式
```bash
npm run tauri:dev
```
- 热重载支持
- 实时查看代码修改效果
- 适合开发和调试

### 生产构建
```bash
npm run tauri:build
```
- 生成可执行文件
- 位于 `web/src-tauri/target/release/bundle/`
- 可以分发给其他用户

### Debug 构建
```bash
npm run tauri:build:debug
```
- 包含调试信息
- 适合测试和故障排查

## 项目结构

```
hermes-agent-main/
├── web/                      # Web 前端目录
│   ├── src/                  # React 源码
│   │   ├── components/       # UI 组件
│   │   ├── hooks/           # React Hooks
│   │   └── lib/             # 工具库
│   ├── src-tauri/           # Tauri Rust 后端
│   │   ├── src/             # Rust 源码
│   │   ├── Cargo.toml       # Rust 依赖
│   │   └── tauri.conf.json  # Tauri 配置
│   └── package.json         # Node.js 依赖
├── launch-desktop.bat       # Windows 启动脚本
└── launch-desktop.sh        # Unix 启动脚本
```

## 常见问题

### Q: Rust 编译失败
**A:** 确保安装了最新版本的 Rust：
```bash
rustup update
```

### Q: 端口被占用
**A:** 修改 `vite.config.ts` 中的端口，或关闭占用 5173 端口的程序。

### Q: Python agent 无法启动
**A:** 确保在项目根目录有 `run_agent.py` 文件，并且已安装 Python 依赖：
```bash
uv pip install -e ".[all]"
```

### Q: 如何自定义窗口大小？
**A:** 编辑 `web/src-tauri/tauri.conf.json`：
```json
{
  "app": {
    "windows": [{
      "width": 1400,
      "height": 900
    }]
  }
}
```

### Q: 如何添加新的功能？
**A:** 
1. 在 `commands.rs` 中添加新的 Tauri command
2. 在 `lib.rs` 中注册 command
3. 在 `tauri-api.ts` 中添加前端调用封装
4. 在 React 组件中使用

## 下一步

- 📖 阅读完整的 [Tauri 文档](web/TAURI_README.md)
- 💻 查看 [Tauri 官方文档](https://tauri.app/)
- 🐛 遇到问题？提交 [Issue](https://github.com/NousResearch/hermes-agent/issues)

## 贡献

欢迎贡献代码！请阅读 [CONTRIBUTING.md](../CONTRIBUTING.md) 了解如何参与项目开发。
