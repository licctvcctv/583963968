# Student-2-System Backend

Express后端服务，端口8002

## 启动服务

```bash
node start.js
```

## API接口

### POST /api/auth/login
- 登录
- 请求体: `{ "username": "李四", "password": "123456" }`
- 响应: 成功时返回用户信息

### GET /api/data/summary
- 汇总统计
- 响应:
  ```json
  {
    "total": 10600,
    "failures": 562,
    "failureRate": "5.30",
    "failureTypes": {
      "TWF": 152,
      "HDF": 254,
      "PWF": 101,
      "OSF": 113,
      "RNF": 24
    }
  }
  ```

### GET /api/data/faults/distribution
- 故障分布
- 响应: 各故障类型数量

### GET /api/data/parameters/stats
- 参数统计
- 响应: 各参数的最小值、最大值、平均值

## 数据源
- 数据文件: `/Users/a136/vs/583963968/student-2-system/data/ai4i2020.csv`
- 数据会在服务启动时自动加载