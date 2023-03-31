import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { useState } from "react";

const TableData = ({
  data,
  columns,
  title,
  ...otherProps
}) => {
  const [size, setSize] = useState(100);
  const MyExportButton = () => {
    return (
      <GridToolbarContainer title={title}>
        <GridToolbarExport title={title} />
      </GridToolbarContainer>
    );
  };
  return (
    <DataGrid
      rows={data}
      checkboxSelection
      columns={columns}
      rowsPerPageOptions={[25, 50, 100]}
      pageSize={size}
      onPageSizeChange={(newSize)=>setSize(newSize)}
      autoPageSize
      components={{
        Toolbar: MyExportButton,
      }}
      autoHeight
      {...otherProps}
    />
  );
};

export default TableData;
