import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
const TableData = ({
  data,
  columns,
  title,
  ...otherProps
}) => {
  const MyExportButton = () => {
    return (
      <GridToolbarContainer title={title}>
        <GridToolbarExport title={title} />
      </GridToolbarContainer>
    );
  };
  return (
    <div style={{ height:"100%", width: "100%" }}>
      <DataGrid
        rows={data}
        checkboxSelection
        columns={columns}
        components={{
          Toolbar: MyExportButton,
        }}
        autoHeight={true}
        {...otherProps}
      />
    </div>
  );
};

export default TableData;
