# 这是一个基于vue框架完成的移动端app项目

## 项目演示地址：[vue-learn.52chye.cn](vue-learn.52chye.cn)

### 项目所用接口地址[http://www.liulongbin.top:3005](http://www.liulongbin.top:3005)
---
## 项目所用技术：webpack4*/vue.js/vue-router/vue-resource/vuex/mui/mintui/elementui
---
## webpack4*与webpack3*相比发生了很多变化，具体参考[webpack4](https://www.webpackjs.com/concepts/)，项目中遇到的版本不兼容的坑如下：
- webpack4 打包方式：`webpack .\src\main.js(要打包文件路径) -o .\dist\bundle.js `（目标路径）--mode=development

- 配置webpack-dev-server之后基本不用自己手动打包了(自动打包命令为npx webpack)
   1. 在控制台打印npx webpack之后，
   2. 由于没有手动指定webpack入口和出口文件，webpack会自动寻找webpack.config.js文件
   3. webpack会去解析这个文件，得到导出的配置对象`module.exports`
   4. 得到相应配置对象中的制定入口和出口`entry output`然后进行打包构建

- webpack-dev-serverde（自动打包编译工具）用法
   1. 运行`npm i -d webpack-dev-server`安装依赖(如果没有全局安装需要全局安装`npm i -g webpack-dev-server`)
   2. 每次手动输入webpack-dev-server太麻烦，在package.json文件中scrip添加dev命令:
   ```
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack",
            "dev": "webpack-dev-server --host 192.168.0.103 --open --port 3000 --contentBase src --hot"
        },
   ```
   3. 每次运行npm run dev就可以自动打包编译，默认开启本地服务127.0.0.1:8000
   4. webpack-dev-server自动打包编译的bundle.js是托管于项目根目录中的（存储在内存中），非dist目录下的bundle.js
   5. 因此要将index中引用路径改为/bundle.js，否则页面不会刷新
   6. `--host 192.168.0.103 --open --port 3000 --contentBase src --hot`配置主机ip，自动开启，自动寻找src目录以及热更新
   7. webpack-dev-server也可以选择在webpack.config.js中配置(webpack4*无需再配置热更新插件)
   ```
         devServer: {
            open: true,
            port: 3000,
            contentBase: 'src',
            hot: true,
         },
   ```

- 使用webpack-html-plugin插件将index页面添加到内存中，不需要再index中引入/bundle,js
   1. `npm i -d webpack-html-plugin`安装依赖插件
   2. webpack中引入插件`const htmlWebpackPlugin = require('html-webpack-plugin')`
   3. 在plugins配置节点中设置
   ```
      new htmlWebpackPlugin({
         // 创建一个在内存中生成html页面的插件
               // 指定的模版html页面，会根据制定路径生成
               template: path.join(__dirname,'src/index.html'),
               // 生成的页面的名称
               filename:'index.html',
         }),
   ```
   4. 这个插件的作用就是自动生成内存中的html页面并且自动将内存中打包好的bundle.js插入进去

- loader的安装与使用注意点
   1. 例：直接使用link的方式引入css可以达到效果但是会发起对css文件的二次请求，不推荐
   2. 正确的做法：使用import导入外部样式表 `import ./lib/main.css`
   3. 但是webpack默认只能打包js文件，无法解析其他类型文件 --> 手动安装loader使用loader转换
   4. loader的安装与配置：以css为例：
      - 安装对应loader`npm i -d css-loader npm i -d style-loader`
      - 在webpack.js配置节点module下rules数组中配置转化信息
      ```
         module: {
         rules:[
               // css转化顺序：先使用css-loader转化为css代码,再使用style-loader将css插入到<style>标签中
               // 在rules中存放了所有第三方模块的匹配和处理规则
               {
                  test:/\.css$/,
                  use:['style-loader','css-loader']
               },
               // 书写顺序：'style-loader','css-loader','sass-loader'从后往前调用
               // 转化顺序：sass -> css -> style
               {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
               },
               {
                  test:/\.(jpg|png|jpeg|gif)$/,
                  // limit限制编码的大小，达到大图保真，小图压缩的功能,小于limit值（字节）的图片才会被压缩base64字符串
                  use:'url-loader?limit=20772'
               },
               {
                  test:/\.(ttf|eot|svg|woff|woff2)$/,
                  use: 'url-loader'
               },
               {
                  // 在webpack中默认只能处理一些es6语法，一些更高级的es6、es7语法无法处理，只能借助babel转化为可以处理的低级与法之后再打包编译
                  test:/\.js$/,
                  use: 'babel-loader',
                  // node_modules下的js文件不需要被转化
                  exclude: /node_modules/
               },
               {
                  test:/\.vue$/,
                  use: 'vue-loader',
               },
               {   test: /\.ico$/,
                  use: 'file-loader?name=[name].[ext]'
               },
            ]
         }
      ```
   5. 安装babel-loader的注意点：(babel-loader 8.x | babel 7.x)或者(babel-loader 7.x | babel 6.x)
   版本一定要对应好，8对应7 7对应6 不然会报错，报错的话检查一下自己package.json中两个包的版本
   6. 配置vue-loader后webpack4*版本还需要加入vue插件`const vueLoaderPlugin = require('vue-loader/lib/plugin')`
   并在plugins配置节点中加入`new vueLoaderPlugin()`