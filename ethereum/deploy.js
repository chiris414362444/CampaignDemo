const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compileFactory = require("./build/CampaignFactory.json")
const provider = new HDWalletProvider(
  'bacon sick habit grain pen turtle sad solid wolf stumble sound emerge',  // 助记词
  'https://rinkeby.infura.io/v3/bdc7db3df9b24971acca76e474ae121f' // rinkeby测试网络
);
const web3 = new Web3(provider);
const deploy = async ()=>{
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data: '0x' + compileFactory.bytecode})
          .send({from: accounts[0], gas: '1000000'});
  console.log('contract deploy to', result.options.address);
}

deploy();
