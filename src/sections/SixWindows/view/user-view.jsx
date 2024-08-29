// import $ from 'jquery';
// import moment from "moment";
// import Select from 'react-select';
import {useState, useEffect} from 'react';
// import SwitchButton from 'bootstrap-switch-button-react';

import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';

// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';
// import {GetClentNameDetails} from 'src/_mock/customers';

// import Scrollbar from 'src/components/scrollbar';

// import { emptyRows} from '../utils';

import {getSerialPorts} from 'src/_mock/macAddress';
// import Iconify from 'src/components/iconify';

// import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';

// import UserTableHead from '../user-table-head';
// import TableEmptyRows from '../table-empty-rows';
// import UserTableToolbar from '../user-table-toolbar';
// import {  applyFilter, getComparator } from '../utils';
// ----------------------------------------------------------------------

export default function UserPage() {

  // const [setOptions1]=useState([]);
  // const [setOptions2]=useState([]);
  // const [setOptions3]=useState([]);
  // const [setOptions4]=useState([]);
  // const [options5,setOptions5]=useState([]);
  // const [options6,setOptions6]=useState([]);

  // const [selectedOption1, setSelectedOption1] = useState({id:-1});
  // const [selectedOption2, setSelectedOption2] = useState({id:-1});
  // const [selectedOption3, setSelectedOption3] = useState({id:-1});
  // const [selectedOption4, setSelectedOption4] = useState({id:-1});
  // const [selectedOption5, setSelectedOption5] = useState({id:-1});
  // const [selectedOption6, setSelectedOption6] = useState({id:-1});

  const [value1,setValue1]=useState({});
  const [value2]=useState({});
  const [value3]=useState({});
  const [value4]=useState({});
  const [value5]=useState({});
  const [value6]=useState({});

  const [isChecked] = useState(false);



  const [selected, setSelected] = useState([]);

  

  const [setData]=useState([])

  // const online = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;

  useEffect(()=>{
    
    getSerialPorts().then((res)=>{

      console.log(res);
      setData(res);
      setValue1(res.value1);

     
      
      
    })

  
    const Interval=setInterval(()=>{
      getSerialPorts().then((res)=>{
          setData(res);
      })
    
    },10000)



  

    return()=>{
      clearInterval(Interval);
    }
 

  },[setData])

  

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

 

  return (
    <Container maxWidth='xxl'>
     
     <Card  spacing={2}  sx={{padding:'20px', justifyContent:'center'}}>
     
      <div className="row">
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <h6>Board1:</h6>
                            {/* <Select
                                name="board1"
                                value={selectedOption1}
                                onChange={handleSelectChange1}
                                options={options1}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            /> */}
                            {/* <input type="text" className="form-control" name="machine" /> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <h6>Board2:</h6>
                            {/* <Select
                                name="board2"
                                value={selectedOption2}
                                onChange={handleSelectChange2}
                                options={options2}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            /> */}
                            {/* <input type="text" className="form-control" name="machine" /> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <h6>Board3:</h6>
                            {/* <Select
                                name="board3"
                                value={selectedOption3}
                                onChange={handleSelectChange3}
                                options={options3}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            /> */}
                            {/* <input type="text" className="form-control" name="machine" /> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
              </div>
             {/* {selectedOption1.id>=0 && selectedOption2.id>=0 ? <div className="row">
                                      
                                            <div className="col-12 sw-parent">
                                              
                                                    <SwitchButton
                                                  
                                                    checked={isChecked}
                                                    onChange={handleChange}
                                                    onlabel="TEST MODE ON"
                                                    offlabel="TEST MODE OFF"
                                                    onstyle='success'
                                                    offstyle='danger'
                                                    width={200}
                                                />
                                            </div>
                                        </div>:''
              } */}
              <div className='row'>
                 <div className="col-md-4">
                  <UserTableRow
                   
                     
                      testMode={isChecked}
                      board={1}
                      m={value1}
                   
                      handleClick={(event) => handleClick(event, value1)}
                    />
                  </div>
                  <div className="col-md-4">
                  <UserTableRow
                      key={value2}

                      testMode={isChecked}
                      m={value1}
                      board={2}
                      handleClick={(event) => handleClick(event, value1)}
                    />
                  </div>
                  <div className="col-md-4">
                  <UserTableRow
                      key={value3}

                      testMode={isChecked}
                      m={value1}
                      board={3}
                      handleClick={(event) => handleClick(event, value1)}
                    />
                  </div>

              </div>
              <div className="row">
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <h6>Board4:</h6>
                            {/* <Select
                                name="board4"
                                value={selectedOption4}
                                onChange={handleSelectChange4}
                                options={options4}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            /> */}
                            {/* <input type="text" className="form-control" name="machine" /> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <h6>Board5:</h6>
                            {/* <Select
                                name="board5"
                                value={selectedOption5}
                                onChange={handleSelectChange5}
                                options={options5}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            /> */}
                            {/* <input type="text" className="form-control" name="machine" /> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <h6>Board6:</h6>
                            {/* <Select
                                name="board6"
                                value={selectedOption5}
                                onChange={handleSelectChange6}
                                options={options6}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            /> */}
                            {/* <input type="text" className="form-control" name="machine" /> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
              </div>
              <div className='row'>
                 <div className="col-md-4">
                  <UserTableRow
                      key={value4}
                     
                      testMode={isChecked}
                      board={4}
                      m={value1}
                   
                      handleClick={(event) => handleClick(event, value1)}
                    />
                  </div>
                  <div className="col-md-4">
                  <UserTableRow
                      key={value5}

                      testMode={isChecked}
                      m={value5}
                      board={5}
                      handleClick={(event) => handleClick(event, value1)}
                    />
                  </div>
                  <div className="col-md-4">
                  <UserTableRow
                      key={value6}

                      testMode={isChecked}
                      m={value1}
                      board={6}
                      handleClick={(event) => handleClick(event, value1)}
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