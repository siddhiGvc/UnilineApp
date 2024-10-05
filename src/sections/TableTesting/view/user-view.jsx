// import $ from 'jquery';
import moment from "moment";
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
  const [selectedOption1, setSelectedOption1] = useState({id:-1});
  const [value1,setValue1]=useState({});
  const [isChecked] = useState(false);

  const [selected, setSelected] = useState([]);

  const [data,setData]=useState([])

  const online = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;

  useEffect(()=>{
    
    AllMacAddress().then((res)=>{

      const filteredData=res.filter((elem)=> online(elem) );
      setData(filteredData);

      const formattedData = filteredData.map((option,i) => ({
        value: option.MacID,
        label: option.MacID,
        id:i
      }));

    

      setOptions1(formattedData);
     
      if(selectedOption1.id>=0)
        {
          // console.log(res[selectedOption1.id]);
          setValue1(filteredData[selectedOption1.id]);
         
        }
       
      
      
    })

  

    const Interval=setInterval(()=>{
      AllMacAddress().then((res)=>{
    
        const filteredData=res.filter((elem)=> online(elem) );
        setData(filteredData);
        const formattedData = filteredData.map((option,i) => ({
          value: option.MacID,
          label: option.MacID,
          id:i
        }));
  
      
  
        setOptions1(formattedData);
       
      
        if(selectedOption1.id>=0)
          {
            // console.log(res[selectedOption1.id]);
            setValue1(filteredData[selectedOption1.id]);
           
          }
        
        
      })
   

    },500)



  

    return()=>{
      clearInterval(Interval);
    }
 

  },[selectedOption1])

  

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
    
   
    AllMacAddress().then((res)=>{
    
      const filteredData=res.filter((m)=> online(m) )
      console.log(filteredData)
      setData(filteredData);
      console.log(data);
      // setValue1(res[elem.id]);
      
    })
  };
 

 

  return (
    <Container maxWidth='xxl'>
     
     <Card  spacing={2}  sx={{padding:'20px', justifyContent:'center'}}>
      <Typography variant="h4" sx={{ mb: 5 }}>
      Boards
      </Typography>
      <div className="row">
                    <div className="col-md-12">
                        <div className="form-group my-2">
                            <h6>Board1:</h6>
                            <Select
                                name="board1"
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
                   
              </div>
           
              <div className='row'>
                 <div className="col-md-12">
                  <UserTableRow
                      key={value1.id}
                     
                      testMode={isChecked}
                      board={1}
                      m={value1}
                   
                      handleClick={(event) => handleClick(event, value1.UID)}
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