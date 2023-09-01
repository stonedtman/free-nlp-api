# NLP引擎部署文档



## 环境说明

### 开发环境

| 工具  | 版本    | 备注     |
| ----- | ------- | -------- |
| JDK   | 1.8     | 强制要求 |
| MySQL | 5.7.24+ | 强制要求 |
| Redis | ——      |          |

### 使用工具
| 工具  | 说明 |
| ----- | ------- |
| IntelliJ IDEA   | Java编程语言开发的集成环境 |
| Navicat | Mysql数据库管理工具 |
| RedisDesktopManager | Redis可视化管理工具 |
## 环境安装

### 安装Java环境

JDK8 Oracle官方下载地址：https://www.oracle.com/java/technologies/downloads/#java8

window安装JDK8 参见： https://www.cnblogs.com/zhangzhixing/p/12953187.html

Linux安装JDK8 参见： https://www.jianshu.com/p/75f0f34b599d
### 安装MySQL
Mysql5.7安装方式可以参见：https://www.runoob.com/mysql/mysql-install.html
### 安装Redis
- 安装

源码及apt安装

http://www.imxmx.com/Item/1/211097.html

- 配置

关于redis的配置这篇文章说的很详细

https://www.cnblogs.com/ysocean/p/9074787.html
## 启动后端程序

### 编译器运行调试

- 使用Git工具或者编译器最新源代码 地址https://gitee.com/stonedtx/free-nlp-api.git

- 使用idea或者eclipse

- 打开项目设置JDK1.8

  ![设置JDK8](ProIMG/设置JDK8.png)

  ![设置Modules的JDK8](ProIMG/设置Modules的JDK8.png)

- 设置maven地址指向本地maven

  ![设置maven](ProIMG/设置maven.png)

- 使用navicat或命令行创建数据库free_nlp_data

  ![创建数据库](ProIMG/创建数据库.png)

- 选择刚刚创建的数据库，右键选择运行SQL文件进行导入数据库，SQL文件的位置项目的db\free_nlp_data.sql

  ![导入数据库文件](ProIMG/导入数据库文件.png)

- 打开项目的配置文件application.yml修改数据库和redis的地址、用户名、密码信息

```
# 数据源配置
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/free_nlp_data?characterEncoding=UTF-8&useSSL=false
    username: root
    password: 1234
```

```
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    max-active: 10000
    max-idle: 10
    max-wait: 100000
    timeout: 100000
```

- 等待maven配置好所有的相关依赖就可以点击运行了。



### JAR包运行

下载发行版找到最新Jar包 然后再终端 运行 java -jar JAR包名.jar

### Docker运行




## 启动前端程序
- 因为本项目是前后端分离的，所以需要前后端都启动好，才能进行访问
- 
- 
## 常见问题

## 产品经理微信
## 技术交流群