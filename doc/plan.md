##远景
####搭建一个灵活易用,扩展性强的React Native开发框架
    + 基于Redux的开发框架
    + 代码热更新
    + Native基建稳定,可维护(Native和JS分离),可快速定制
  
##详细设计
####基于Redux的开发框架
    [x]1. 尝试采用一个页面对应一个State的方式替换combineReducer? 降低软件复杂性
        + 使用一个RootReducer实现,根据传入的action和PageIdentifier来操作对应的state,组件新的全局state后返回
        + 是否影响性能?
            + 其实现在的combine也是在一个大的state中
            + combine Reducer不好处理动态增加Reducer的情况
        + 如何处理同一个page多个实例的情况? 
            + 自定义PageIdentifier
    2. 是否使用Logger中间件打印日志?
    4. 是否需要增加Action Factory 来避免Service中Action的字段过多?
    5. 是否需要service暴露接口,还是直接把Service传给View使用?
    6. 引入useHeader和useQuery


####基建
    + 集成Bugly or 友盟统计
    + Native和JS分离 
      + 多Bundle加载
    + 可快速定制
      [x]+ Android基于Gradle
        + 配置CodePush
        + 配置包名
        + 配置APP名字
      [x] + 需要实现CodePush动态下载和刷新资源(Native实现?)
         + 完善Shell CodePush下载的过度页
         + 过渡页面的入口问题
         + 尝试编译时从CodePush服务器现在内置包
         + 打印日志输出优化
      [x]+ Stage怎么实现?
      + iOS?
    + 基建沉淀
      [x]+ NPM上传框架供第三方使用
      + 达到快速集成Native模块的目标, 抽离常用Native基建,生成AAR
      + Code Push重构

####DevOps
    [x] + 区分dev, staging和release
    + Jenkins or 其他工具打包?
    [x] + Code Push  or Pushy


####开发者工具
    + 开发时可以扫码安装Bundle

##Demo功能开发
     [x]1. 使用Flatlist展示新闻列表
     [x]2. 点击打开详情页面,详情页展示详情信息,下部展示列表信息,从类别可以再次打开新的详情
     [x]3. 实现navigateTo
     4. 实现下拉加载更多
     [x]5. 详情使用Webview展示text
     
##命名
     [x]1. 改名为React Native Framework
     2. setting.gradle改名ReduxFramework
