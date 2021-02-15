1. 引入Service概念
    * 保存页面范围的全局变量
    * 异步调用网络请求,并分发Action
    * 保存当的reducer标识.原则上一个页面对应一个Service, 从而对应一个Reducer
2. View使用Function Component,最大限度降低UI的厚度
3. 页面退时清理当前Reducer下的数据
