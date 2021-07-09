import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Modal } from "antd";
import Nav from "./Nav";
import { connect, useSelector } from "react-redux";
import { DeleteOutlined, ReadOutlined } from "@ant-design/icons";
import axios from 'axios';

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const [wishlist, setWishlist] = useState([]);

  const showModal = (myIndex) => {
    setIsModalVisible(true);
    setModalIndex(myIndex);
  };

	const token = useSelector(state => state.user.token)
	

	useEffect(() => {
		const findWishList = async () => {

		const rawData = await fetch('/getwishlist', {
			method: 'POST',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: `token=${token}`
		})

		const jsonData = await rawData.json()
		setWishlist(jsonData)
		console.log(jsonData);
		}
		findWishList()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[wishlist.length] );


  const deleteArticle = (title) => {
    axios.delete(`/wishlist/${token}/${title}`)
      .then(response => {
        console.log('response API for Delete:', response);
        setWishlist(response.data.wishlist)

      }).catch(err => console.log(err))
    
    
  }

  const myWishlist = wishlist.map((list, index) => {
    return (
      <Card
        key={index}
        style={{
          width: 300,
          margin: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        cover={<img alt="example" src={list.img} />}
        actions={[
          <ReadOutlined onClick={() => showModal(index)}/>,
          // <DeleteOutlined onClick={() => props.deleteArticle(list.title)} />,
          <DeleteOutlined onClick={() => deleteArticle(list.title)} />,
        ]}
      >
        <Meta title={list.title} description={list.description} />
      </Card>
    );
  });

  return (
    <div>
      <Nav />

      <div className="Banner" />
      <div className="Card">
        <div style={{ display: "flex", justifyContent: "center" }}>
          {myWishlist.length === 0 ? (
            <h1 style={{ color: "teal" }}>Aucun article liké</h1>
          ) : (
            myWishlist
          )}
        </div>
      </div>
      <Modal
        title={wishlist[modalIndex] ? wishlist[modalIndex].title : ""}
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>{wishlist[modalIndex] ? wishlist[modalIndex].content : ""}</p>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return { wishlist: state.wishlist };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteArticle: function (title) {
      dispatch({
        type: "removeArticle",
        payload: title,
      });
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
