import React, { useState } from 'react';
import { Layout, Form, Input, Button, Spin, message } from 'antd';
import { CommonNavBar, ContainerWithCorner } from '../../components';
import { postLogin } from '../../service/login';
import './index.scss';

const { Content } = Layout;
const { useForm, Item: FormItem } = Form;

const Login = (props) => {
  const { history } = props;
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = (values) => {
    setLoading(true);
    postLogin(values).then(res => {
      const { status } = res;
      console.log(res);
      if (status && status.code === '1') {
        history.push('/home');
      } else {
        message.error({
          type: 'error',
          duration: 1000,
          content: '登录失败',
        })
      }
    }).catch(error => {
      console.log(error);
      message.error({
        type: 'error',
        duration: 1000,
        content: '服务器连接失败',
      })
    }).finally(() => {
      setLoading(false);
    })
  };
  return (
    <Layout className="login">
      <CommonNavBar title="无锡市残疾人联合会数据可视化平台" />
      <ContainerWithCorner component={Content} className="login-content">
        <Form
          form={form}
          initialValues={{
            region: '1',
          }}
          style={{
            width: 300,
          }}
          onFinish={onSubmit}
        >
          <FormItem name="username" rules={[{ required: true, message: '请输入账号' }]}>
            <Input placeholder="请输入账号" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input type='password' placeholder="请输入密码" />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">登录</Button>
            <Button type="link" style={{ float: 'right' }}>忘记密码</Button>
          </FormItem>
        </Form>
      </ContainerWithCorner>
      {loading && (
        <Spin style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }} />
      )}
    </Layout>
  )
}

export default Login;