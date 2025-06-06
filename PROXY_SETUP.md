# 代理服务器配置说明

## 概述

为了解决前端应用直接调用百度地图API时遇到的跨域问题，我们在Vite开发服务器中配置了代理服务器。

## 配置详情

### Vite代理配置

在 `vite.config.ts` 中添加了以下代理配置：

```typescript
server: {
  proxy: {
    // 代理百度地图API请求
    '/api/baidu': {
      target: 'https://api.map.baidu.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/baidu/, ''),
      secure: true,
      headers: {
        'Referer': 'http://localhost:5173'
      }
    }
  }
}
```

### 配置说明

- **target**: 目标服务器地址，指向百度地图API服务器
- **changeOrigin**: 修改请求头中的origin字段，避免跨域问题
- **rewrite**: 重写请求路径，将 `/api/baidu` 前缀移除
- **secure**: 启用HTTPS支持
- **headers**: 添加Referer头，满足API调用要求

## API路径映射

| 原始API地址 | 代理后的地址 |
|------------|-------------|
| `https://api.map.baidu.com/geoconv/v1/` | `/api/baidu/geoconv/v1/` |
| `https://api.map.baidu.com/reverse_geocoding/v3/` | `/api/baidu/reverse_geocoding/v3/` |
| `https://api.map.baidu.com/weather/v1/` | `/api/baidu/weather/v1/` |

## 代码修改

在 `WeatherDisplay.vue` 组件中，所有的API请求都已修改为使用代理路径：

```javascript
// 坐标转换API
const response = await fetch(
  `/api/baidu/geoconv/v1/?coords=${lng},${lat}&from=1&to=5&ak=${BAIDU_AK}`
)

// 逆地理编码API
const response = await fetch(
  `/api/baidu/reverse_geocoding/v3/?ak=${BAIDU_AK}&output=json&coordtype=bd09ll&location=${lat},${lng}`
)

// 天气API
const weatherUrl = `/api/baidu/weather/v1/?district_id=${districtId}&data_type=all&ak=${BAIDU_AK}`
const response = await fetch(weatherUrl)
```

## 使用方法

1. 确保已在 `.env.local` 文件中配置了百度API密钥：
   ```
   VITE_BAIDU_API_KEY=your_baidu_api_key_here
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 访问 `http://localhost:5173/` 查看应用

## 注意事项

1. **仅在开发环境有效**: 此代理配置仅在Vite开发服务器中生效
2. **生产环境部署**: 在生产环境中需要在服务器端配置相应的代理规则
3. **API密钥安全**: 确保API密钥不会暴露在客户端代码中
4. **网络请求**: 代理服务器会将所有 `/api/baidu/*` 的请求转发到百度API服务器

## 故障排除

### 常见问题

1. **代理不生效**: 确保重启了开发服务器
2. **API调用失败**: 检查API密钥是否正确配置
3. **网络错误**: 确保网络连接正常，能够访问百度API服务器

### 调试方法

1. 打开浏览器开发者工具的Network面板
2. 查看API请求是否正确转发到代理路径
3. 检查响应状态码和错误信息
4. 查看控制台是否有相关错误日志

## 技术栈

- **Vite**: 构建工具和开发服务器
- **Vue 3**: 前端框架
- **TypeScript**: 开发语言
- **百度地图API**: 天气数据来源