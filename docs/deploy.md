# 部署说明（重构站）

域名：**https://xdu-inspur.cn/**

## 触发与流程

`.github/workflows/AutoDeploy.yml`：

- **push main / PR 提向 main / Actions 手动 dispatch** — 与旧 `Website/` 仓库 `AutoDeploy.yml` 触发器完全一致
- PR 只跑 `npm ci && npm run build` 校验，不部署
- push main / 手动 dispatch：跑完整流程（install → build → rsync）

部署目标：把 `dist/` 内容同步到云服务器的 `WORK_TARGEAT_PATH`（与旧站用同一 Secret）。

## 复用 Secret（与旧站完全一致）

GitHub repo → Settings → Secrets and variables → Actions：

| Secret 名 | 含义 |
|---|---|
| `ISC_SERVER_PRIVATE_KEY` | 服务器 SSH 私钥 |
| `ISC_SERVER_HOST_ADDRESS` | 服务器主机（域名或 IP） |
| `ISC_SERVER_USER` | SSH 用户名 |
| `WORK_TARGEAT_PATH` | 服务器上 Nginx 站点的根目录（rsync 把 `dist/` 内容同步到这里） |

> 重构站仓库的 Secrets 必须**重新配一次**（与旧站独立）。从旧站仓库 → Settings → Secrets → 复制到新站同名 Secret 即可。

## 服务器侧要求

1. Nginx server root 指向 `WORK_TARGEAT_PATH`
2. Nginx conf 关键片段：

   ```nginx
   server {
       listen 80;
       server_name xdu-inspur.cn www.xdu-inspur.cn;
       root /var/www/xdu-inspur;  # 即 WORK_TARGEAT_PATH
       index index.html;

       # Astro 默认 build 出来是 /members/、/tech/ 这种 directory 形式
       location / {
           try_files $uri $uri/ $uri/index.html =404;
       }
   }
   ```

3. SSH `authorized_keys` 已写入 `ISC_SERVER_PRIVATE_KEY` 对应的公钥
4. 第一次部署时建议 `chown -R $SSH_USER:www-data /var/www/xdu-inspur` 让 www-data 可读

## 关键改动

- `astro.config.mjs`：`site` 从 `https://www.isc-xdu.cn` 改为 `https://xdu-inspur.cn`
- `dist/` 是 build 产物，**不应** commit 到 Git（`dist/` 已在 `.gitignore` 中）
- GitHub Action 用 `easingthemes/ssh-deploy@main`，与旧站一致（**没有引入新依赖**）

## 第一次部署检查清单

- [ ] GitHub 仓库已建好（比如 `InspurXDU/website-v2`）
- [ ] 4 个 Secret 已配齐
- [ ] 服务器 Nginx 已配置 server_name + root
- [ ] 推送 main → Action 页看 build + deploy 是否通过
- [ ] `curl -I https://xdu-inspur.cn` 看 200 + 正确 Host header
- [ ] 浏览器开 `https://xdu-inspur.cn/` 看 Hero、Members、PosterStack 都正常

## 常见回滚

- 服务器端：`/var/www/xdu-inspur.backup`（rsync 前自动备份，需在 deploy 步骤加 `SCRIPT_BEFORE`）
- Git 端：`git revert <commit>` → push main → 自动重新部署
