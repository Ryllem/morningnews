import React, {useEffect, useState} from 'react';
import './App.css';
import { useParams } from "react-router-dom";
import { Card, Modal} from 'antd';
import { ReadOutlined, LikeOutlined  } from '@ant-design/icons';
import Nav from './Nav';
import axios from 'axios';
import {connect, useSelector} from 'react-redux';

const { Meta } = Card;


function ScreenArticlesBySource(props) {

  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const userToken = useSelector(state =>  state.userToken)
  
  const showModal = myIndex => {
    setIsModalVisible(true);
    setModalIndex(myIndex);
  }
  
  let { mysource } = useParams();
  const urlBySource = `https://newsapi.org/v2/top-headlines?sources=${mysource}&apiKey=27a05855f0eb408fb16627afd7d2e1b0`

  useEffect(() => {
    axios.get(urlBySource)
      .then(response => {
        setData(response.data.articles)
      }).catch(err => console.log(err))
  }, [])

  const articles = data.map( (article, index) => {
    return(<Card
    key={index}
    style={{ 
    width: 300, 
    margin:'15px', 
    display:'flex',
    flexDirection: 'column',
    justifyContent:'space-between' }}
    cover={
    <img
        alt={article.source.name}
        src={article.urlToImage}
    />
    }
    actions={[
        <div className="containerFlex">
          <ReadOutlined style={{ fontSize: "25px"}} onClick={() => showModal(index)} />
          <LikeOutlined style={{ fontSize: "25px"}} onClick={() => props.addArticleClick({title: article.title, img: article.urlToImage, description: article.description, userToken})}/>
        </div>
        
    ]}
    >

    <Meta
      title={article.title}
      description={article.description}
    />

  </Card>)
})
  

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>
            <div className="Card">
              <div  style={{display:'flex',justifyContent:'center', flexWrap: "wrap"}}> 
                {articles}
              </div>
           </div> 
           <Modal title={data[modalIndex] ? data[modalIndex].title : ""} visible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
              <p>{data[modalIndex] ? data[modalIndex].description : ""}</p>
          </Modal>
    </div>
  );
}


function mapDispatchToProps(dispatch) {
  return {
  addArticleClick: function(info) { 
  dispatch( {
    type: 'addArticle',
    payload: {title: info.title, content: info.description, img: info.img}
  } ) 
  },
  onDecreaseClick: function() { 
  dispatch( {type: 'decrease'} ) 
  },
  onResetClick: function() { 
  dispatch( {type: 'reset'} ) 
  },
  }
  }


  export default connect(
  null, 
  mapDispatchToProps
  )(ScreenArticlesBySource);
