# Tauri 桌面端 - 环境设置指南

## 📋 前置要求检查清单

在开始之前，请确保你的系统已安装以下工具：

### 1. Rust 工具链 ⚙️

**Windows:**
```powershell
# 方法一：使用 winget（推荐）
winget install --id Rustlang.Rustup

# 方法二：使用官方安装脚本
Invoke-WebRequest https://win.rustup.rs/x86_64 -OutFile rustup-init.exe
.\rustup-init.exe
```

**macOS:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Linux:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**验证安装:**
```bash
rustc --version
cargo --version
rustup --version
```

应该看到类似输出：
```
rustc 1.77.2 (xxx)
cargo 1.77.2 (xxx)
rustup 1.27.0 (xxx)
```

### 2. Node.js 和 npm 🟢

**要求:** Node.js >= 20.0.0

**Windows:**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS:**
```bash
brew install node
```

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fedora
sudo dnf install nodejs

# Arch Linux
sudo pacman -S nodejs npm
```

**验证安装:**
```bash
node --version   # 应该 >= v20.0.0
npm --version
```

### 3. Python 3.11+ 🐍

Hermes Agent 后端需要 Python。

**Windows:**
```powershell
winget install Python.Python.3.11
```

**macOS:**
```bash
brew install python@3.11
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install python3.11 python3.11-venv python3.11-dev

# Fedora
sudo dnf install python3.11

# Arch Linux
sudo pacman -S python
```

**验证安装:**
```bash
python3 --version
```

### 4. 构建工具 🔨

**Windows:**
- 安装 Visual Studio Build Tools 2019 或更高版本
- 选择 "Desktop development with C++" 工作负载
- 或者使用 winget:
```powershell
winget install Microsoft.VisualStudio.2022.BuildTools
```

**macOS:**
```bash
xcode-select --install
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install build-essential pkg-config libssl-dev libgtk-3-dev libwebkit2gtk-4.0-dev libappindicator3-dev librsvg2-dev

# Fedora
sudo dnf groupinstall "Development Tools"
sudo dnf install openssl-devel webkit2gtk3-devel appindicator-gtk3-devel librsvg2-devel

# Arch Linux
sudo pacman -S base-devel openssl gtk3 webkit2gtk appindicator-gtk3 librsvg
```

## 🚀 快速设置脚本

### Windows PowerShell 一键设置

创建 `setup-tauri.ps1`:

```powershell
# setup-tauri.ps1
Write-Host "Setting up Tauri development environment..." -ForegroundColor Green

# Check and install Rust
if (-not (Get-Command rustc -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Rust..." -ForegroundColor Yellow
    winget install --id Rustlang.Rustup
}

# Check and install Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Node.js..." -ForegroundColor Yellow
    winget install OpenJS.NodeJS.LTS
}

# Install dependencies
cd web
Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "Run 'npm run tauri:dev' to start development mode" -ForegroundColor Cyan
```

运行：
```powershell
.\setup-tauri.ps1
```

### macOS/Linux Bash 一键设置

创建 `setup-tauri.sh`:

```bash
#!/bin/bash
echo "Setting up Tauri development environment..."

# Check and install Rust
if ! command -v rustc &> /dev/null; then
    echo "Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source $HOME/.cargo/env
fi

# Check and install Node.js
if ! command -v node &> /dev/null; then
    echo "Please install Node.js >= 20.0.0 from https://nodejs.org/"
    exit 1
fi

# Install dependencies
cd web
echo "Installing Node.js dependencies..."
npm install

echo "Setup complete!"
echo "Run 'npm run tauri:dev' to start development mode"
```

运行：
```bash
chmod +x setup-tauri.sh
./setup-tauri.sh
```

## 🔧 常见问题解决

### 问题 1: Rust 编译失败

**症状:**
```
error: linker `cc` not found
```

**解决方案:**

**Windows:**
- 确保安装了 Visual Studio Build Tools
- 重启终端

**Linux:**
```bash
sudo apt-get install build-essential gcc
```

### 问题 2: GTK 库缺失

**症状:**
```
error: failed to run custom build command for `gtk-sys`
```

**解决方案:**

**Ubuntu/Debian:**
```bash
sudo apt-get install libgtk-3-dev libwebkit2gtk-4.0-dev libappindicator3-dev librsvg2-dev
```

**Fedora:**
```bash
sudo dnf install gtk3-devel webkit2gtk3-devel libappindicator-gtk3-devel librsvg2-devel
```

### 问题 3: Node.js 版本过低

**症状:**
```
error This project requires Node.js >= 20.0.0
```

**解决方案:**

使用 nvm (Node Version Manager):

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安装 Node.js 20
nvm install 20
nvm use 20
nvm alias default 20
```

### 问题 4: 端口被占用

**症状:**
```
Port 5173 is already in use
```

**解决方案:**

修改 `web/vite.config.ts`:
```typescript
server: {
  port: 5174,  // 改为其他端口
  // ...
}
```

同时更新 `web/src-tauri/tauri.conf.json`:
```json
{
  "build": {
    "devUrl": "http://localhost:5174"
  }
}
```

### 问题 5: Cargo 依赖下载慢

**解决方案:**

配置国内镜像源，编辑 `~/.cargo/config.toml`:

```toml
[source.crates-io]
replace-with = 'ustc'

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

## 📦 验证安装

运行以下命令验证所有依赖是否正确安装：

```bash
# 检查 Rust
rustc --version
cargo --version

# 检查 Node.js
node --version
npm --version

# 检查 Python
python3 --version

# 进入项目目录
cd web

# 安装依赖
npm install

# 尝试开发模式
npm run tauri:dev
```

如果一切正常，Tauri 应用窗口应该会打开！

## 🎯 下一步

环境设置完成后：

1. 📖 阅读 [快速入门指南](DESKTOP_QUICKSTART.md)
2. 💻 查看 [完整文档](TAURI_README.md)
3. 🚀 开始开发：`npm run tauri:dev`

## 🆘 获取帮助

遇到问题？

- 📚 [Tauri 官方文档](https://tauri.app/)
- 💬 [Discord 社区](https://discord.gg/tauri)
- 🐛 [提交 Issue](https://github.com/NousResearch/hermes-agent/issues)

---

**提示:** 首次构建可能需要较长时间（5-15分钟），因为需要编译 Rust 依赖。后续构建会快很多！
