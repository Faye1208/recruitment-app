 ## 项目简介

   本项目是一个求职招聘的应用


 ## 技术栈

 + 前端：react-create-app + react16 + redux + react-router 4 + axios + antd-mobile 2

 + 后台：express + mongodb


 ## 运行项目

  + 获取项目:

        git clone git@github.com:Faye1208/recruitment-app.git

  + 打开项目所在目录:

        cd recruitment-app/

  + 安装项目依赖：

        npm install

  + 启动后台：

        node server/server.js

  + 启动前端：

        npm start



 ## 功能

  + 登录注册：区分genius和boss两种用户并简单的校验用户输入

  + 完善用户个人信息：用户可以根据需求添加求职或者招聘信息以及完善个人信息

  + 根据用户身份展示对应的用户列表：通过判断用户类型，从而展示对应的用户列表

  + 消息列表：展示与当前用户有消息往来的用户的相关信息，实时更新未读消息数量，展示最后一条聊天消息

  + 用户中心：展示当前用户个人信息以及退出功能

  + 聊天功能：展示聊天双方的聊天内容以及某些个人信息

  + 用户权限校验：除了登录页以及注册页，访问其他页面均需要进行用户权限校验，校验通过才能继续访问页面，否则会跳转到登录页面













