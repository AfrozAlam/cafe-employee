import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
 
const Table = ({tableRowData, tableColumnDefs}) => {
  const gridOptions = {
    suppressHorizontalScroll: false,
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact 
        rowData={tableRowData} 
        columnDefs={tableColumnDefs}
        gridOptions={gridOptions}
      >
      </AgGridReact>
    </div>
  );
};

export default Table