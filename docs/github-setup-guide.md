# GitHub仓库创建和Issue管理指南

## 仓库创建步骤

### 1. 创建新仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `ai-weather`
   - **Description**: `AI天气查询网站 - 现代化、美观、响应式的网页版天气查询应用，基于Vue3 + TypeScript + Vite构建`
   - **Visibility**: Public (公开)
   - **Initialize**: ✅ Add a README file
   - **Add .gitignore**: Node
   - **Choose a license**: MIT License

4. 点击 "Create repository" 创建仓库

### 2. 仓库基础配置

#### 2.1 设置仓库标签 (Topics)
在仓库主页点击设置图标，添加以下标签：
```
vue3, typescript, vite, weather-app, responsive-design, 
sass, pinia, weather-api, frontend, web-development
```

#### 2.2 配置分支保护规则
1. 进入 Settings → Branches
2. 添加分支保护规则 for `main`：
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1)
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

#### 2.3 启用 GitHub Pages (可选)
1. 进入 Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `docs`
4. 用于部署项目文档或演示站点

## Issue模板配置

### 1. 创建Issue模板目录
在仓库根目录创建 `.github/ISSUE_TEMPLATE/` 目录

### 2. 功能需求模板
创建文件：`.github/ISSUE_TEMPLATE/feature_request.md`

```markdown
---
name: 功能需求
about: 提出新功能或功能改进建议
title: '[FEATURE] '
labels: 'enhancement'
assignees: ''
---

## 功能描述
简要描述你希望添加的功能

## 问题背景
描述当前存在的问题或不足

## 解决方案
描述你期望的解决方案

## 替代方案
描述你考虑过的其他解决方案

## 验收标准
- [ ] 标准1
- [ ] 标准2
- [ ] 标准3

## 优先级
- [ ] P0 (Critical) - 核心功能
- [ ] P1 (High) - 重要功能
- [ ] P2 (Medium) - 增强功能
- [ ] P3 (Low) - 优化功能

## 估时
- [ ] XS (0.5天)
- [ ] S (1天)
- [ ] M (2-3天)
- [ ] L (4-5天)
- [ ] XL (1周以上)
```

### 3. Bug报告模板
创建文件：`.github/ISSUE_TEMPLATE/bug_report.md`

```markdown
---
name: Bug报告
about: 报告项目中的问题或错误
title: '[BUG] '
labels: 'bug'
assignees: ''
---

## Bug描述
简要描述遇到的问题

## 复现步骤
1. 进入 '...'
2. 点击 '....'
3. 滚动到 '....'
4. 看到错误

## 期望行为
描述你期望发生的行为

## 实际行为
描述实际发生的行为

## 截图
如果适用，添加截图来帮助解释你的问题

## 环境信息
- 操作系统: [e.g. macOS, Windows, Linux]
- 浏览器: [e.g. Chrome, Safari, Firefox]
- 版本: [e.g. 22]
- 设备: [e.g. iPhone X, Desktop]

## 附加信息
添加任何其他关于问题的信息
```

### 4. 任务模板
创建文件：`.github/ISSUE_TEMPLATE/task.md`

```markdown
---
name: 开发任务
about: 创建开发任务
title: '[TASK] '
labels: 'task'
assignees: ''
---

## 任务描述
详细描述需要完成的任务

## 技术要点
- 技术点1
- 技术点2
- 技术点3

## 验收标准
- [ ] 标准1
- [ ] 标准2
- [ ] 标准3

## 相关文件
列出需要修改或创建的文件

## 依赖任务
- #issue_number
- #issue_number

## 优先级
- [ ] P0 (Critical)
- [ ] P1 (High)
- [ ] P2 (Medium)
- [ ] P3 (Low)

## 估时
- [ ] XS (0.5天)
- [ ] S (1天)
- [ ] M (2-3天)
- [ ] L (4-5天)
- [ ] XL (1周以上)
```

## 开发任务Issue创建

根据 `docs/development-tasks.md` 文档，创建以下开发任务Issue：

### Phase 1: 项目基础设施

#### Issue #1: 项目初始化
```
标题: [TASK] 项目初始化 - Vue3 + TypeScript + Vite环境搭建
标签: task, setup, P0
里程碑: Phase 1
估时: S (1天)

任务描述:
创建Vue3 + TypeScript + Vite项目，配置开发环境和代码规范

技术要点:
- 使用 npm create vue@latest 创建项目
- 配置 ESLint、Prettier 代码规范
- 设置 Git hooks 和提交规范
- 配置开发环境和构建脚本

验收标准:
- [ ] 项目可以正常启动和构建
- [ ] 代码规范检查正常工作
- [ ] Git提交规范配置完成
- [ ] 开发环境热更新正常
```

#### Issue #2: 基础UI组件库
```
标题: [TASK] 基础UI组件库开发
标签: task, ui, components, P0
里程碑: Phase 1
估时: M (2-3天)

任务描述:
创建基础UI组件库，实现响应式布局系统

技术要点:
- 创建基础UI组件(Button、Input、Card等)
- 实现响应式布局系统
- 配置Sass全局样式
- 组件API设计和文档

验收标准:
- [ ] 基础组件功能完整
- [ ] 响应式布局在各设备正常显示
- [ ] 组件API设计合理
- [ ] 样式变量和混入配置完成
```

#### Issue #3: 路由和状态管理
```
标题: [TASK] 路由和状态管理配置
标签: task, router, store, P0
里程碑: Phase 1
估时: S (1天)

任务描述:
配置Vue Router和Pinia状态管理系统

技术要点:
- 配置Vue Router路由系统
- 设置Pinia状态管理
- 创建全局状态store
- 实现路由守卫和权限控制

验收标准:
- [ ] 路由跳转正常工作
- [ ] 状态管理功能完整
- [ ] 路由守卫配置正确
- [ ] TypeScript类型定义完整
```

#### Issue #4: API服务层
```
标题: [TASK] API服务层封装和百度天气API集成
标签: task, api, weather, P0
里程碑: Phase 1
估时: M (2-3天)

任务描述:
封装HTTP请求客户端，集成百度天气API

技术要点:
- 封装HTTP请求客户端
- 集成百度天气API
- 实现请求拦截器和错误处理
- 配置API缓存策略

验收标准:
- [ ] API请求封装完成
- [ ] 百度天气API集成成功
- [ ] 错误处理机制完善
- [ ] 缓存策略正常工作
```

### Phase 2: 核心功能开发

#### Issue #5: 天气数据获取
```
标题: [TASK] 天气数据获取功能实现
标签: task, weather, data, P0
里程碑: Phase 2
估时: M (2-3天)
依赖: #4

任务描述:
实现天气数据获取和地理位置服务

技术要点:
- 实现当前天气数据获取
- 开发天气预报功能
- 集成地理位置服务
- 实现数据格式化和验证

验收标准:
- [ ] 当前天气数据正确显示
- [ ] 7天天气预报功能正常
- [ ] 地理位置获取成功
- [ ] 数据格式化正确
```

#### Issue #6: 主页面开发
```
标题: [TASK] 天气主页面UI开发
标签: task, ui, homepage, P0
里程碑: Phase 2
估时: L (4-5天)
依赖: #2, #5

任务描述:
开发天气主页面，实现天气信息展示

技术要点:
- 开发天气主页面布局
- 实现当前天气卡片组件
- 开发天气预报列表组件
- 实现响应式设计

验收标准:
- [ ] 主页面布局美观
- [ ] 天气信息显示完整
- [ ] 响应式适配正常
- [ ] 交互体验流畅
```

#### Issue #7: 城市搜索功能
```
标题: [TASK] 城市搜索功能开发
标签: task, search, P0
里程碑: Phase 2
估时: M (2-3天)
依赖: #4

任务描述:
开发城市搜索和搜索建议功能

技术要点:
- 开发城市搜索组件
- 实现搜索建议功能
- 集成城市数据库
- 实现搜索历史记录

验收标准:
- [ ] 搜索功能正常工作
- [ ] 搜索建议准确
- [ ] 历史记录保存正确
- [ ] 搜索体验流畅
```

#### Issue #8: 位置服务集成
```
标题: [TASK] 地理位置服务集成
标签: task, location, geolocation, P1
里程碑: Phase 2
估时: M (2-3天)

任务描述:
集成浏览器定位API，实现自动定位功能

技术要点:
- 集成浏览器定位API
- 实现位置权限处理
- 开发位置选择组件
- 实现位置缓存机制

验收标准:
- [ ] 自动定位功能正常
- [ ] 权限处理用户友好
- [ ] 位置选择界面美观
- [ ] 位置信息缓存有效
```

### Phase 3: 功能增强

#### Issue #9: 数据可视化
```
标题: [TASK] 天气数据可视化图表
标签: task, chart, visualization, P1
里程碑: Phase 3
估时: M (2-3天)
依赖: #5

任务描述:
开发天气数据可视化图表

技术要点:
- 开发温度趋势图表
- 实现降水概率图
- 创建风速风向图
- 优化图表响应式显示

验收标准:
- [ ] 图表数据准确
- [ ] 图表交互流畅
- [ ] 响应式适配良好
- [ ] 图表样式美观
```

#### Issue #10: 用户偏好设置
```
标题: [TASK] 用户偏好设置功能
标签: task, settings, theme, P1
里程碑: Phase 3
估时: S (1天)

任务描述:
开发用户偏好设置功能

技术要点:
- 开发设置页面
- 实现主题切换功能
- 添加温度单位切换
- 实现语言切换

验收标准:
- [ ] 设置页面功能完整
- [ ] 主题切换正常
- [ ] 单位切换生效
- [ ] 多语言支持正常
```

## 标签管理

### 创建标签
在仓库的 Issues 页面，点击 "Labels" 创建以下标签：

#### 类型标签
- `bug` (红色 #d73a49) - Bug报告
- `enhancement` (蓝色 #0075ca) - 功能增强
- `task` (绿色 #28a745) - 开发任务
- `documentation` (黄色 #ffd33d) - 文档相关
- `question` (紫色 #6f42c1) - 问题咨询

#### 优先级标签
- `P0` (红色 #b60205) - 关键优先级
- `P1` (橙色 #d93f0b) - 高优先级
- `P2` (黄色 #fbca04) - 中等优先级
- `P3` (绿色 #0e8a16) - 低优先级

#### 模块标签
- `ui` (浅蓝 #c5def5) - UI界面
- `api` (深蓝 #1d76db) - API接口
- `weather` (天蓝 #54aeff) - 天气功能
- `search` (紫色 #a2eeef) - 搜索功能
- `location` (绿色 #7057ff) - 位置服务
- `performance` (橙色 #e99695) - 性能优化
- `testing` (灰色 #f9f9f9) - 测试相关

#### 状态标签
- `in-progress` (黄色 #fbca04) - 进行中
- `review` (紫色 #6f42c1) - 待审核
- `blocked` (红色 #d73a49) - 阻塞
- `ready` (绿色 #28a745) - 准备就绪

## 里程碑管理

创建以下里程碑：

1. **Phase 1: 项目基础设施** (截止日期: 第1周)
   - 描述: 项目初始化、基础组件、路由状态管理、API服务层

2. **Phase 2: 核心功能开发** (截止日期: 第2周)
   - 描述: 天气数据获取、主页面开发、搜索功能、位置服务

3. **Phase 3: 功能增强** (截止日期: 第3周)
   - 描述: 数据可视化、用户设置、收藏功能、动画优化

4. **Phase 4: 性能优化和测试** (截止日期: 第4周)
   - 描述: 性能优化、错误处理、单元测试、E2E测试

5. **Phase 5: 部署和发布** (截止日期: 第5周)
   - 描述: 构建优化、部署配置、监控分析、文档完善

## 项目看板配置

### 创建项目看板
1. 进入仓库的 "Projects" 页面
2. 点击 "New project"
3. 选择 "Board" 模板
4. 项目名称: "AI Weather Development"

### 看板列设置
- **Backlog** - 待办任务
- **Ready** - 准备开始
- **In Progress** - 进行中
- **Review** - 代码审核
- **Testing** - 测试阶段
- **Done** - 已完成

### 自动化规则
- 当Issue被分配时，自动移动到 "Ready"
- 当PR创建时，自动移动到 "Review"
- 当PR合并时，自动移动到 "Done"

## 协作流程

### 开发流程
1. 从 `main` 分支创建功能分支
2. 在功能分支上开发
3. 提交代码并创建Pull Request
4. 代码审核通过后合并到 `main`
5. 关闭相关Issue

### 分支命名规范
- 功能分支: `feature/issue-{number}-{description}`
- 修复分支: `fix/issue-{number}-{description}`
- 热修复: `hotfix/{description}`

### 提交信息规范
```
type(scope): description

[optional body]

[optional footer]
```

类型:
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例:
```
feat(weather): add current weather display component

Implement WeatherCard component with temperature, condition, and humidity display.
Add responsive design for mobile and desktop views.

Closes #6
```

通过以上配置，我们可以建立一个完整的GitHub项目管理体系，确保开发过程的规范性和可追踪性。