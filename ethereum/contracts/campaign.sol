pragma solidity ^0.4.24;

// 众筹合约工厂
contract CampaignFactory {
  address[] public deployedCampaign;  // 存储已部署的众筹合约

  // 创建众筹合约
  function createCampaign(uint minimum) public {
    address newCampaign = new Campaign(minimum, msg.sender);
    deployedCampaign.push(newCampaign);
  }

  // 获取已部署的合约
  function getDeployedCampaign() public view returns(address[]) {
    return deployedCampaign;
  }
}

contract Campaign {
  // 众筹请求对象
  struct Request {
    string desciption;  // 描述
    uint value;  // 申请总金额
    address recipients;  // 受益人的地址
    bool compelete;  // 项目是否完成
    mapping(address => bool) approvers;  // 投资者是否同意请求映射表
    uint approvalCount;  // 同意请求的投资人总数
  }

  Request[] public requests;  // 存储众筹请求数组
  address public manager;  // 合约管理者
  uint public minimunContribute;  // 众筹最小投资金额
  mapping(address => bool) public approvers;  // 存储合约投资人
  uint public approversCount;  // 合约总的投资人数量

  modifier restricted {
    require(msg.sender == manager);
    _;
  }

  // 构造函数，创建合约
  constructor(uint minimum, address _address) public {
    minimunContribute = minimum;
    manager = _address;
  }

  // 投资者投资
  function contribute() public payable {
    require(msg.value > minimunContribute);
    approvers[msg.sender] = true;
    approversCount++;
  }

  // 管理员创建众筹请求
  function createRequest(string _description, uint _value, address _address) public restricted {
    Request memory newRequest = Request({
      desciption: _description,
      value: _value,
      recipients: _address,
      compelete: false,
      approvalCount: 0
    });

    requests.push(newRequest);
  }

  // 投资者判断是否支持请求
  function approvalRequest(uint index) public {
    Request storage request = requests[index];
    require(approvers[msg.sender]);
    require(!request.approvers[msg.sender]);
    request.approvers[msg.sender] = true;
    request.approvalCount++;
  }

  // 众筹请求是否成功
  function finalizeRequest(uint index) public restricted payable {
    Request storage request = requests[index];
    require(request.approvalCount > approversCount / 2);
    request.recipients.transfer(request.value);
    request.compelete = true;
  }

  // 合约信息
  function getSummary() public view returns(uint, uint, uint, uint, address) {
    // 最小投资量、合约总的金额、合约请求数量、合约投资人总数、合约管理者地址
    return (minimunContribute, address(this).balance, requests.length, approversCount, manager);
  }

  // 合约请求总数
  function getRequestCount() public view returns(uint) {
    return requests.length;
  }
}
