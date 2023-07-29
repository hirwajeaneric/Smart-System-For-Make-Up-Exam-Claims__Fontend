import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Preview } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GeneralContext } from '../../App';

const columns = [
  {
    field: 'academicYear',
    headerName: 'Academic Year',
    width: 120,
  },
  {
    field: 'semester',
    headerName: 'Semester',
    width: 80,
  },
  {
    field: 'midSemesterExams',
    headerName: 'Mid Semester Exams',
    width: 150,
  },
  {
    field: 'finalExams',
    headerName: 'Final Exams',
    width: 140,
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
}

var rows = [];

export default function CourseAllocationsTable({data}) {
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
  const { setSelectedCourseAllocation } = useContext(GeneralContext);

  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton 
          onClick={() => {
            setSelectedCourseAllocation(parameters.row);
          }}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
};