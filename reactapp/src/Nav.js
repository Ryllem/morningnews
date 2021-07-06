import React from 'react';
import './App.css';
import {Menu} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, ReadOutlined, LogoutOutlined } from '@ant-design/icons';

function Nav() {

  return (
    <nav >
      
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
        <Link to="/screensource">
          <HomeOutlined className="mr-5" />
          Sources
          </Link>
        </Menu.Item>
        
        
          <Menu.Item key="test" >
          <Link to="/screenmyarticles">
          <ReadOutlined className="mr-5" />
          My Articles
          </Link>
        </Menu.Item>
          
        

        <Menu.Item key="app">
        <Link to="/">
          <LogoutOutlined className="mr-5" />
          Logout
          </Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
