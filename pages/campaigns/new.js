import React, { Component } from 'react';
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimum: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async ()=> {
    try {
      this.setState({errorMessage: "", loading: true});
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(this.state.minimum).send({
        from: accounts[0]
      });

      Router.pushRoute('/');
    } catch(err) {
      this.setState({errorMessage: err.message});
    }

    this.setState({loading: false})
  }

  render() {
    return (
      <Layout>
        <h1>创建众筹</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>请输入最小的贡献量</label>
            <Input label={{ basic: true, content: 'wei' }}
            labelPosition='right' placeholder='请输入最小的贡献量...'
            value = {this.state.minimum} onChange={event=>this.setState({minimum: event.target.value})}/>
          </Form.Field>
          <Message error header="错误提示!" content={this.state.errorMessage}></Message>
          <Button loading={this.state.loading} primary>创建众筹</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
