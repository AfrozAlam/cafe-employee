import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from "../layout/CustomButton";
import Table from "../layout/Table";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import EmployeeForm from '../forms/EmployeeForm';
import { fetchData, removeData } from '../../actions/employeeAction';
import Spinner from '../layout/Spinner';
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from 'antd';


const { confirm } = Modal;

const Employee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchData(location.state?.id));
  }, []);

  const deleteEmployee = (id) => {
    confirm({
      title: 'Are you sure delete this employee ?',
      content: `employee id : ${id}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(removeData(id));
        navigate(0);
      }
    });
  }

  const { empData, loading } = useSelector((state) => state.employee);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(null);

  const rowData = empData.map(({_id, name, email_address, gender, phone_number, days_worked, cafe}) => (
    {employee: _id, name, email: email_address, gender, phone: phone_number, days: Math.round(days_worked), cafe}
  ));

  const columnDefs = [
    { field: 'employee', headerName: 'Employee id' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email address' },
    { field: 'gender', headerName: 'gender' },
    { field: 'phone', headerName: 'Phone number' },
    { field: 'days', headerName: 'Days worked in the cafe' },
    { field: 'cafe', headerName: 'Cafe name' },
    { field: 'edit', maxWidth: 100, cellRenderer: EditIcon, onCellClicked: (e) => {setIsEdit(true);setEditContent(e.data)}, cellStyle: { cursor: 'pointer', display: 'flex', alignItems: 'center' } },
    { field: 'delete', maxWidth: 100, cellRenderer: DeleteForeverIcon, onCellClicked: (e) => {deleteEmployee(e.data.employee)}, cellStyle: { cursor: 'pointer', display: 'flex', alignItems: 'center' } },
  ];

  if(loading) return <Spinner />

  return (
    <>
      <h1>Employee Page</h1>{!isAdd && !isEdit && <CustomButton btnText={'Add New Employee'} setIsAdd={setIsAdd} />}
      {!isAdd && !isEdit && <Table tableRowData={rowData} tableColumnDefs={columnDefs} />}
      {isAdd && !isEdit && <EmployeeForm flag={'add'} />}
      {!isAdd && isEdit && <EmployeeForm flag={'edit'} editContent={editContent} />}
    </>
  )
}

export default Employee