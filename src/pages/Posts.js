import React,  { useEffect, useState } from 'react';
import { Card } from 'antd';
import {  LikeOutlined, CommentOutlined } from '@ant-design/icons';
import axios from 'axios'
const { Meta } = Card;

const Posts = (props) => {
    let {user} = props
    const [posts, setPosts] = useState([])
    const getPosts = async () => {
        const res = await axios.get('https://react-test.apps-dev.tid.es/posts', {headers: {'Authorization': `Bearer ${user}`}
        })
        setPosts(res.data)
    }
    useEffect(() => {
        getPosts()
    }, []);

    const giveLike = async (postId) => {
        const res = await axios.post(`https://react-test.apps-dev.tid.es/posts/${postId}/like`,{}, {headers: {'Authorization': `Bearer ${user}`}
        })
        const { data } = res
        const objIndex = posts.findIndex((post ) => post.id === data.id)
        const newPosts = [...posts]
        newPosts[objIndex].likes = data.likes
        setPosts(newPosts)
    }
    
    return (
        <div >
            {posts.length && posts.map((el)=> {
                return <Card
                  key={el.id}
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src={el.image}
                    />
                  }
                  actions={[<div> {el.likes}
                    <LikeOutlined key="setting" style={{paddingLeft: '5px'}} onClick={() => giveLike(el.id)} />,
                  </div>,<div>{el.comments}
                  <CommentOutlined />
                  </div> 
                  ]}
                >
                  <Meta
                    title={el.author}
                    description={el.content}
                  />
                </Card>
            })}
        </div>
    );
};

export default Posts;