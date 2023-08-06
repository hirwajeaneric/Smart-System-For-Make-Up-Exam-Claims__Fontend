import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { MoreHoriz, Preview } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { GeneralContext } from '../../App';

const columns = [
  {
    field: 'code',
    headerName: 'Code',
    width: 100,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 230,
  },
  {
    field: 'credits',
    headerName: 'Credits',
    width: 60,
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
  padding: '0px',
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
  const dispatch = useDispatch();
  const { setSelectedCourse } = useContext(GeneralContext);

  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton 
          onClick={() => {
            setSelectedCourse(parameters.row)
            dispatch({ type: 'course/getSelectedCourse', payload: parameters.row })
          }}>
          {/* <Preview /> */}
          <MoreHoriz />
        </IconButton>
      </Tooltip>
    </Box>
  )
};