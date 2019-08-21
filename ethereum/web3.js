import Web3 from 'web3';

var web3;

// 如果浏览器存在provider使用浏览器的provider
if (typeof window != 'undefined' && window.web3 != 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {  // 浏览器不存在provider使用infura服务的provider
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/bdc7db3df9b24971acca76e474ae121f'
  );

  web3 = new Web3(provider);
}

export default web3;
