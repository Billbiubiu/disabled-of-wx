import React from 'react';
import { Layout, Form, Select, Input, Button } from 'antd';
import { CommonNavBar, ContainerWithCorner } from '../../components';
import './index.scss';

const { Content } = Layout;
const { useForm, Item: FormItem } = Form;
const { Option } = Select;

const regions = [
  { name: '无锡市', value: '1' },
  { name: '江阴市', value: '2' },
  { name: '宜兴市', value: '3' },
  { name: '惠山区', value: '4' },
  { name: '锡山区', value: '5' },
  { name: '梁溪区', value: '6' },
  { name: '新吴区', value: '7' },
  { name: '滨湖区', value: '8' },
];

const Login = (props) => {
  const { history } = props;
  const [form] = useForm();
  const onSubmit = (values) => {
    console.log(values);
    history.push('/home');
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
          <FormItem name="region">
            <Select placeholder="请选择区域">
              {
                regions.map(region => (
                  <Option
                    key={region.value}
                    value={region.value}
                  >
                    {region.name}
                  </Option>
                ))
              }
            </Select>
          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder="请输入密码" />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">登录</Button>
            <Button type="link" style={{ float: 'right' }}>忘记密码</Button>
          </FormItem>
        </Form>
      </ContainerWithCorner>
    </Layout>
  )
}

export default Login;