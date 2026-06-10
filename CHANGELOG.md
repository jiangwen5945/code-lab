# 开发日志

## 2026-06-10

### Cloudflare Pages 部署

**问题：** Vite 配置了 `base: '/code-lab/'`，构建产物中资源引用路径为 `/code-lab/assets/*`。部署到Cloudflare Pages 后，资源请求 404。

**原因：Cloudflare** Pages 将 `dist/` 内容部署在项目 URL 根路径，而 `index.html` 中引用的资源路径带 `/code-lab/` 前缀，与实际路径不匹配。

解决方案：在项目创建 `pubilc/_redirects` 文件处理 `/code-lab/` 路径重写：

```
/code-lab / 200
/code-lab/* /:splat 200
```

---



### EdgeOne Pages 部署路径问题

**问题：** Vite 配置了 `base: '/code-lab/'`，构建产物中资源引用路径为 `/code-lab/assets/*`。部署到 EdgeOne Pages 后，资源请求 404。

**原因：** EdgeOne Pages 将 `dist/` 内容部署在项目 URL 根路径，而 `index.html` 中引用的资源路径带 `/code-lab/` 前缀，与实际路径不匹配。

**解决方案：** 在项目根目录创建 `edgeone.json`，配置 rewrite 规则透明重写：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/code-lab",
      "destination": "/"
    },
    {
      "source": "/code-lab/*",
      "destination": "/:splat"
    }
  ]
}
```

**注意点：**

- rewrite 语法使用 `*` 通配符 + `:splat` 捕获，不能用 `:path*`
- 需要两条规则分别处理 `/code-lab` 根路径和 `/code-lab/*` 子路径
- 搭配 `createWebHashHistory()` hash 路由，SPA 路由无需服务端处理
