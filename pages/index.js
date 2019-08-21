import React, {Component} from 'react';
import factory from '../ethereum/factory';
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

  // next服务器的生命周期函数
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaign().call();
    return { campaigns };
  }

  // React的生命周期函数
  //async componentDidMount() {
    //const campaigns = await factory.methods.getDeployedCampaign().call();
    //console.log(campaigns);
  //}

  renderCampaign() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <Link route={`campaigns/${address}`}><a>查看众筹</a></Link>,
        fluid: true
      }
    });

    return <Card.Group items = {items}/>;
  }

  render() {
    return(
      <Layout>
        <div>
          <h3>众筹列表</h3>
          <Link route='campaigns/new'>
            <a>
              <Button content = '创建众筹' icon='add' primary floated='right'></Button>
            </a>
          </Link>
          {this.renderCampaign()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
