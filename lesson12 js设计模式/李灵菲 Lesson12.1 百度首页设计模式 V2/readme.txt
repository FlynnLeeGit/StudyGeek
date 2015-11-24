
fis3 版本 v3.3.0
运行环境 windows 7 x64 

├─build                    编译后 发布用目录
├─node_modules             自动化用到的打包插件
│  └─fis3-postpackager-loader   
│  └─fis3-fis3-hook-relative 
│
└─src                    开发目录 资源文件
    ├─css                css文件夹
    ├─font               字体文件夹
    ├─img                图片文件夹
    │  ├─bg
    │  ├─dh
    │  ├─pbl
    │  ├─sp 
    │  ├─sprites        雪碧图文件夹
    │  └─tj
    ├─js                 js文件
    └─lib                公共js或css
index.html                 入口文件
 
编译后
所有静态资源使用hash后缀，css压缩合并，js压缩合并，png压缩，js中的图片路径已解析适应自动化，发布后的静态资源映射表位于conf文件夹中，（已添加依赖关系）


