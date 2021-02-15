1. Android Native(也包括iOS) https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-get-started#android-setup
2. JS 集成 https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-plugin
3. 部署
   + AppCenter创建应用https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli#app-management
     + appcenter apps create -d RNFDemo-Android -o Android -p React-Native
     + appcenter codepush deployment add -a sfshine-msn.cn/RNFDemo-Android Staging
     + appcenter codepush deployment add -a sfshine-msn.cn/RNFDemo-Android Production
   + 为Android 添加Key https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-deployment#android
   + App 发布 https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-updates
