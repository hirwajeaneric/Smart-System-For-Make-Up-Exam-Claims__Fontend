import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
  {
    field: 'fullName',
    headerName: 'Full name',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 120,
  },  
  {
    field: 'role',
    headerName: 'Role',
    width: 180,
  },  
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
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

export default function StudentClaimTable({data}) {
  rows = data;

  return (
    <Box sx={TableStyles}>
      <DataGrid
        rowHeight={37}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
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
             navigate(`/examinationoffice/${params.name}/user/${parameters.row.id}`);
          }}>
          <MoreHoriz />
        </IconButton>
      </Tooltip>
    </Box>
  )
};