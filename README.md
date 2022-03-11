# 字节-电子科大技术训练营：肥鼠问卷调查平台-前端部分

基于Node.js+Express+React+MongoDB技术栈，以问卷星为竞品，模仿真实开发流程，基本功能完善

## 模块划分

* 注册登录模块：包含修改密码等
* 问卷管理模块：包括新建问卷功能，同时可对不同状态（未发布、发布中、已结束）的问卷进行编辑、删除、查看等操作
* 新建问卷模块：设置问题数量、类型、顺序等信息
* 编辑问卷模块：可对问卷进行修改，新增编辑态及非编辑态
* 问卷填写模块：通过链接填写问卷（无需登录）
* 问卷查看模块：以可视化形式展示问卷填写结果、可查看答卷记录

## 业务流程图

![流程图](https://user-images.githubusercontent.com/45390884/157791240-488a5f81-85a5-4947-a9da-8e6e5144b912.png)

## Install（前端）

### 环境依赖

* antd
* echarts
* moment
* jquery

### Run

```
npm install
npm start
```

## Install（后端）

### 项目地址

[问卷调查平台-后端地址](https://github.com/ClaraShar/qsystem)

### 环境依赖

* node.js
* express
* mongoose
* nodemon
* md5

### Run

```
npm install
npm run debug-api
```

## 部分截图

* 新建问卷
![新建问卷](https://user-images.githubusercontent.com/45390884/157791263-8573bf53-351e-494d-a6ac-7049567d9338.png)
* 问卷管理
![问卷管理](https://user-images.githubusercontent.com/45390884/157791278-db1449f4-a150-4e14-b37a-b189437bf274.png)
* 填写问卷
![填写问卷](https://user-images.githubusercontent.com/45390884/157791296-1553c7cf-5907-45b2-b5cd-25e6af733196.png)
* 结果分析
![结果分析](https://user-images.githubusercontent.com/45390884/157791310-9700488e-1f95-441d-a510-7231985cc301.png)
* 问卷详情
![问卷详情](https://user-images.githubusercontent.com/45390884/157791326-18e9978b-0650-4d84-b2d5-146b08bcbbf9.png)

## 项目文档地址（飞书）

[项目文档地址](https://bytedance.feishu.cn/drive/folder/fldcnVNFLobUxcPWpYwgHdk5lQr)
