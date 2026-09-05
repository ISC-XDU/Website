---
date: 2023.11.09
auther: ISC-WEB
---

# 搭建一个属于你自己的博客空间

博客，你可以把它当做你的一片小天地，或者小众一丢丢的交友平台；你可以把你的学习笔记/生活感悟/以及所有可以放进日记本、朋友圈的东西上传到你的博客平台。

简而言之，这是一个纯看个人兴趣爱好的小玩意儿:wink:

这里使用`Hexo`+`GitHub Page`搭建一个静态的博客站点，不需要服务器，完全免费

> but it maybe need magic

**注意**：下述步骤中任一步骤你自己已经完成，就不用**重复劳动**啦

## 环境准备

考虑到大家基本都是使用`windows`环境，所以就默认在`win`系统下进行操作

### Git

#### 1. 下载
- 可以选择从俱乐部网站上下载 : [Git](../../Files/Git-for-windows.exe)
- 也可以自己去`Git`官网 : [下载站点](https://git-scm.com/download/win)

#### 2. 安装
一直点`Next`就好了:

<img alt="Git安装示例图1" src="get_a_blog/git_install1.png" width="60%">

像这样：

 <img alt="Git安装示例图2" src="get_a_blog/git_install2.png" width="60%"> 

#### 3. 检验是否安装成功
任何地方点击右键出现`Git Bash`即安装成功：

<img alt="Git安装成功图" src="get_a_blog/git_install_success.png" width="40%"> 

### Node.js

同理，步骤基本差不多

#### 1. 下载

- 俱乐部网站 ： [Node.js](../../Files/nodejs.msi)
- `Nodejs`官网 : [下载站点](https://nodejs.org/en/download)

#### 2. 安装
注意安装时选择**添加到环境变量**，即`Add to Path`：

 <img alt="nodejs安装示例图" src="get_a_blog/nodejs_install.png" width="60%"> 

#### 3. 检查
键盘点击`win`+`R`打开运行，输入`cmd`并回车打开终端，输入`node -v`和`npm -v`，均显示版本号即安装成功

<img alt="安装成功示例图" src="get_a_blog/nodejs_install_ok.png" width="40%">

## 正式开始

### 注册一个GitHub账号

前往<a href="https://github.com/" target="_blank">GitHub</a>(~~全球最大同性交友平台~~):stuck_out_tongue_winking_eye:，注册属于你自己的一个账号

**注意**：保存好你的**用户名**、**密码**以及**邮箱**

<img alt="GitHub首页" src="get_a_blog/GitHub_com.png"  width="60%">

注册成功后你的`GitHub`主页(初始头像随机生成) ：

<img alt="注册成功图" src="get_a_blog/GitHub_register_ok.png" width="60%"> 

### 创建存放博客页面的代码仓库

在`Repositories`页面新建一个名为 `你的用户名.github.io` 的仓库，**注意使用你自己GitHub账户的用户名**，且仓库设为`public`，否则无法配置`GitHub Page`

示例：

<img alt="博客代码仓库创建" src="get_a_blog/repository_build.png" width="70%"> 

### 本地Git配置

在电脑任何位置(我这里是桌面)，右键打开`Git Bash`，输入：
```bash
git config --global user.name "你注册的用户名"
```
```bash
git config --global user.email "你注册的邮箱"
```
**注意是你自己的用户名和邮箱**，而且""符号是有的

再输入：
```bash
git config --global --list
```
即可查看刚刚的配置信息

示例：

<img alt="Git本地配置" src="get_a_blog/git_config_global1.png" width="70%"> 

### 使用SSH链接到远程GitHub

继续使用刚刚的窗口，输入：
```bash
ssh-keygen -t rsa -C "你的邮箱" #邮箱同上
```
然后一直回车：

<img alt="ssh生成" src="get_a_blog/ssh_generate.png" width="80%">

接着输入：
```bash
cd ~/.ssh #进入.ssh目录
```
```bash
ls #查看当前文件下文件
```
```bash
cat id_rsa.pub #将目标文件的内容输出
```

<img alt="ssh生成" src="get_a_blog/ssh_get.png" width="80%"> 

再复制公钥(圈出来的部分)，**注意从`ssh-rsa`开始到`邮箱号`结束都是**

然后，去到`GitHub`上，打开`Settings`，再进到`SSH and GPG keys`中，新建一个`SSH key`
 
<img alt="Github新建ssh" src="get_a_blog/ssh_new_github.png" width="80%">

这里名字任取，内容即刚刚复制的公钥，点击`Add SSH key`即添加完成

再切回我们的`Git Bash`窗口，输入：
```bash
ssh -T git@github.com
```

出现以下提示即`SSH`连接成功(注意这里第一次连接可能需要键入`yes`，按提示操作即可)：

<img alt="ssh远程测试" src="get_a_blog/ssh_test.png" width="80%"> 

在`Git Bash`中输入`exit`即可退出窗口了

### 安装Hexo

打开终端，输入：
```bash
npm install -g hexo-cli
```
即可安装`Hexo`，没有报错即安装成功；且你输入`hexo`应当会出现相关信息：

<img alt="Hexo安装" src="get_a_blog/hexo_install.png" width="70%"> 

**注**：同样，在终端窗口输入`exit`即可关闭

### 新建Hexo项目

选择一个工作文件夹(你会长期使用并且打开方便的位置)，新建一个文件夹用来存放博客文件，进入这个文件夹并打开一个新的`Git Bash`窗口，输入:
```bash
hexo init
```
没有报错即创建`Hexo`博客仓库成功

- 这里可能会因为网络问题报错，记得代理一下
- 也可能会出现`mkdir`即新建文件/文件夹不允许，请修改此文件夹的修改权限(具体方法可问搜索引擎)

接着输入
```bash
hexo g #生成静态页面
```
```bash
hexo s #本地预览
```
窗口中会输出一个本地可预览的地址 ：

<img alt="Hexo生成和预览" src="get_a_blog/hexo_g_s.png" width="80%"> 

复制在浏览器中打开，即可看到博客页面 ：

<img alt="hexo预览" src="get_a_blog/hexo_s.png" width="60%">

**注**：在`Git Bash`窗口中键入`Ctrl`+`C`即可停止预览

### 将博客推送到远程仓库

在此之前还需要先安装一点儿插件帮助我们，在`Git Bash`窗口中输入：
```bash
npm install hexo-deployer-git # 远程推送插件
```
```bash
npm install hexo-generator-feed # 博客订阅插件
```
如果没有报错，即安装成功

接着打开博客文件下的`_config.yml`文件，修改`deploy`配置为：
```yml
deploy:
    type: git
    repo: git@github.com:你的GitHub用户名/你的Github用户名.github.io.git
    branch: main
```
实际上，`repo`即远程仓库的意思，这个对应的就是我们创建的个人博客仓库

示例：

<img alt="hexo deploy配置" src="get_a_blog/hexo_deploy_config.png" width="70%">

保存文件修改，并在`Git Bash`窗口中输入 ：
```bash
hexo d
```
没有报错即推送成功：

<br> <img alt="hexo d成功" src="get_a_blog/hexo_d_ok.png" width="70%">

接着再到`GitHub`上看一看我们的博客仓库，会发现已经上传了文件：

<img alt="GitHub 仓库更新成功" src="get_a_blog/github_d_ok.png" width="70%">

看一看`Actions`，也部署成功了 ：

<img alt="page部署成功" src="get_a_blog/git_acton_ok.png" width="80%">

然后再在浏览器中输入地址
```
https://你的用户名.github.io
```
即可访问你的博客站点啦(同理别人亦可访问) ：

<img alt="博客页面访问成果你" src="get_a_blog/blog_visit_ok.png" width="60%">

至此，基本的工作已经完成，可以开始写博客了:yum:

## 使用

贴一下[Hexo中文官网](https://hexo.io/zh-cn/index.html)，大家可以上去仔细看看`Hexo`的详细使用和说明

### 撰写博文

首先，将`_config.yml`中的`post_asset_folder`设为`true`:

<img alt="post_asset_folder设置" src="get_a_blog/post_asset_folder.png" width="80%">

这个配置可以在你新建博文的时候自动生成一个对应文件夹(可以用来存放媒体文件) 

然后在博客项目中打开`Git Bash`，输入 ：
```bash
hexo new 博文的文件名 #不要带.md
```
示例：

<img alt="新建博文" src="get_a_blog/hexo_new_test.png" width="60%">

然后打开打印信息中对应的路径，就会看到新生成的`markdown`文件和对应的文件夹 ：

<img alt="新建博文成功" src="get_a_blog/hexo_new_test_ok.png" width="50%">

现在你可以尝试在媒体文件夹中放张图，博文中引一下，再写一写公式、`emoji`之类的，然后试着推送一下

**注**：每次推送，使用指令：
```bash
hexo cl #清除缓存
hexo g #生成页面
hexo d #推送远程
```
三条指令即可，且需要按照顺序

### 配置优化

嘿嘿，你可能会发现推送没问题，但是图片/公式/表情没法显示，这时候就需要来一些优化操作

由于每个人的偏好可能都不一样，所以这里并不会给出教程。大家遇到实际问题之后可以去查一查或者问问(善用搜索引擎和社区/文档)。

### 个性化

#### 主题更换

`Hexo`官网上就有很多主题推荐： [主题列表](https://hexo.io/themes/)

这里的配置就比较多了，大家可以根据自己的需要去看一看找一找，教程也有很多。建议大家可以换一换，不少主题比较好看而且可以修复一些默认主题下的问题。

我这里试了下`fluid`主题，换主题之后：

<img alt="fluid体验" src="get_a_blog/fluid_test.png" width="70%">

给个链接：[fluid官方文档](https://hexo.fluid-dev.com/docs/start/)

## 进阶部署

这一部分借助`GitHub Actions`和`仓库分支存储`来进行自动部署

**注意**: 这里的部署步骤可能对新手不太友好:innocent:，所以，建议你学习一些`Git`操作或者使用博客一段时间之后再来看看，试着自己配一配

### 1.克隆博客仓库至本地

选择一个工作文件夹，打开`Git Bash`，输入
```bash
git clone git@github.com:你的GitHub用户名/你的Github用户名.github.io.git
```

<img alt="git克隆仓库" src="get_a_blog/git_clone.jpg" width="80%">

### 2.新建分支

同一个`Bash`窗口，键入
```bash
cd 你的Github用户名.github.io # 进入博客仓库文件夹
git branch dependent # 新建依赖工具分支
git branch html # 新建静态页面分支，存放生成的博客页面
```

<img alt="git新建分支" src="get_a_blog/git_new_brach.png" width="80%">

### 3.main分支文件修改

首先将你的仓库文件夹清空。

**注**：所有清空操作建议在`Git Bash`窗口中进行，键入
```bash
rm -f * -r # 强制递归清空仓库文件夹
``` 
这样不会将`.git/`文件夹中的仓库记录(这里此文件夹作为隐藏文件没有显示)删除，否则后续`Git`无法定位，也就无法继续操作

然后进到你的原`Hexo`项目下(可以在此新建一个`Git Bash`窗口)，输入
```bash
hexo cl 
```

再将`source`目录下的**所有文件**以及根目录下`.gitignore`文件复制到仓库文件夹

<img alt="文件复制" src="get_a_blog/main_files.png" width="70%">

### 4.推送main分支更改

回到仓库文件夹下的`Git Bash`窗口，输入:
```bash
git add . # 添加所有文件
git commit -m "update branch main" # 提交更改
git push # 将修改推送到远程仓库
```

### 5.切换html分支并建立连接

```bash
git checkout html # 切换到静态页面分支
```

同理，清空文件夹，提交修改(此分支下现在没有文件)即可:

```bash
git add . # 添加所有文件
git commit -m "update branch html" # 提交html分支更改
git push --set-upstream origin html # 设置分支关联并推送
```

### 6.切换dependent分支并修改文件

`Git Bash`窗口键入:
```bash
git checkout dependent # 切换到依赖工具分支
```

同理，清空仓库文件夹。
再一次去到原`Hexo`项目，将**除了`source/`目录的其余文件**复制过来。

<img alt="dependent分支文件" src="get_a_blog/dependent_file.png" width="60%">

### 7.配置GiHub Actions工作流文件

在仓库文件夹`.github/`下新建一个目录`workflows/`(注意有两层目录)，在里面新建一个`hexo_build_deploy.yml`文件(这个文件可以暂时存到另外某个地方，还需要的)，内容如下：
```yml
name: Hexo Build & Deploy

on:
# 触发事件
  push:
    # 排除分支
    branches-ignore:
      - 'html'

# 工作流
jobs:
  build:
    runs-on: ubuntu-latest

    steps:

        # 分支文件检查聚合
        - name: Checkout branch dependent
          uses: actions/checkout@v2
          with:
            ref: dependent
            path: ./
        - name: Checkout branch main
          uses: actions/checkout@v2
          with:
            ref: main
            path: ./source
        
        # 工具安装
        - name: Use Node.js
          uses: actions/setup-node@v3
          with:
            node-version: '20'
        - name: Install dependencies
          run: npm install

        # 构建
        - name: Build
          run: npm run build

        # 部署
        - name: Deploy
          uses: JamesIves/github-pages-deploy-action@v4.2.2
          with:
            branch: html
            folder: public
```

<img alt="工作流文件配置" src="get_a_blog/action_file.png" width="60%">

### 8.提交dependent分支修改

使用`Git Bash`输入：
```bash
git add . # 添加所有文件
git commit -m "update branch dependent" # 提交更改
git git push --set-upstream origin dependent # 设置分支关联并推送
```

### 9.修改GitHub仓库设置

先在博客仓库`Settings`的`Pages`中将`Branch`设置为`html`

<img alt="page配置修改" src="get_a_blog/github_settings_page.jpg" width="80%">

然后将`Actions`下的`General`中的`Workflow permissons`设置为`Read and write permissions`

<img alt="actions设置修改" src="get_a_blog/github_settings_actions.jpg" width="80%">

### 10.最后修改

最后，切换回`main`分支，并且把之前的`hexo_build_deploy.yml`文件以相同的路径和形式创建/复制即可(注意两层目录)

:rocket:推送一下即可成功！

<img alt="进阶部署成功" src="get_a_blog/autodeploy_ok.jpg" width="80%">

## 大功告成

现在，你每次写博文只需要在`main`分支下进行博文修改，非常干净，写完后直接推送(`add/commit/push`)即可；换设备也非常方便，不需要再装`npm/hexo`这些，只需要一个`Git`即可。

如果需要修改配置(建议不要频繁改动)，就切换到`dependent`分支，修改文件，推送即可，同样会触发工作流。

那么，现在开始享用自己辛苦搭建的博客吧:smile: