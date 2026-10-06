# 赛博断舍离 · Weibo Post Cleaner

一个 Chrome / Edge 浏览器插件（Manifest V3），在微博个人主页上自动批量删除自己发的微博和快转。手动开始，随时停止。

A Chrome / Edge extension (Manifest V3) that bulk-deletes your own Weibo posts and reposts from your profile page. Starts only when you click Start; stop at any time.

> ⚠️ **删除操作不可恢复。** 插件会自动点击微博自带的"确定删除"弹窗，手动点"取消"抢不过脚本。使用前请确认你真的要删除，必要时先备份。
>
> ⚠️ **Deletion is permanent.** The extension clicks Weibo's own confirmation dialog for you. Back up anything you want to keep before starting.

## 功能 · Features

- 点击 **开始** 后，逐条打开微博的"更多"菜单，点击"删除"或"取消快转"，并自动确认
- 每条之间随机间隔 1.2–2.5 秒，找不到可删除的内容时自动向下滚动加载
- 点击 **停止** 后，脚本会在下一步操作前停下

---

- Click **Start**: opens each post's "more" menu, clicks Delete / Undo repost, and confirms
- Random 1.2–2.5 s delay between posts; scrolls down to load more when nothing is in view
- Click **Stop**: the script halts before its next action

## 安装 · Installation

本插件尚未上架商店，需要手动加载：

1. 下载本仓库（Code → Download ZIP）并解压，或 `git clone`
2. 打开 `chrome://extensions`（Edge 为 `edge://extensions`）
3. 打开右上角的 **开发者模式**
4. 点击 **加载已解压的扩展程序**，选择本仓库文件夹

Not yet on the Chrome Web Store / Edge Add-ons. To install: download or clone this repo, open `chrome://extensions` (or `edge://extensions`), enable **Developer mode**, click **Load unpacked**, and select the folder.

## 使用 · Usage

1. 登录微博，打开自己的个人主页
2. 点击浏览器工具栏上的剪刀图标，在弹窗中点 **开始**
3. 想停下时点 **停止**。如果停止的瞬间脚本已经点了确认按钮，那一条仍会被删除，但不会继续删下一条

---

1. Log in to Weibo and open your own profile page
2. Click the scissors icon in the toolbar, then **Start**
3. Click **Stop** to halt. A deletion already confirmed at that instant can't be undone, but no further posts will be deleted

## 隐私 · Privacy

本插件不收集、不存储、不出售、不传输任何个人数据。所有操作只在你的本地浏览器中运行，且只在你手动点击开始后作用于 weibo.com 页面。

This extension does not collect, store, sell, or transmit any personal data. Everything runs locally in your browser, and it only acts on weibo.com pages after you click Start.

## 免责声明 · Disclaimer

本插件按"原样"提供，作者不对任何数据丢失或账号问题负责。微博页面结构变化可能导致插件失效或行为异常。使用风险自负。

Provided "as is" without warranty. The author is not responsible for any data loss or account issues. Changes to Weibo's page structure may break the extension. Use at your own risk.

## 许可证 · License

[MIT](LICENSE)
