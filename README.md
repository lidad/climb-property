# 爬一发房产交易信息

- 爬取链家网二手房交易信息
- 已爬取全上海与杭州滨江区的成交信息
- 采取MongoDB存储信息

## 如何运行
```
+ $ npm run install            // 安装依赖
+ $ npm run climbhangzhou      // 爬取杭州滨江交易信息并写入数据库
+ $ npm run climbshanghai      // 爬取上海交易信息并写入数据库
```

## Todos
- 出租信息爬取
- 数据可视化

## 针对反爬虫
- 网站过分请求后会锁定ip，然后进行图片验证。。。
- 采用同步访问网站的策略，即爬一个回合的数据（每一回合的访问页数通过config的eachOperand设置），
  将数据写入数据库，再去爬下一个回合的数据。利用数据库存储的时间间隔来延迟访问
