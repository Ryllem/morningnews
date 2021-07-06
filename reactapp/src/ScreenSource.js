import React,{useState, useEffect} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import axios from 'axios';

function ScreenSource() {

  const [data, setData] = useState([]);

  const url = "https://newsapi.org/v2/top-headlines/sources?country=fr&apiKey=27a05855f0eb408fb16627afd7d2e1b0"


  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response.data.sources);
        setData(response.data.sources)
      }).catch(err => console.log(err))
  }, [])

  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>

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

export default ScreenSource;
