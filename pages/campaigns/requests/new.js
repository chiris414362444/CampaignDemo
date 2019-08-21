import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Route } from '../../../routes';
import Layout from '../../../components/Layout';

class CampaignRequestNew extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  state = {
    description: '',
    value: '',
    recipientAddress: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async () => {
    event.preventDefault();
    this.setState({ loading: true });

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      const { description, value, recipientAddress } = this.state;

      await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipientAddress).send({
        from: accounts[0]
      });
      
      Route.pushRoute(`/campaigns/${this.props.address/requests}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <h1>增加请求</h1>
        <Form onSubmit={ this.onSubmit } error={ !!this.state.errorMessage }>
          <Form.Field>
            <label>请求描述</label>
            <Input value={ this.state.description} onChange={ event=>this.setState({ description: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>请求金额(ETH)</label>
            <Input value={ this.state.value} onChange={ event=>this.setState({ value: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>受益人地址</label>
            <Input value={ this.state.recipientAddress} onChange={ event=>this.setState({ recipientAddress: event.target.value })} />
          </Form.Field>
          <Message error header="错误提示" content={ this.state.errorMessage } />
          <Button loading={ this.state.loading } primary>投资</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignRequestNew;
