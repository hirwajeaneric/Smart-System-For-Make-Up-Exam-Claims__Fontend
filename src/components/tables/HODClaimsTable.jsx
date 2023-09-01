import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { MoreHoriz, Preview } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
  {
    field: 'semester',
    headerName: 'Semester',
    width: 100,
  },
  {
    field: 'academicYear',
    headerName: 'Academic year',
    width: 150,
  },
  {
    field: 'course',
    headerName: 'Course',
    width: 300,
  },  
  {
    field: 'submitDate',
    headerName: 'Declared on',
    width: 250,
  },  
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },  
  {
    field: 'actions',
    headerName: 'More',
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
  // padding: '10px',
  width: '100%',
  height: '300px',
  background: 'white'
}

var rows = [];

export default function HODClaimsTable({data}) {
  rows = data;

  return (
    <Box sx={TableStyles}>
      <DataGrid
        rowHeight={37}
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
        <IconButton 
          onClick={() => {
             navigate(`/hod/${params.department}/claims/${parameters.row.id}`);
          }}>
          <MoreHoriz />
        </IconButton>
      </Tooltip>
    </Box>
  )
};