# auto-template-ts
>auto.pro 带UI的webpack模板.加入ts支持,加入es6-shim以支持大部分es6特性.

## 使用
1. 首次使用需要安装npm包：vscode控制台下执行```npm i```  或者 ```yarn```。
2. 安装完毕后，执行```npm run build```或```npm start```编译源文件。
3. 唯一入口文件/auto_project/main.js ,auto.js配置文件为/auto-project/project.json
4. 在新窗口打开dist文件夹，连接到手机
5. 修改auto.js插件加入watch自动保存到手机功能, 自动编译后自动保存到手机

## 说明
- 如果界面模板不含有```{{}}```绑定的话，可以直接通过```files.read```加载文件夹内的```xml```文件。
- 如果要使用```{{}}```功能，需要使用字符串模板，即将xml内容用``` ` ```号包起来，此时可以使用JS的```${}```来替代```{{}}```。


## 友情提示
1. 修改了```webpack.config.js```的话，```npm start```需要重新执行才能使配置生效。
2. 模板是为了方便的压缩、组织代码，以及使用npm包。如果您觉得一些文件不需要上述功能，可直接在```src```外照常写文件。
## 参考
<https://github.com/molysama/auto-template-android>
# LICENSE
MIT.