import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Preview } from '@mui/icons-material';
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
    width: 300,
  },
  {
    field: 'credits',
    headerName: 'Credits',
    width: 80,
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
  background: 'white'
}

var rows = [];

export default function CoursesTable({data}) {
  rows = data;

  return (
    <Box sx={TableStyles}>
      <DataGrid
        rowHeight={25}
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
  const { setIsFormVisible, setSelectedCourse } = useContext(GeneralContext);

  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton 
          onClick={() => {
            // navigate(`courses/${parameters.row.id}`)
            setIsFormVisible(true);
            setSelectedCourse(parameters.row)
            dispatch({ type: 'course/getSelectedCourse', payload: parameters.row })
          }}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
};