---
date: 2025.03.09
auther: ISC-WEB
---

# Hugo + Vercel 搭建个人博客

什么是个人博客？

个人博客是一个由个人维护的、纯看个人兴趣的网站，用于分享个人的观点、经验、知识或者生活。

相比于公共博客，它的优势包括高度的自由度和个性化，它是极客的个人名片，也是个有点小众的交友平台。

**⚠️注意**：如果下述的任一步骤你已经自行完成，就不需要**重复劳动**啦！

## 工具介绍

1. **VSCode**：一个免费、开源的代码编辑器，支持多种编程语言和开发工具，并拥有丰富的扩展生态系统。
2. **Git**：一个分布式版本控制系统，用于跟踪和管理项目中的文件更改。
3. **Hugo**：这是一个用Go语言开发的静态网站生成器，生成速度极快，能在1秒内处理上千页面。

## 网站介绍

1. **GitHub**：一个基于 Git 版本控制系统的在线平台，它允许开发者**托管**、协作和管理他们的代码仓库。
2. **Vercel**：一个面向前端开发者的平台，提供网站托管、部署和服务器端渲染等服务。

## 知识点预览

### 需要完全掌握的知识

- Github 和 Vercel 网站的账号注册
- Git 与 Hugo 的安装
- Git 在本地的配置

### 课堂会涉及但需要自行深入的知识

- Git 和 Github 的使用
- Vercel 自动部署的使用
- Hugo 的基本使用
- Hugo 主题的使用
- 关于静态网站生成器(SSG)的相关概念

### 课堂不会涉及但需要自行掌握的知识

- Markdown 语法，用于博客文章的编写，由于时限原因，需要同学们完成自学，我向你保证这部分并不难学。
- Hugo 短代码的使用，用于博客文章内容的丰富
- 域名的注册和使用（自己的博客总不能一直顶着别人的域名吧）

### 课堂不会涉及但是可以去掌握的知识

- Hugo 主题的开发

## 环境准备

考虑到大家基本都是使用`Windows`系统，本课程也以`Windows`环境为例。

### VSCode

#### 1.下载

官方网址：[https://code.visualstudio.com/](https://code.visualstudio.com/)

点击网站右上角的 Download（**而不是**页面中间的 Download）。

<img src="hugo_blog/vscode_download_1.jpg" alt="vscode首页" width="70%"/>

点击`System Installer`右边的`x64`（如果你的电脑是`ARM`架构，那就点`Arm64`，如果不清楚，那就`x64`）。

之后等待几秒，下载会自动开始。

<img src="hugo_blog/vscode_download_2.jpg" alt="vscode下载页面" width="70%"/>

#### 2.安装

打开下载的安装包，只需在一个界面注意一下，其他都直接点下一步：

<img src="hugo_blog/vscode_install_1.jpg" alt="vscode安装界面" width="70%"/>

保证上图的所有的 ✅ 都被打上后，一直点击下一步，直到安装结束。

运行刚刚安装完成的 VSCode，如图点击到`扩展`页面，箭头所指的地方就是搜索社区扩展的地方：

<img src="hugo_blog/vscode_config_1.jpg" alt="vscode插件界面" width="40%"/>

该项目推荐安装以下插件：

- Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
- Even Better TOML
- Material Icon Theme 或者 vscode-icons

安装完成后可以先关闭 VSCode。

### Git 与 GitHub

#### 1.Git 的下载与安装

我们提供的安装包下载地址：[https://isc-files.s3.bitiful.net/Git-2.52.0-64-bit.exe](https://isc-files.s3.bitiful.net/Git-2.52.0-64-bit.exe)

或者选择官方网址：[https://git-scm.com/](https://git-scm.com/)

点击网页右边的`Download For Windows`，按图所示点击链接开始下载：

<img src="hugo_blog/git_download.jpg" alt="vscode插件界面" width="70%"/>

只需要注意两个页面，其他一直点击`Next`即可：

下图的`On the Desktop`是在桌面上创建 2 个快捷方式，根据自己的喜好可点可不点。

<img src="hugo_blog/git_install.jpg" alt="git安装界面1" width="70%"/>

<img src="hugo_blog/git_install_2.jpg" alt="git安装界面2" width="70%"/>

#### 2.检查安装

安装完成后，按下你的`Win`键，直接输入`git bash`，如果软件可以被找到，那说明安装成功了。

#### 3.注册 GitHub 账号

进入`GitHub`官网：[https://github.com/](https://github.com/)

<img src="hugo_blog/github_interface.jpg" alt="github主页" width="70%"/>

点击页面右上角的注册，使用自己的邮箱进行注册即可。

#### 4.配置 Git

##### 本地 Git 配置

按下你的`Win`键，直接输入`git bash`，然后按下回车，依次输入下面两行命令（**⚠️注意引号不能去掉，并且必须是英文引号**）：

```bash
git config --global user.name "你的github用户名"
git config --global user.email "你在github上注册用的邮箱"
```

输入下面这行命令可以检查刚才设置的信息：

```bash
git config --global --list
```

<img src="hugo_blog/git_config.jpg" alt="git config输出信息" width="60%"/>

##### 通过 SSH 链接本地与远程 GitHub

继续在`Git Bash`中输入：

```bash
ssh-keygen -t rsa -C "你在github上注册用的邮箱"
```

之后一直回车即可，效果如下：

<img src="hugo_blog/ssh-genkey.jpg" alt="ssh-genkey" width="70%"/>

然后依次输入：

```bash
cd ~/.ssh       #进入.ssh目录
ls              #查看当前文件下文件
cat id_rsa.pub  #将目标文件的内容输出
```

将最后一行命令输出的公钥（**包括开头的`ssh-rsa`和结尾的`邮箱地址`**）整个复制下来：

<img src="hugo_blog/ssh-key.jpg" alt="输出的key" width="70%"/>

回到 github 页面，点击在网站右上角的你的头像，点击`Your profile`，进入到账户信息页面。

按照图中所示，依次点击`SSH and GPG keys`和`New SSH Key`：

<img src="hugo_blog/ssh_and_github.jpg" alt="profile界面" width="70%"/>

进入提交公钥的界面：

<img src="hugo_blog/githubssh_upload.jpg" alt="提交公钥界面" width="70%"/>

其中，`Title`随便取，`Key Type`保持默认，`Key`里面粘贴你刚刚复制下来的公钥，最后单击`Add SSH Key`。

回到`Git Bash`，输入：

```bash
ssh -T git@github.com
```

出现以下提示即`SSH`连接成功（⚠️注意这里第一次连接可能需要键入`yes`，按提示操作即可）：

<img src="hugo_blog/ssh_success.jpg" alt="SSH连接成功" width="60%"/>

##### 错误排查

有些同学在最后一步可能会出现`Connection closed by ...`的提示。

在公钥正确提交的前提下，这可能是代理服务器的干扰造成的，可以尝试使用通过 HTTPS 端口建立的 SSH 连接克隆。

要测试通过 HTTPS 端口的 SSH 是否可行，请运行以下 SSH 命令：

```bash
ssh -T -p 443 git@ssh.github.com
```

如果这行命令有效，解决方案请参考：[在 HTTPS 端口使用 SSH](https://docs.github.com/zh/authentication/troubleshooting-ssh/using-ssh-over-the-https-port#enabling-ssh-connections-over-https)

如果无效，请检查公钥是否正确提交。

### Hugo

这是一个用Go语言开发的静态网站生成器 (Static Site Generator, 简称 SSG)，生成速度极快，能在1秒内处理上千页面。

> 什么是静态网站生成器 (SSG)？
> 
> 简单来说，它的工作模式是：
> 
> 你：用 Markdown 写文章。
> 
> Hugo (SSG)：把你写的 Markdown 套上一个“主题”模板，提前生成一堆完整的、静态的 HTML、CSS 和 JS 文件。
> 
> 服务器 (Vercel)：把这些生成好的 HTML 文件直接存起来。
> 
> 当用户访问你的博客时，服务器会直接把这个现成的 HTML 文件发给他。

对于在 Windows 上安装`Hugo`，官方给出了多种办法，这里采用最简单快速的、Windows 10 和 11 系统自带的`winget`包管理器安装方法。

继续在`Git Bash`中输入：

```bash
winget install Hugo.Hugo.Extended
```

<img src="hugo_blog/hugo_install.jpg" alt="winget安装hugo" width="60%"/>

由于我是卸载再安装，所以同学们可能和我显示的内容不太一样，只要按照操作进行下去即可。

安装完毕后，建议重启一下`Git Bash`，然后输入：

```bash
hugo version
```

<img src="hugo_blog/hugo_version.jpg" alt="hugo输出version" width="60%"/>

如果你的输出也如上图一般显示，那么说明`Hugo`已经被安装成功了。

### Vercel

网站链接：[https://vercel.com/](https://vercel.com/)

点击右上角进行注册，昵称自取：

<img src="hugo_blog/vercel_interface.jpg" alt="vercel主页" width="60%"/>

<img src="hugo_blog/vercel_signup_1.jpg" alt="vercel注册界面" width="60%"/>

点击`Continue`后，点击`Continue with GitHub`。

之后可能会要你的手机号，把国家改成`China`后正常填写即可。

如果出现了类似于下图的界面，说明你注册成功了。

<img src="hugo_blog/vercel_signup_success.png" alt="vercel注册成功" width="60%"/>

## 正式开始

### 新建 Hugo 项目

选择一个你中意的文件夹，在文件夹处右键，在此处打开`git bash`，输入指令：

```bash
hugo new site my_blog # "my_blog"可以自行替换
```

等待跳出提示，你的 Hugo 博客就完成了第一步——创建。

我们先初步瞥一眼各个项目的作用
```bash
.
├── archetypes       # 存放定义新内容的模板
│   └── default.md   # 新生成的文章文件的模板
├── assets           # 存放需要 Hugo 处理的资源
├── content          # 存放文章 Markdown 格式文件（重要！）
├── data             # 存放网站的一些数据
├── i18n             # 存放网站的国际化文件
├── layouts          # 存放网站代码
├── static           # 存放静态资源（重要！）
├── themes           # 存放主题（重要！）
└── hugo.toml        # 主要配置文件（重要！）
```
现在我们来看 hugo 给的提示：

```bash
1. Change the current directory to ./my_blog.
2. Create or install a theme:
   - Create a new theme with the command "hugo new theme <THEMENAME>"
   - Or, install a theme from https://themes.gohugo.io/
3. Edit hugo.toml, setting the "theme" property to the theme name.
4. Create new content with the command "hugo new content <SECTIONNAME>/<FILENAME>.<FORMAT>".
5. Start the embedded web server with the command "hugo server --buildDrafts".
```

我们先照着它说的做，在`bash`中敲入以下指令：

```bash
cd my_blog
hugo new theme my_theme # "my_theme"可自取名字，如果你不是要自研出新的theme，那这不重要
```

然后自行修改项目根目录下的`hugo.toml`，在文件中另起一行，加入：

```toml
theme = 'my_theme' # 表示博客选用的主题名称
```

最后敲入命令：

```bash
hugo new content posts/my_first.md  # 新建名为my_first的文章
hugo server -D  # -D 与 --buildDrafts 等价
```

现在，你的博客就在本地运行起来了，在浏览器中打开`hugo server -D`输出的地址，可以看到一个最基本的、没有任何装饰的网站。

这肯定不是你想要的，所以现在我们首先要做的，是为博客找一个你中意的主题。

### 寻找合适的主题

搜索引擎搜索：`hugo theme`，或者在网址栏输入：[https://themes.gohugo.io/](https://themes.gohugo.io/)。进入到 Hugo 主题列表的页面。

这里有很多供你挑选的主题，每个主题的配置方式都有所区别，如果你要应用某个主题，**万万记得要看主题的作者给的文档。如果你在遇到问题时恰逢主题的文档不全，或者 exampleSite 不清晰，别犹豫，立刻换主题！除非你有精力去学 Hugo Theme 的开发且愿意花时间去读主题的源码。推荐选择有详细exampleSite配置的主题。**

为了教学方便，这里选择一个自用主题*Changle-Scape*。

此处将用到`git`的一个关键指令：

```bash
git clone <repository_URL>
# 作用是将远程服务器上的仓库克隆到本地
```

#### 获得远程仓库的地址

打开 github 的仓库界面，点击界面右上角的绿色的`Code`按钮，刚才我们完成了 SSH 本地与 github 的链接，所以我们可以点击`SSH`（实际上 HTTPS 和 SSH 都可以），点击 URL 右边的复制按钮。

<img src="hugo_blog/github_code_btn.jpg" alt="github Code按钮特写" width="80%"/>

#### 克隆到本地

我们要把主题克隆到 themes 文件夹内，所以执行指令：

```bash
git clone git@github.com:ChangleCat/Changle-Scape.git themes/Changle-Scape
# 最后的参数表示clone的目的地，如果为空则是保存在当前目录下的一个新文件夹里。
# 然而，这并不是最佳方法，这意味着“仓库里面包含仓库”，太不优雅了，还会引发一些问题。
# 处理“仓库包含仓库”的最好办法是使用 git submodule，但这属于 git 进阶方法，推荐课后自学。
```

进入到`Changle-Scape`文件夹内，可以看到项目结构：
```bash
.
├── archetypes
├── assets
├── content
├── exampleSite      # 主题使用案例（重要！）
├── layouts
├── static           
├── theme.toml       # 主题配置文件
├── .gitignore       # git进阶：内容是应该被 git 忽略的文件(夹)
└── 其他文件          # 暂且不重要，不用管
```

这时候我们发现 Hugo Theme 和 Hugo 项目根目录的结构非常相似。

打个不恰当的比方，如果把 Hugo `项目根目录`下的文件夹比作你的`空白作业本`，那么`主题`就是`别人除了开放题没写，其他都写满了的作业本`，应用别人的主题就是相当于把`把别人除了开放题没写，其他都写满了的作业本`直接打印一份，来代替你的空白作业本。所以如果你想要在这个主题的基础上进行修改，可以在`项目根目录`下创建`同名文件`进行覆盖。具体暂不展开。

### 利用 exampleSite

了解一个主题的两个最好方法：

1. 看官方文档（如果是英文的也请看下去）
2. 利用 exampleSite

由于这里我们主要讲第二点。

`exampleSite`是一个主题的 demo（示范），作用是帮助你快速理解这个主题的使用方法。

`exampleSite`的利用方法就是将该`目录里的所有东西`都复制到`项目根目录`下。

下面这条`git bash`里的指令会完成上述的操作：
```bash
# 请先确保当前目录是 Hugo 项目的根目录（关键！），再执行下面这行指令
cp -r themes/Changle-Scape/exampleSite/* . 
# ⚠️注意！！！这条指令的最后有一个点！！！这个点表示当前目录
# 作用就是拷贝 exampleSite 文件夹下的所有文件到项目根目录
# 这个操作相当于把主题作者的"参考答案"复制到你的作业本
```

⚠️**注意！** 这时候我们检查并修正一下项目根目录的`hugo.toml`。

```bash
baseURL = "https://example.org/"
theme = "Changle-Scape"
title = "我的技术博客"
```

现在我们就可以来看看效果。执行指令：
```bash
# 在博客项目根目录执行
hugo server -D
# 该条指令表示在本地运行网页服务器，-D 表示被标记为草稿的文章也会被渲染
```

## 上传：GitHub仓库的奇妙冒险

### 创建 GitHub 仓库

1. 登录GitHub点击网页右上角的➕ → New repository
2. 仓库名建议：`你的昵称-blog` （例如`xiaoming-blog`）
3. 因为是个人博客，所以可以不考虑别人提交代码贡献，把仓库设置为`Private`
4. 其他的都暂且不用选，直接点击网页最下面的`Create respository`
<img src="hugo_blog/github-new-repository.jpg" alt="github新建仓库" width="70%"/>

### 本地代码上传
```bash
# 初始化本地仓库（在博客项目根目录执行）
# 该指令对于一个项目只需要执行一次
git init

# 接下来的 add、commit、push被成为“git三部曲”，每次更新博客都要执行一次

# 把文件装进“快递箱”
git add .

# 封装“快递箱”，贴上“快递单” ，填写“快递单”信息
git commit -m "initial commit"

# 绑定云端仓库地址，地址去仓库页面大大的绿色 Code 按钮里去找
# 如果你没有成功添加 SSH 密钥，请复制 https 开头的地址而非 git@ 开头的地址
# 一个项目只需要执行一次
git remote add origin git@github.com:你的用户名/仓库名.git

# 发射！
git push -u origin main
```

## 部署：Vercel 自动部署魔法

1. 登录 Vercel 之后来到主页
2. 点击页面右边的`Add New...` → `Project`
3. 把目光移到页面左下角的`Import Git Repository`
4. 第一次使用 Vercel 会看到一个`Install`按钮，点击后再点击弹窗里的`Install`即可。
<img src="hugo_blog/vercel_install.jpg" alt="vercel安装" width="70%"/>

5. 点击你刚刚创建的仓库右边的`Import`
6. 其他不变，将`Framework Preset`设置为`Hugo`

⚠️**Vercel 自带的 Hugo 预设存在一些问题，所以我们接下来将进行修改！**

1. 点击展开`Build and Output Settings`
2. 修改`Build Command`为
```bash
git clone https://github.com/ChangleCat/Changle-Scape.git themes/Changle-Scape && hugo --gc -D
```
> ⚠️注意：
> 1. git clone 在此处不可以处理 ssh 链接，只能处理 https 链接。
> 2. 请确保 themes/\[主题名\] 没有写错。
> 3. “&&”没有落下
> 4. 最后的 -D 可以在实际部署环境中去掉

3. 点击展开`Environment Variables`
4. 添加一个`Key Value`对，其中，`Key`为`HUGO_VERSION`，`Value`为`0.152.2`。( Value的值就是你的 Hugo 版本 )

最后点击`Deploy`，准备见证奇迹！

<img src="hugo_blog/vercel_success.jpg" alt="vercel部署成功" width="70%"/>

## 🎉恭喜！大功告成

你已经成功完成了博客的自动部署，现在，如果你要修改博客，都可以通过 git 三部曲(`add/commit/push`)来完成。一旦执行`push`，Vercel 就会自动检测你仓库的变动，从而自动重新部署。

如果你懂得如何使用`VSCode`自带的`源代码管理`功能，那么修改博客更是不需要每次都手敲 git 指令，而是只要鼠标点点就可以了。

那么，现在开始享用自己辛苦搭建的博客吧！

## 杂七杂八

### 编写新文章

在项目根目录处打开`git bash`，输入指令：
```bash
hugo new content posts/文章题目.md
```
一般来说，除了`关于`之类的特殊文章，一般的文章都是放在`content`目录里的`posts`目录下的，所以需要打上`posts/`的前缀。所有的文章都以`Markdown`文件格式存储，所以需要打上`.md`的后缀。

> `Markdown`是一种用简单符号（如\#、\*）就能排版文字（加粗、标题、列表等）的轻量级标记语言，像写纯文本一样快速生成格式文档。优点是语法简单易写，能快速排版且兼容性强，便于博客作者专注内容而非格式；同时纯文本存储体积小，易于版本管理和多平台发布。

> `Markdown`文件分两个部分：**元数据**和**内容**。
> - **元数据**：包含一些文章的元信息，如标题、描述、标签、分类等。
> - **内容**：就是文章内容，使用`Markdown`语法编写。

### 更新博客

比如我按照上文的方法新建写了一篇博客文，或者修改了`hugo.toml`配置文件，现在想要更新到云端上。

使用`Git 三部曲`(`add/commit/push`)完成上传更新：
```bash
git add . # 添加所有文件
git commit -m "docs: new content" # 提交更改
git push # 将修改推送到远程仓库
```
