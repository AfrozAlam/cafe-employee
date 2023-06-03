import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Radio, Select, Button } from 'antd';
import { ButtonGroup, FormContainer, Header } from '../styled/common';
import { useNavigate } from "react-router-dom";
import { Alert } from '@mui/material';
import { addData, updateData } from '../../actions/employeeAction';
import { fetchData } from '../../actions/cafeAction';
import Spinner from '../layout/Spinner';
import { EMP_ERROR_DATA } from '../../actions/types';


const EmployeeForm = ({flag, editContent}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchData());
  }, [])

  const {cafeData, loading} = useSelector((state) => state.cafe);
  const { msg } = useSelector((state) => state.employee.error);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isWarnAlertOpen, setIsWarnAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const onFinish = (values) => {
    if(flag === 'add') {
      let emp = { name: values.name, email_address: values.email, phone_number: values.phone, gender: values.gender }
      if(values.cafe) {
        emp.cafe = values.cafe
        emp.start_date = new Date(Date.now()).toISOString();
      }
      dispatch(addData(emp));
      setIsSuccessAlertOpen(true);
    } else {
      if(editContent.name === values.name && editContent.email === values.email && editContent.phone === values.phone && editContent.gender === values.gender && editContent.cafe === values.cafe) {
        setIsWarnAlertOpen(true);
      } else {
          let emp = { name: values.name, email_address: values.email, phone_number: values.phone, gender: values.gender }
          if(!editContent.cafe && values.cafe) {
            emp.cafe = values.cafe
            emp.start_date = new Date(Date.now()).toISOString();
          } else if(editContent.cafe !== values.cafe) {
            emp.cafe = values.cafe;
          }
          dispatch(updateData(editContent.employee, emp));
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
      <Header>{`Please ${flag} Employee Details !`}</Header>
      {msg && (
        <Alert severity="info" onClose={() => {dispatch({ type: EMP_ERROR_DATA, payload: {} });setIsSuccessAlertOpen(false);}} sx={{ margin: 5 }}>
          {msg}
        </Alert>
      )}
      {!msg && isSuccessAlertOpen && (
        <Alert severity="success" onClose={() => {
          setIsSuccessAlertOpen(false);
          if(flag === 'add') form.resetFields();
        }} sx={{ margin: 5 }}>
          {`Employee detail is ${flag === 'add' ? 'Created' : 'Updated'} successfully !`}
        </Alert>
      )}
      {isWarnAlertOpen && (
        <Alert severity="warning" onClose={() => {setIsWarnAlertOpen(false)}} sx={{ margin: 5 }}>
          Employee detail is not Updated ! Please change Employee detail
        </Alert>
      )}
      {isErrorAlertOpen && (
        <Alert severity="error" onClose={() => {setIsErrorAlertOpen(false)}} sx={{ margin: 5 }}>
          {`Employee detail is not ${flag === 'add' ? 'Created' : 'Updated'} ! Please check errors`}
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
            email: editContent?.email,
            phone: editContent?.phone,
            gender: editContent?.gender,
            cafe: editContent?.cafe,
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
            <Input style={{ maxWidth: '410px' }} />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter a valid email address.',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                pattern: /^(8|9)\d{7}$/,
                message: 'Please enter a valid Singapore phone number.',
              },
            ]}
          >
            <Input style={{ width: '350px' }} />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select a gender.' }]}
          >
            <Radio.Group>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Assigned Cafe" name="cafe">
            <Select>
              {cafeData.map((cafe) => (
                <Select.Option value={cafe._id} key={cafe._id}>
                  {cafe.name}
                </Select.Option>
              ))}
            </Select>
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

export default EmployeeForm;
