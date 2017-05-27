# 爬一发房产交易信息

- 爬取链家网二手房交易信息
- 已爬取全上海与杭州滨江区的成交信息
- MongoDB存储信息
- express与echat搭建数据可视化服务

## 结果展示

![image](https://raw.github.com/lidad/climb-property/master/public/home_page.jpg)
![image](https://raw.github.com/lidad/climb-property/master/public/chart.jpg)

## 如何运行

```
$ npm run install            // 安装依赖
$ npm run climbhangzhou      // 爬取杭州滨江交易信息并写入数据库
$ npm run climbshanghai      // 爬取上海交易信息并写入数据库
$ npm run dev                // 以开发环境启动数据可视化服务
$ npm run bundlejs           // 打包静态资源
$ npm run start              // 以生产环境启动数据可视化服务
```

## Todos
- 完善数据的显示
- 完善网站交互

## 针对反爬虫
- 网站过分请求后会锁定ip，然后进行图片验证。。。
- 采用同步访问网站的策略，即爬一个回合的数据（每一回合的访问页数通过config的eachOperand设置），
  将数据写入数据库，再去爬下一个回合的数据。利用数据库存储的时间间隔来延迟访问
