import React,{useState, useEffect} from 'react';
import './App.css';
import { Link, Redirect } from 'react-router-dom';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import axios from 'axios';
import {useSelector,connect} from 'react-redux';



function ScreenSource(props) {
  //console.log('userprops:', props.user)
  const [data, setData] = useState([]);
  //const [isLogin, setIsLogin] = useState(false);
  const token = useSelector(state => state.user.token)
  let langue = useSelector(state => state.user.language)
  if (langue === "en") langue = "gb";
  // console.log('langue:', langue)
  //if (token !== null && isLogin === false) setIsLogin(true);

  

  const url = `https://newsapi.org/v2/top-headlines/sources?country=${langue}&apiKey=27a05855f0eb408fb16627afd7d2e1b0`


  useEffect(() => {
    axios.get(url)
      .then(response => {
        // console.log(response.data.sources);
        setData(response.data.sources)
      }).catch(err => console.log(err))
  }, [langue])

  return (
    <div>
        <Nav/>
        
       <div className="Banner"/>
       <image src="./icon/flag_fr.png" alt="okkh" />
       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${item.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${item.id}`}>{item.name}</Link>}
                        description={item.title}
                      />
                    </List.Item>
                  )}
                />
          </div>
             
      </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

// export default ScreenSource;
export default connect(
  mapStateToProps, 
  null
  )(ScreenSource);
