由于使用了thinkphp MVC框架编写 首先保证php版本高于5.3.1，然后
配置php.ini 中寻找session.auto_start设置为1 并重启apache服务器 否则登录后台的session判断会失效
项目结构树请参看 项目结构.txt 文件中有详细说明

mysql 的用户名为root 密码为root

此案例的百度新闻前台登录页面为
localhost/jkxy
前台页面的新闻请求为异步拉取，后台增加新的新闻记录后，前端直接点击版块即可看到


后台为
localhost/jkxy/admin  


登录后台的用户名和密码设了3个，任选一个登录，
用户名1 密码1
用户名jkxy 密码jkxy
用户名lee 密码lee

后台页面使用登录判断，(使用session）, 主index页面完成了单页面完成数据增删改查，并完成了图片的上传处理工作






