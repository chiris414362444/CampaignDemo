import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Route } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async () => {
    event.preventDefault();
    this.setState({ loading: true });

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Route.replaceRoute(`/campaign/${ this.props.adddress }`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={ this.onSubmit } error={ !!this.state.errorMessage }>
        <Form.Field>
          <label>总的投资额</label>
          <Input label='ETH' labelPosition='right' value={ this.state.value }
            onChange={ event=>this.setState({ value: event.target.value })} />
        </Form.Field>
        <Message error header="错误提示" content={ this.state.errorMessage } />
        <Button loading={ this.state.loading } primary>投资</Button>
      </Form>
    )
  }
}

export default ContributeForm;
