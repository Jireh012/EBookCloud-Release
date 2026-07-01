# EBookCloud 桌面版发布

本仓库用于发布 [EBookCloud](https://github.com/Jireh012/EBookCloud) 桌面客户端安装包。源代码与 issue 请前往主仓库。

## 下载

在 [Releases](https://github.com/Jireh012/EBookCloud-Release/releases) 页面选择对应平台：

| 平台 | 文件 | 说明 |
|------|------|------|
| Windows | `EBookCloud-*-windows-x64-setup.exe` | 64 位安装包 |
| macOS (Apple Silicon) | `EBookCloud-*-macos-arm64.dmg` | M 系列芯片 |
| macOS (Intel) | `EBookCloud-*-macos-x64.dmg` | Intel 芯片 |

## macOS：提示「已损坏，无法打开」？

这是 **Gatekeeper 拦截未公证应用** 的常见提示，**不是安装包损坏**。

当前发布包使用 ad-hoc 签名，尚未完成 Apple 公证，从浏览器下载后会带隔离属性，系统可能拒绝直接打开。

### 方法一：右键打开（推荐）

1. 打开 DMG，将 `EBookCloud.app` 拖入「应用程序」
2. **不要双击**，在「应用程序」中找到 `EBookCloud.app`
3. **右键** → **打开** → 在弹窗中再次点 **打开**
4. 首次确认后，之后可正常双击启动

### 方法二：终端移除隔离属性

**已安装到「应用程序」：**

```bash
xattr -cr /Applications/EBookCloud.app
```

**仍在 DMG 挂载卷中（未拷贝前）：**

```bash
xattr -cr "/Volumes/EBookCloud"*/EBookCloud.app
```

若卷名含空格，可先执行 `ls /Volumes` 查看实际路径，例如：

```bash
xattr -cr "/Volumes/EBookCloud 1.2.1-arm64/EBookCloud.app"
```

### 方法三：仅移除隔离标记

```bash
xattr -d com.apple.quarantine /Applications/EBookCloud.app
```

## Windows：SmartScreen 提示

未购买代码签名证书时，Windows 可能提示「未知发布者」。点击 **更多信息** → **仍要运行** 即可安装。

## 更新

桌面客户端内置检查更新，也可在本仓库 Releases 页手动下载新版本覆盖安装。

## 反馈

功能问题、Bug 与需求请到主仓库提交：[Jireh012/EBookCloud](https://github.com/Jireh012/EBookCloud/issues)
