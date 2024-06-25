// import $ from 'jquery';
// import Select from 'react-select';
import {useState, useEffect} from 'react';

// import SwitchButton from 'bootstrap-switch-button-react';
import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';
// import {GetClentNameDetails} from 'src/_mock/customers';

import Scrollbar from 'src/components/scrollbar';

// import { emptyRows} from '../utils';

import {getAllOutputs} from 'src/_mock/macAddress';
// import Iconify from 'src/components/iconify';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
// import label from 'src/components/label';
// ----------------------------------------------------------------------

export default function UserPage() {

  
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [data,setData]=useState([])

  

  useEffect(()=>{
    
    getAllOutputs().then((res)=>{
      // console.log(res);
      setData(res);
   

      
    })

    const Interval=setInterval(()=>{
       
    getAllOutputs().then((res)=>{
    
      setData(res);
     

    

    })
    },3000);

    return()=>{
      clearInterval(Interval);
    }
   

 

  },[])

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataFiltered.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth='xxl'>
     
     <Card container spacing={2} maxWidth='xxl' sx={{padding:'20px', justifyContent:'center'}}>
      <Typography variant="h4" sx={{ mb: 5 }}>
       Testing
      </Typography>
     
        
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table >
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'sr', label: 'Sr.No' },
                  { id: 'device_number', label: `DeviceNumber` },
                  { id: 'command', label: 'Command' },
                  { id: 'expected_output', label: 'Expected Output' },
                  { id: 'actual_outtput', label: 'Actual Output' },
                  { id: 'result',label:'Result' },
                  { id:""}
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,i) => (
                    <UserTableRow
                      key={row.id}
                      sr={page*rowsPerPage+i+1}
                     
                      m={row}
                   
                      handleClick={(event) => handleClick(event, row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, data.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25 ,100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}