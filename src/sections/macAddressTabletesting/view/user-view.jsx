// import $ from 'jquery';
import Select from 'react-select';
import {useState, useEffect} from 'react';

// import SwitchButton from 'bootstrap-switch-button-react';
import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';
// import {GetClentNameDetails} from 'src/_mock/customers';

// import Scrollbar from 'src/components/scrollbar';

// import { emptyRows} from '../utils';

import {AllMacAddress} from 'src/_mock/macAddress';
// import Iconify from 'src/components/iconify';

// import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
// import UserTableHead from '../user-table-head';
// import TableEmptyRows from '../table-empty-rows';
// import UserTableToolbar from '../user-table-toolbar';
// import {  applyFilter, getComparator } from '../utils';
// ----------------------------------------------------------------------

export default function UserPage() {

  const [options1,setOptions1]=useState([]);
  const [options2,setOptions2]=useState([]);

  const [selectedOption1, setSelectedOption1] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState([]);

  const [value1,setValue1]=useState({});
  const [value2,setValue2]=useState({});


  // const [page, setPage] = useState(0);

  // const [order] = useState('asc');

  const [selected, setSelected] = useState([]);

  // const [orderBy] = useState('name');

  // const [filterName, setFilterName] = useState('');

  // const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data,setData]=useState([])

  

  useEffect(()=>{
    
    AllMacAddress().then((res)=>{
    
      setData(res);
      const formattedData = res.map((option,i) => ({
        value: option.MacID,
        label: option.MacID,
        id:i
      }));

    

      setOptions1(formattedData);
     
      setOptions2(formattedData);
      
    })

    const Interval=setInterval(()=>{
      AllMacAddress().then((res)=>{
    
        setData(res);
        const formattedData = res.map((option,i) => ({
          value: option.MacID,
          label: option.MacID,
          id:i
        }));
  
      
  
        setOptions1(formattedData);
       
        setOptions2(formattedData);
        
      })

    },3000)
   
   return()=>{
    clearInterval(Interval);
   }
 

  },[])

  // const handleSort = (event, id) => {
  //   const isAsc = orderBy === id && order === 'asc';
  //   if (id !== '') {
  //     setOrder(isAsc ? 'desc' : 'asc');
  //     setOrderBy(id);
  //   }
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = dataFiltered.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

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

  const handleSelectChange1 = (elem) => {
    setSelectedOption1(elem);
    
    setValue1(data[elem.id]);
  };
  const handleSelectChange2 = (elem) => {
    setSelectedOption2(elem);
    setValue2(data[elem.id]);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setPage(0);
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  // const handleFilterByName = (event) => {
  //   // setPage(0);
  //   setFilterName(event.target.value);
  // };

  // const dataFiltered = applyFilter({
  //   inputData: data,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth='xxl'>
     
     <Card  spacing={2}  sx={{padding:'20px', justifyContent:'center'}}>
      <Typography variant="h4" sx={{ mb: 5 }}>
      Boards
      </Typography>
      <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Board1 (Coin Acceptor):</h6>
                            <Select
                                name="board"
                                value={selectedOption1}
                                onChange={handleSelectChange1}
                                options={options1}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            />
                            {/* <input type="text" className="form-control" name="machine" /> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Board2:</h6>
                            <Select
                                name="board"
                                value={selectedOption2}
                                onChange={handleSelectChange2}
                                options={options2}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            />
                            {/* <input type="text" className="form-control" name="machine" /> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
              </div>
              <div className='row'>
                 <div className="col-md-6">
                  <UserTableRow
                      key={value1.id}

                     
                      m={value1}
                   
                      handleClick={(event) => handleClick(event, selectedOption1.UID)}
                    />
                  </div>
                  <div className="col-md-6">
                  <UserTableRow
                      key={value2.id}

                     
                      m={value2}
                   
                      handleClick={(event) => handleClick(event, selectedOption1.UID)}
                    />
                  </div>

              </div>
        
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

       
      </Card>
    </Container>
  );
}