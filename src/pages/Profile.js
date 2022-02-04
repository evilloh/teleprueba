import React,  { useEffect, useState } from 'react';
import axios from 'axios'
import { Card } from 'antd';
const { Meta } = Card;

const Profile = (props) => {
    let { user } = props
    const [profile, setProfile] = useState({})

    const getProfile = async () => {
        const res = await axios.get('https://react-test.apps-dev.tid.es/profile', {headers: {'Authorization': `Bearer ${user}`}
        })
        setProfile(res.data)
    }

    useEffect(() => {
        getProfile()
    }, []);

    return (
        <div >
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="profile picture" src={profile.avatar} />}
            >
                <Meta title={profile.username} description={profile.bio} />
            </Card>,
        </div>
    );
};

export default Profile;