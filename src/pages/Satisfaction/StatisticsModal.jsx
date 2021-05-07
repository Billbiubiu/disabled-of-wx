import React, { createContext, useContext, useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Button, Col, Modal, Row, Table, Form, Input, message } from 'antd';
import { ContainerWithBorder } from '../../components';

const EditableContext = createContext();

const EditableRow = (props) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const inputRef = useRef();
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
  const save = async () => {
    const values = await form.validateFields();
    let value = values[dataIndex];
    if (value) {
      value = parseFloat(value);
      if (isNaN(value)) {
        value = '';
        message.warn('请输入数字');
      } else {
        value = Math.min(100, Math.max(0, parseFloat(value.toFixed(2))));
      }
      handleSave({ ...record, [dataIndex]: value });
    }
    toggleEdit();
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
      >
        <Input className="editable-cell-input" ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

// 初始数据
const defaultColumns = [
  {
    title: '',
    dataIndex: 'area',
  },
  {
    title: 'B7',
    dataIndex: 'B7',
    editable: true,
  },
  {
    title: 'B8',
    dataIndex: 'B8',
    editable: true,
  },
  {
    title: 'B9',
    dataIndex: 'B9',
    editable: true,
  },
  {
    title: 'B10',
    dataIndex: 'B10',
    editable: true,
  },
  {
    title: 'B11',
    dataIndex: 'B11',
    editable: true,
  },
  {
    title: 'B12',
    dataIndex: 'B12',
    editable: true,
  },
  {
    title: 'B13',
    dataIndex: 'B13',
    editable: true,
  },
  {
    title: 'B14',
    dataIndex: 'B14',
    editable: true,
  },
  {
    title: 'B15',
    dataIndex: 'B15',
    editable: true,
  },
  {
    title: 'B16',
    dataIndex: 'B16',
    editable: true,
  },
  {
    title: 'B17',
    dataIndex: 'B17',
    editable: true,
  },
  {
    title: '平均满意度',
    dataIndex: 'average',
  },
]
const defaultDataSource = [
  { area: '无锡市' },
  { area: '梁溪区' },
  { area: '滨湖区' },
  { area: '新吴区' },
  { area: '锡山区' },
  { area: '惠山区' },
  { area: '经开区' },
  { area: '江阴市' },
  { area: '宜兴市' },
]

const StatisticsModal = (props) => {
  const {
    visible = false,
    setVisible = () => { },
  } = props;
  const [dataSource, setDataSource] = useState(defaultDataSource);
  const handleSave = useCallback((row) => {
    setDataSource(oldDataSource => {
      const newDataSource = [...oldDataSource];
      const index = newDataSource.findIndex(item => item.key === row.key);
      const item = newDataSource[index];
      newDataSource.splice(index, 1, {
        ...item,
        ...row,
      });
      return newDataSource;
    })
  }, []);
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = useMemo(() => {
    return defaultColumns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          title: col.title,
          editable: col.editable,
          dataIndex: col.dataIndex,
          handleSave,
        }),
      };
    });
  }, [handleSave]);
  return (
    <Modal
      centered
      width="100em"
      visible={visible}
      onCancel={() => setVisible(false)}
      className="statistics-modal"
      title="2019年各区满意度指标情况表"
      modalRender={node => {
        return (
          <ContainerWithBorder>
            {node}
          </ContainerWithBorder>
        );
      }}
      bodyStyle={{
        padding: 0,
      }}
      footer={null}
    >
      <Table
        bordered
        columns={columns}
        rowKey="dataIndex"
        pagination={false}
        components={components}
        dataSource={dataSource}
        rowClassName={() => 'editable-row'}
      />
      <Row style={{ padding: '10rem 1em 0' }}>
        <Col span={6}>
          <p>B7、社区(村)开展残疾人文体生活满意度</p>
          <p>B8、接受过社会团体、单位或个人的帮扶人数占比</p>
          <p>B9、残疾人信息核对人数占比情况</p>
        </Col>
        <Col span={5}>
          <p>B10、惠残政策宣传率情况</p>
          <p>B11、惠残政策知晓率</p>
          <p>B12、需求反应是否及时反馈情况(反馈率)</p>
        </Col>
        <Col span={7}>
          <p>B13、近几年来残疾人生活水平变化情况(提高率)</p>
          <p>B14、残疾人平等参与社会生活的环境改善情况(改善率)</p>
          <p>B15、对街道、社区(村)提供的日常服务满意度</p>
        </Col>
        <Col span={6}>
          <p>B16、对各级残联组织和涉残工作部门的工作满意度</p>
          <p>B17、对政府和社会各界对残疾人的关爱的满意度</p>
        </Col>
      </Row>
      <div style={{ padding: '20rem', textAlign: 'center' }}>
        <Button type="primary" onClick={() => setVisible(false)}>提交</Button>
      </div>
    </Modal>
  )
};

export default StatisticsModal;