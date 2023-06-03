import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from "../layout/CustomButton";
import Table from "../layout/Table";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CafeForm from '../forms/CafeForm';
import { fetchData, removeData } from '../../actions/cafeAction';
import Spinner from '../layout/Spinner';
import { useNavigate } from "react-router-dom";
import Logo from '../layout/Logo';
import { Modal } from 'antd';


const { confirm } = Modal;

const Cafe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const deleteCafe = (id) => {
    confirm({
      title: 'Are you sure delete this cafe ?',
      content: `cafe id : ${id}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(removeData(id));
        navigate(0);
      }
    });
  }

  const { cafeData, loading } = useSelector((state) => state.cafe);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(null);
  
  const rowData = cafeData.map(({_id, name, description, employeeCount, location}) => ({_id, name, description, employees: employeeCount, location}));

  const columnDefs = [
    { field: 'logo', minWidth: 250, cellRenderer: (e) => <Logo name={e.data.name} />, cellStyle: { display: 'flex', alignItems: 'center' }},
    { field: 'name', minWidth: 300 },
    { field: 'description', minWidth: 400 },
    { field: 'employees', onCellClicked: (e) => {navigate('/employee', {state: {id: e.data._id}})}, cellStyle: { cursor: 'pointer' } },
    { field: 'location', minWidth: 250, filter: true },
    { field: 'edit', maxWidth: 100, cellRenderer: EditIcon, onCellClicked: (e) => {setIsEdit(true);setEditContent(e.data);}, cellStyle: { cursor: 'pointer', display: 'flex', alignItems: 'center' } },
    { field: 'delete', maxWidth: 100, cellRenderer: DeleteForeverIcon, onCellClicked: (e) => {deleteCafe(e.data._id)}, cellStyle: { cursor: 'pointer', display: 'flex', alignItems: 'center' } },
  ];

  if(loading) return <Spinner />;

  return (
    <>
      <h1>Cafe Page</h1>{!isAdd && !isEdit && <CustomButton btnText={'Add New Cafe'} setIsAdd={setIsAdd} />}
      {!isAdd && !isEdit && <Table tableRowData={rowData} tableColumnDefs={columnDefs} />}
      {isAdd && !isEdit && <CafeForm flag={'add'} />}
      {!isAdd && isEdit && <CafeForm flag={'edit'} editContent={editContent} />}
    </>
  )
}

export default Cafe