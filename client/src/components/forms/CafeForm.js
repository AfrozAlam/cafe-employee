import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Alert } from '@mui/material';
import { ButtonGroup, FormContainer, Header } from '../styled/common';
import { useNavigate } from "react-router-dom";
import { addData, updateData } from '../../actions/cafeAction';
import { CAFE_ERROR_DATA } from '../../actions/types';
import Spinner from '../layout/Spinner';

const { TextArea } = Input;

const CafeForm = ({flag, editContent}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { error, loading } = useSelector((state) => state.cafe);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isWarnAlertOpen, setIsWarnAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const { msg } = error;


  const onFinish = (values) => {
    if(flag === 'add') {
      dispatch(addData(values));
      setIsSuccessAlertOpen(true);
    } else {
      if(editContent.name === values.name && editContent.description === values.description && editContent.location === values.location) {
        setIsWarnAlertOpen(true);
      } else {
          dispatch(updateData(editContent._id, values));
          setIsSuccessAlertOpen(true);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    setIsErrorAlertOpen(true);
    console.log(errorInfo);
  };

  if(loading) return <Spinner />

  return (
    <>
      <Header>{`Please ${flag} Cafe Details !`}</Header>
      {msg && (
        <Alert severity="info" onClose={() => {dispatch({ type: CAFE_ERROR_DATA, payload: {} });setIsSuccessAlertOpen(false);}} sx={{ margin: 5 }}>
          {msg}
        </Alert>
      )}
      {!msg && isSuccessAlertOpen && (
        <Alert severity="success" onClose={() => {
          setIsSuccessAlertOpen(false);
          if(flag === 'add') form.resetFields();
        }} sx={{ margin: 5 }}>
          {`Cafe detail is ${flag === 'add' ? 'Created' : 'Updated'} successfully !`}
        </Alert>
      )}
      {isWarnAlertOpen && (
        <Alert severity="warning" onClose={() => {setIsWarnAlertOpen(false)}} sx={{ margin: 5 }}>
          Cafe detail is not Updated ! Please change Cafe detail
        </Alert>
      )}
      {isErrorAlertOpen && (
        <Alert severity="error" onClose={() => {setIsErrorAlertOpen(false)}} sx={{ margin: 5 }}>
          {`Cafe detail is not ${flag === 'add' ? 'Created' : 'Updated'} ! Please check errors`}
        </Alert>
      )}
      <FormContainer>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        disabled={isSuccessAlertOpen || isErrorAlertOpen}
        initialValues={{
          name: editContent?.name,
          description: editContent?.description,
          location: editContent?.location
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              min: 6,
              max: 10,
              message: 'Please enter a name between 6 and 10 characters.',
            },
          ]}
        >
          <Input style={{ width: '350px' }} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              max: 256,
              message: 'Please enter a description within 256 characters.',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Logo"
          rules={[
            {
              max: 2 * 1024 * 1024, // 2MB
              message: 'Please upload a file smaller than 2MB.',
            },
          ]}
        >
          <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}> Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: 'Please enter the location.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <ButtonGroup>
          <Button danger onClick={() => navigate(0)}>Cancel</Button>
          <Button type="primary" htmlType="submit">Submit</Button>
        </ButtonGroup>
      </Form>
      </FormContainer>
    </>
  );
};

export default CafeForm;
