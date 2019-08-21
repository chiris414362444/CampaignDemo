import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Link } from '../../routes';

class  CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    //console.log(summary);
    return {
      address: props.query.address,
      minimunContribute: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approvalCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      address,
      minimunContribute,
      balance,
      requestCount,
      approvalCount,
      manager
    } = this.props;

    const items = [
      {
        header: manager,
        meta: '管理者地址',
        description: '创建当前众筹的管理者，并且是众筹的受益人。',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimunContribute,
        meta: '最小贡献量',
        description: '当前众筹支持投资的最小金额。',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestCount,
        meta: '请求数量',
        description: '当前管理者创建请求从合约中提前，必须要大于50%的投资人同意。',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approvalCount,
        meta: '投资人数量',
        description: '已经为当前众筹投资的投资人数量。',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether') + ' ETH',
        meta: '当前众筹总金额',
        description: '当前众筹剩余的金额。',
        style: { overflowWrap: 'break-word' }
      }
    ];

    return <Card.Group items = {items}/>;
  }

  render() {
    return(
      <Layout>
        <h1>众筹列表</h1>
          <Grid>
            <Grid.Row>
            <Grid.Column width={10}>
                { this.renderCards() }
              </Grid.Column>
              <Grid.Column width={6}>
                <ContributeForm address={ this.props.address }/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                  <a>
                    <Button primary>查看请求</Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Layout>
    )
  }
}

export default CampaignShow;
