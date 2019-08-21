const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compileFactory = require("../ethereum/build/CampaignFactory.json");
const compileCampaign = require("../ethereum/build/Campaign.json");

var accounts, factory, campaignAddress, campaign;

beforeEach(async() => {
  accounts = await web3.eth.getAccounts();

  // 获取合约工厂实例
  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
    .deploy({data: '0x' + compileFactory.bytecode}).send({from: accounts[0], gas: '1000000'});

  // 通过合约工厂实例创建一个合约项目
  await factory.methods.createCampaign('100').send({from: accounts[0], gas: '1000000'});

  // 通过合约工厂实例获取已部署的合约项目，返回结果为合约地址的数组
  [campaignAddress] = await factory.methods.getDeployedCampaign().call();

  // 通过合约地址获取合约实例
  campaign = await new web3.eth.Contract(JSON.parse(compileCampaign.interface), campaignAddress);
})

describe('campaign', ()=> {
  it('deploy a factory and campaign', ()=> {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  })

  it('manager address', async ()=> {
    const manager = await campaign.methods.manager().call();
    assert(manager, accounts[0]);
  })

  it('allow people to contribute', async ()=> {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200',
    });

    const isContribute = await campaign.methods.approvers(accounts[1]).call();
    assert(isContribute);
  })

  it('require a minimum contribute', async ()=> {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '5'
      })

      const isContribute = await campaign.methods.approvers(accounts[1]).call();
      assert(isContribute);
    } catch(err) {
      assert(err);
    }
  })

  it('allows a manager to make request', async ()=> {
    await campaign.methods.createRequest('Buy BTC', '100', accounts[1]).send({
      from: accounts[0],
      gas: '1000000'
    });

    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy BTC', request.desciption);
  })
})
