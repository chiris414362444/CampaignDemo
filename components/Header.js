import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default ()=> {
  return(
    <Menu style={{marginTop: '10px'}}>
      <Menu.Item>
        <img src='https://react.semantic-ui.com/logo.png'/>
      </Menu.Item>
      <Menu.Item>
        <Link route="/">
          <a>首页</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link route="/">
          <a>众筹列表</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link route="/campaigns/new">
          <a>+</a>
        </Link>
      </Menu.Item>
    </Menu>
  )
}
