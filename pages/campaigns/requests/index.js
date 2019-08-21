import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class CampaignRequest extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call();
      })
    );

    return { address, requests, approversCount };
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          id= { index }
          key= { index }
          request= { request }
          address = { this.props.address }
          approversCount = { this.props.approversCount }
        ></RequestRow>
      )
    })
  }

  render() {
    //console.log(requests);
    return (
      <Layout>
        <h1>请求列表</h1>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>增加请求</Button>
          </a>
        </Link>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>请求描述</Table.HeaderCell>
              <Table.HeaderCell>总金额</Table.HeaderCell>
              <Table.HeaderCell>受益人地址</Table.HeaderCell>
              <Table.HeaderCell>同意数量</Table.HeaderCell>
              <Table.HeaderCell>是否同意</Table.HeaderCell>
              <Table.HeaderCell>是否完成</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.renderRow() }
          </Table.Body>
        </Table>

      </Layout>
    );
  }
}

export default CampaignRequest;
