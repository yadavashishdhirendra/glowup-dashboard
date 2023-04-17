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
      disableRowSelectionOnClick
      keepNonExistentRowsSelected
      onPageSizeChange={(newSize) => setSize(newSize)}
      components={{
        Toolbar: MyExportButton,
      }}
      autoHeight={true}
      {...otherProps}
    />
  );
};

export default TableData;
