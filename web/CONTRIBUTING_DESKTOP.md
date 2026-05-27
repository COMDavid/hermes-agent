# Hermes Agent Desktop - 贡献指南

欢迎为 Hermes Agent 桌面端做出贡献！本指南将帮助你快速开始。

## 🌟 如何贡献

### 1. 报告问题 🐛

发现 bug？请通过以下方式报告：

1. 搜索 [现有 Issues](https://github.com/NousResearch/hermes-agent/issues) 确保问题未被报告
2. 创建新的 Issue，包含：
   - 清晰的标题
   - 复现步骤
   - 预期行为 vs 实际行为
   - 系统信息（OS, Rust版本, Node版本）
   - 相关日志或截图

### 2. 提出新功能 💡

有新想法？

1. 先创建 Issue 讨论想法
2. 说明功能的必要性和使用场景
3. 等待社区反馈和维护者确认

### 3. 提交代码 🔧

#### 准备工作

```bash
# Fork 项目
# 克隆到你的本地
git clone https://github.com/YOUR_USERNAME/hermes-agent.git
cd hermes-agent

# 添加上游远程仓库
git remote add upstream https://github.com/NousResearch/hermes-agent.git

# 创建开发分支
git checkout -b feature/your-feature-name
```

#### 开发流程

1. **保持同步**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **编写代码**
   - 遵循现有代码风格
   - 添加必要的注释
   - 确保类型安全（TypeScript + Rust）

3. **测试**
   ```bash
   # 前端测试
   cd web
   npm run build
   
   # Rust 测试（需要安装 Rust）
   cd src-tauri
   cargo test
   ```

4. **提交**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **推送**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **创建 Pull Request**
   - 访问你的 fork
   - 点击 "Compare & pull request"
   - 填写 PR 描述
   - 关联相关 Issue

## 📋 代码规范

### Rust 代码规范

- 遵循 [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/)
- 使用 `cargo fmt` 格式化代码
- 运行 `cargo clippy` 检查代码质量
- 添加文档注释

```rust
/// 启动 Hermes Agent 进程
/// 
/// # Returns
/// * `Ok(String)` - 成功消息
/// * `Err(String)` - 错误信息
#[tauri::command]
pub async fn start_agent() -> Result<String, String> {
    // 实现
}
```

### TypeScript 代码规范

- 使用 ESLint 和 Prettier
- 所有函数和接口必须有类型注解
- 使用有意义的变量名
- 添加 JSDoc 注释

```typescript
/**
 * 启动 Hermes Agent
 * @returns 成功消息
 * @throws 启动失败时抛出错误
 */
export async function startAgent(): Promise<string> {
  // 实现
}
```

### React 组件规范

- 使用函数式组件 + Hooks
- 组件文件使用 PascalCase
- Props 接口命名为 `{ComponentName}Props`
- 导出时使用 named export

```typescript
interface AgentStatusCardProps {
  className?: string;
}

export const AgentStatusCard: React.FC<AgentStatusCardProps> = ({ className }) => {
  // 实现
};
```

## 🎯 贡献领域

### 高优先级

1. **性能优化**
   - WebSocket 替代 HTTP 轮询
   - 虚拟列表优化大量数据渲染
   - 懒加载和代码分割

2. **用户体验**
   - 系统托盘集成
   - 通知系统
   - 快捷键支持
   - 更多主题

3. **功能增强**
   - 离线模式
   - 本地数据库集成
   - 多窗口管理
   - 插件系统

### 中等优先级

1. **移动端支持**
   - Tauri Mobile 适配
   - 触摸手势优化
   - 响应式布局改进

2. **国际化**
   - 多语言支持
   - RTL 布局
   - 区域设置

3. **可访问性**
   - 键盘导航
   - 屏幕阅读器支持
   - 高对比度模式

### 低优先级

1. **文档改进**
   - 教程和示例
   - API 文档完善
   - 视频演示

2. **测试覆盖**
   - 单元测试
   - 集成测试
   - E2E 测试

## 🔍 Code Review 流程

1. 自动检查
   - CI 运行测试
   - Lint 检查
   - 构建验证

2. 人工审查
   - 代码质量
   - 功能正确性
   - 性能影响
   - 安全性

3. 合并
   - 至少一个维护者批准
   - 所有检查通过
   - Squash and merge

## 🏷️ Git Commit 规范

使用 [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

**示例:**
```
feat(desktop): add system tray support

Add system tray icon with context menu for quick access
to agent controls.

Closes #123
```

## 📚 学习资源

### Tauri
- [官方文档](https://tauri.app/)
- [Tauri API](https://tauri.app/reference/)
- [Awesome Tauri](https://github.com/tauri-apps/awesome-tauri)

### Rust
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Tokio Tutorial](https://tokio.rs/tokio/tutorial)

### React & TypeScript
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 社区行为准则

我们致力于提供友好、包容的环境。请：

- ✅ 尊重他人
- ✅ 建设性批评
- ✅ 帮助新手
- ❌ 人身攻击
- ❌ 歧视性言论
- ❌ 骚扰行为

## 🎁 贡献者权益

- 在 README 中署名
- 参与项目决策讨论
- 优先获得新功能预览
- 社区认可和支持

## ❓ 常见问题

**Q: 我需要 Rust 经验吗？**  
A: 基础 Rust 知识即可，我们欢迎所有水平的贡献者。可以从文档或小修复开始。

**Q: 如何测试我的改动？**  
A: 运行 `npm run tauri:dev` 进行开发测试，确保功能正常且无控制台错误。

**Q: PR 多久会被审查？**  
A: 通常 1-3 个工作日，复杂功能可能需要更长时间。

**Q: 我可以同时处理多个 PR 吗？**  
A: 可以，但建议先完成一个再开始下一个。

## 🙏 感谢

感谢所有贡献者让 Hermes Agent 变得更好！

[贡献者列表](https://github.com/NousResearch/hermes-agent/graphs/contributors)

---

**准备好了吗？** 选择一个 issue 开始吧！🚀
