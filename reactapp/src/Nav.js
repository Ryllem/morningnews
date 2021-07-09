import React, {useState} from 'react';
import './App.css';
import {Menu, Avatar} from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { HomeOutlined, ReadOutlined, LogoutOutlined } from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux';
import flag_fr from './icon/flag_fr.png';
import flag_en from './icon/flag_en.png';
import axios from 'axios';


function Nav() {

  let dispatch = useDispatch();
  const user = useSelector(state => state.user)
  console.log('user:', user)
  const [isLogin, setIsLogin] = useState(true);

  const setLanguage = langue => {
    if (user.token !== null) {
    axios.post('/setlanguage', {langue, token: user.token})
      .then(res => {
        if (res.data.status === "OK") {
          // console.log("%c Binvenue", "color: green")
          // console.log(res.data)
          dispatch({
            type: "setLangue",
            payload: langue,
          })
        } else {
          console.log(res.data)
        }
      })
      .catch(err => console.log(err))
    } else { console.log("Utilisateur non connecté")}
  }

  const logout = () => {
    if (user.token !== null && user.token !== undefined) {
    axios.post('/logout', {token: user.token})
      .then(res => {
        console.log('res:', res.data);
        dispatch({
          type: "addInfo",
          payload: res.data.message,
        })
        setIsLogin(false);
      })
      .catch(err => console.log(err))
    } 
  }

  return (
    <nav >
      
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">
      <Menu.Item key="user">
        {user ? <span className="mr-100">{`Bonjour ${user.name}`}</span> : ""}
        </Menu.Item>
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
          
        

        <Menu.Item key="app" onClick={logout}>
        <Link to="#">
          <LogoutOutlined className="mr-5" />
          Logout
          </Link>
        </Menu.Item>
        {user.language === "en" ? <Menu.Item key="flag_fr">
        <Avatar src={flag_fr} onClick={() => setLanguage("fr")} /> 
        </Menu.Item> : null }
        {user.language === "fr" ? <Menu.Item key="flag_en">
        <Avatar src={flag_en} onClick={() => setLanguage("en")} />
        </Menu.Item> : null }
        

        
          
        

      </Menu>
      {isLogin ? null : <Redirect to="/" />}
    </nav>
  );
}

export default Nav;
