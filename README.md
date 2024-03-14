# Shudong-Frontend V2.0
树洞管理系统前端 2.0



### 项目须知

本仓库为`树洞救援管理系统`的第二版前端仓库

技术栈为 `react` + `redux` + `redux-thunk`+  `taro` + `less` + `vitest`

目前一共分为3个 module，功能如下：

- `moduleA`: 救援信息相关
- `moduleB`: 数据展示相关
- `moduleC`: 各种表单以及视频页面（视频页面之后应该会移走）

---

各`slice`处理内容如下：

- `MyInfoSlice`: 处理个人信息，包括个人救援信息
- `RescueInfoByIDSlice`: 处理通过`targetID`检索到的救援信息内容，包括对象所有的救援记录，以及每条记录的救援状态和救援对象信息等
- `RescueInfoSlice`: 通过`rescueIndex`查询的救援信息内容，包括当前记录的救援状态和救援对象ID等





## 重构日志😇



### 2024.03.08

- 又是一周🥹
- 解决了签名有时会偏移的问题😟真的是气死我了，破`canvas`的`dpi`还不一样
- 把与`canvas`有关的 `useState`全换成`useRef`，终于不卡咯



### 2024.03.01

- 新增`canvas`数字签名
- 解决了主页面会有重复数据的`bug`
- 改用`Virtual List`优化渲染性能
- 合并`MyRescueInfo`和`MainPage`中的`MsgItem`组件，改名为`RescueMessageInfoItem`



### 2024.02.25

- 人在火车，今天开学，补个文档🥹
- `Rescue`系列页面已经重构完毕，新增`RescueInfoByTargetIDSlice`和`MyInfoSlice`
- 重写`fetchBase`函数，改用范型，集成`redux-thunk`



### 2024.02.14

- `Approve`参数也巨多，想了一下，还是该用`redux`
- 创建`store`和`rescueInfoSlice`
- 重构`Rescue`主页面
- 迟来的`test`



### 2024.02.07

- 发现`Rescue`这一系列页面参数巨多，优化参数数量，考虑要不要改成`redux`
- 重写`moduleA/components`



### 2024.02.05

- 好久没动了，今天开工🥰
- 把`components`全部重写完毕



### 2024.01.27

- emmm，怎么说呢，改ts的过程中问题还是不少的，好在经过两天，总算是把请求这里封装完了，正在把请求全部改成新ts组件
- 更改了`searchbar`页面，实在看不下去了，减少了参数数量，删除不必要的依赖，马上写测试
- 更改了`index`页面，把`index`的请求全换成新的了，扔在`service`里
- 马上过年咯🧧



### 2024.01.25

- 开工了，接手第一天😀，没干什么，捋了一下项目逻辑，有点小乱
- 确定了初步重构的目标：先把请求封装了，目前页面上全是请求，可读性很差
