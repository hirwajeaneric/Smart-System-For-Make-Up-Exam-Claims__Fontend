import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Preview } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 350,
  },
  {
    field: 'code',
    headerName: 'Code',
    width: 140,
  },
  {
    field: 'credits',
    headerName: 'Credits',
    width: 100,
  },
  {
    field: 'faculty',
    headerName: 'Faculty',
    width: 250,
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 250,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 70,
    renderCell: (params) => <TableActions parameters= {params} />
  },
]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export const TableStyles = {
  padding: '0px',
  width: '100%',
  height: '300px',
  background: 'white',
  marginTop: '20px' 
}

var rows = [];

export default function LecturerCoursesTable({data}) {
  rows = data;

  return (
    <Box sx={TableStyles}>
      <DataGrid
        rowHeight={38}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
        experimentalFeatures={{newEditingApi: true}}
        components={{Toolbar: CustomToolbar}}
      />
    </Box>
  );
};

// Table actions
const TableActions = ({parameters}) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton onClick={() => {navigate(parameters.row.id)}}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
};