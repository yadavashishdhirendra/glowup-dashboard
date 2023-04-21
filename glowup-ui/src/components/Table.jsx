import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { useState } from "react";

const TableData = ({ data, columns, title, selectIds }) => {
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
      columns={columns}
      checkboxSelection
      pageSize={size}
      disableColumnVirtualization
      onPageSizeChange={(newSize) => setSize(newSize)}
      autoHeight
      components={{
        Toolbar: MyExportButton,
      }}
      onSelectionModelChange={selectIds}
    />
  );
};

export default TableData;
