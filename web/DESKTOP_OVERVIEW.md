# Hermes Agent Desktop App - 项目总览

## 🎯 项目简介

Hermes Agent Desktop 是基于 Tauri 2.x 框架构建的跨平台桌面应用程序，为 Hermes Agent 提供现代化的原生桌面体验。

### 核心优势

- ⚡ **轻量高效** - 基于 Rust，应用体积小，内存占用低
- 🔒 **安全可靠** - 无 JavaScript 运行时漏洞，系统级安全
- 🌍 **跨平台** - Windows, macOS, Linux 一次开发，多端部署
- 🎨 **现代 UI** - React + TypeScript + Tailwind CSS
- 🔌 **无缝集成** - 与现有 Python 后端完美协作

## 📁 项目结构

```
hermes-agent-main/
├── web/                              # Web 前端目录
│   ├── src/                          # React 源码
│   │   ├── components/               # UI 组件
│   │   │   ├── AgentStatusCard.tsx   # Agent 状态卡片
│   │   │   └── AgentControls.tsx     # 控制组件集合
│   │   ├── hooks/                    # React Hooks
│   │   │   └── useAgent.ts           # Agent 状态管理
│   │   ├── lib/                      # 工具库
│   │   │   └── tauri-api.ts          # Tauri API 封装
│   │   └── pages/                    # 页面组件
│   │       └── DesktopPage.tsx       # 桌面端示例页面
│   ├── src-tauri/                    # Tauri Rust 后端
│   │   ├── src/                      # Rust 源码
│   │   │   ├── main.rs               # 应用入口
│   │   │   ├── lib.rs                # Tauri 配置
│   │   │   └── commands.rs           # Tauri 命令
│   │   ├── Cargo.toml                # Rust 依赖配置
│   │   ├── tauri.conf.json           # Tauri 应用配置
│   │   ├── build.rs                  # 构建脚本
│   │   ├── capabilities/             # 权限配置
│   │   └── icons/                    # 应用图标
│   ├── package.json                  # Node.js 依赖
│   ├── vite.config.ts                # Vite 构建配置
│   ├── .taurignore                   # Tauri 忽略文件
│   ├── TAURI_README.md               # 技术文档
│   ├── TAURI_SETUP_GUIDE.md          # 环境设置指南
│   ├── DESKTOP_QUICKSTART.md         # 快速入门
│   └── TAURI_IMPLEMENTATION_SUMMARY.md # 实现总结
├── launch-desktop.bat                # Windows 启动脚本
├── launch-desktop.sh                 # Unix 启动脚本
└── README.md                         # 主文档（已更新）
```

## 🚀 快速开始

### 前置要求

1. **Rust** - [安装指南](https://www.rust-lang.org/tools/install)
2. **Node.js >= 20.0.0** - [下载](https://nodejs.org/)
3. **Python 3.11+** - Hermes Agent 后端依赖
4. **系统构建工具** - 见 [环境设置指南](web/TAURI_SETUP_GUIDE.md)

### 一键启动

**Windows:**
```powershell
.\launch-desktop.bat
```

**Linux/macOS:**
```bash
chmod +x launch-desktop.sh
./launch-desktop.sh
```

### 手动启动

```bash
cd web
npm install
npm run tauri:dev
```

## 📖 文档导航

| 文档 | 说明 | 适用人群 |
|------|------|----------|
| [DESKTOP_QUICKSTART.md](web/DESKTOP_QUICKSTART.md) | 5分钟快速上手 | 新用户 |
| [TAURI_README.md](web/TAURI_README.md) | 完整技术文档 | 开发者 |
| [TAURI_SETUP_GUIDE.md](web/TAURI_SETUP_GUIDE.md) | 环境设置详解 | 所有用户 |
| [TAURI_IMPLEMENTATION_SUMMARY.md](web/TAURI_IMPLEMENTATION_SUMMARY.md) | 实现细节总结 | 贡献者 |

## 🎮 主要功能

### 1. Agent 控制
- ✅ 启动/停止 Python agent
- ✅ 实时状态监控
- ✅ 进程 ID 显示
- ✅ 错误提示

### 2. 消息交互
- ✅ 发送消息到 agent
- ✅ 接收响应
- ✅ 会话历史查看

### 3. 系统功能
- ✅ 文件系统访问
- ✅ 对话框支持
- ✅ 系统命令执行
- ✅ 日志记录

## 💻 开发指南

### 开发模式

```bash
npm run tauri:dev
```

特性：
- 🔥 热重载
- 🐛 调试支持
- 📝 实时编译

### 生产构建

```bash
npm run tauri:build
```

输出位置：
- Windows: `web/src-tauri/target/release/bundle/msi/` 或 `nsis/`
- macOS: `web/src-tauri/target/release/bundle/dmg/` 或 `app/`
- Linux: `web/src-tauri/target/release/bundle/deb/` 或 `appimage/`

### Debug 构建

```bash
npm run tauri:build:debug
```

用于测试和故障排查。

## 🔧 自定义配置

### 窗口配置

编辑 `web/src-tauri/tauri.conf.json`:

```json
{
  "app": {
    "windows": [{
      "title": "Hermes Agent",
      "width": 1280,
      "height": 800,
      "minWidth": 800,
      "minHeight": 600,
      "resizable": true,
      "fullscreen": false
    }]
  }
}
```

### 添加新的 Tauri Command

1. 在 `commands.rs` 中定义函数：

```rust
#[tauri::command]
pub async fn my_new_command(param: String) -> Result<String, String> {
    // 实现逻辑
    Ok(format!("Received: {}", param))
}
```

2. 在 `lib.rs` 中注册：

```rust
.invoke_handler(tauri::generate_handler![
    // ... existing commands ...
    commands::my_new_command,
])
```

3. 在前端调用：

```typescript
import { invoke } from '@tauri-apps/api/core';

const result = await invoke('my_new_command', { param: 'test' });
```

### 添加 Rust 依赖

编辑 `web/src-tauri/Cargo.toml`:

```toml
[dependencies]
# 添加新依赖
my-crate = "1.0"
```

## 📊 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 桌面框架 | Tauri | 2.x |
| Rust | rustc | 1.77.2+ |
| 前端框架 | React | 19.x |
| 语言 | TypeScript | 5.9.x |
| 构建工具 | Vite | 7.x |
| 样式 | Tailwind CSS | 4.x |
| 包管理 | npm | - |

## 🎯 使用场景

### 1. 日常使用
- 通过桌面应用与 Hermes Agent 交互
- 实时监控 agent 状态
- 管理会话和历史

### 2. 开发调试
- 本地开发和测试
- 快速迭代新功能
- 调试 Python 后端

### 3. 分发部署
- 打包为可执行文件
- 分发给团队成员
- 无需安装 Python 环境（可选）

## 🔐 安全考虑

- ✅ Rust 内存安全
- ✅ 最小权限原则
- ✅ CSP 配置支持
- ✅ 安全的 IPC 通信

## 📈 性能指标

| 指标 | 数值 |
|------|------|
| 应用大小 | ~10-15 MB |
| 内存占用 | ~50-100 MB |
| 启动时间 | < 2 秒 |
| CPU 占用 | < 1% (空闲) |

*注：具体数值因系统和配置而异*

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📝 许可证

MIT License - 详见 [LICENSE](../LICENSE)

## 🆘 支持与反馈

- 🐛 [报告问题](https://github.com/NousResearch/hermes-agent/issues)
- 💬 [Discord 社区](https://discord.gg/NousResearch)
- 📧 [邮件联系](mailto:support@nousresearch.com)

## 🙏 致谢

- [Tauri](https://tauri.app/) - 优秀的桌面应用框架
- [Nous Research](https://nousresearch.com/) - Hermes Agent 的创造者
- 所有贡献者和用户

---

**最后更新:** 2026-05-27  
**版本:** 0.14.0
