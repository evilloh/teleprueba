import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'

const Login = (props) => {
    let navigate = useNavigate(); 
    const onFinish = async (values) => {
        const res = await axios.post('https://react-test.apps-dev.tid.es/auth',
        { username: 'livingapp', password: "bGl2aW5nYXBw" });
        localStorage.setItem("user", res.data.access_token);
        console.log("Successfully logged in!")
        return  navigate("/");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="person">
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
            Login
        </Button>
        </Form.Item>
    </Form>
        </div>
    );
};

export default Login;