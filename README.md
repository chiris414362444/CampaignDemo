此Demo是根据真实的商业逻辑完成了一个复杂的众筹智能合约。借助于react框架+reactUI+Nextjs+nodejs+web3j +infura实现了真实企业级全栈的Dapp。以下是Demo实现的大概过程：

1.新建文件夹，在此文件夹下执行npm init；
2.安装项目所需要的库文件，执行npm install --save ganache-cli mocha solc@0.4.24 web3 fs-extra;
3.搭建起项目的目录架构，并在相应目录下编写众筹合约和合约工厂、compile.js；
4.在终端中cd到compile.js所在路径，并执行node compile.js，将合约的abi接口和二进制代码写到指定json文件下（eg：build）；
5.编写测试脚本，修改package.json文件中的scripts的test为mocha，在终端中执行 npm test；
6.在终端中执行 npm install --save truffle-hdwallet-provider，导入 infura部署包；
7.编写部署脚本deploy.js， 并执行node deploy.js 部署合约；
8.安装next，在终端中执行npm install —save next react react-dom;
9.创建next专属的pages文件夹（可根据需要编写测试页面）；
10.修改package.json文件，在scripts中增加"dev": "next dev"；
11.编写脚本web3.js、factory.js，导出web3、factory实例；
12.安装semantic-ui：在终端中执行npm install --save semantic-ui-react；
13.在pages目录下编写项目的前端页面；
14.参照semantic-ui 在components目录下创建项目使用的React组件，页面元素、头部、模板页Layout等；
14.安装next-routes，在终端中执行npm install next-routes --save;
15.编写routes.js和server.js，并修改package.json文件中的scripts的test为node server.js；
16.根据项目页面路由跳转需求修改routes.js文件；
17.在终端中执行 npm run dev启动项目，访问next监听的本地URL地址（http://localhost:3000）