// import 'bootstrap-switch-button/dist/bootstrap3/bootstrap-switch-button.min.css';
// import $ from "jquery";
import moment from "moment";
import { useState, useEffect,useCallback} from 'react';
// import * as XLSX from 'xlsx';
// import SwitchButton from 'bootstrap-switch-button-react';

// import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';

import {ReportData, AllMacAddress } from "src/_mock/macAddress";
// import { ReportData } from "src/_mock/dailyReportData";
// import {zoneData,wardData,beatData,Machines} from 'src/_mock/fildData';
// import { GetClentInfoDetails,GetClentNameDetails} from 'src/_mock/customers';

import TableHeader from "./dailyReportComponents/tableHeader";





// const sr=1;
export default function DailyReports(){
    // const tblDataRef = useRef(null);
    const [reportData,setReportData]=useState(null);
    const [sDate,setSdate]=useState(moment().format('YYYY-MM-DD'));
    const [eDate,setEdate]=useState(moment().format('YYYY-MM-DD'));
    const [startDate,setStartDate]=useState(moment().format('YYYY-MM-DD'));
    const [endDate,setEndDate]=useState(moment().format('YYYY-MM-DD'));
    // const [cities,setCities] = useState(['Mumbai','Delhi','SS-UK','DoE-HAR']);
   
    const [zones]=useState([]);
    const [wards]=useState([]);
    const [beats]=useState([]);
    const [machines,setMachines]=useState([])
    const [numbDaysArray,setNumDaysArray]=useState([]);
 
    const [zoneName]=useState([]);
    const [wardName]=useState([]);
    const [beatName]=useState([]);
    const [machineName,setMachineName]=useState([]);
    const [isChecked] = useState(true);
    const [machineType]=useState('');

//   const handleChange = () => {
//     setIsChecked(!isChecked);
//   };
  
  

 

  // getting data from file "src/_mock/reportData"
    useEffect(()=>{
   
     
        AllMacAddress().then((res)=>{
            console.log('All Devices',res);
            setMachines(res);
            setMachineName(res);
        })
       
      
       },[])


       
    

        const handleMachineChange=(event)=>{
            setMachineName(event.target.value);
        }
       
       
        const selectAllMachines=()=>{
            setMachineName(machines)
           }

           const selectNoneMachines=()=>{
             setMachineName([])
           }


           const start = useCallback(() => moment(startDate), [startDate]);
           const end = useCallback(() => moment(endDate), [endDate]);
      
           const numDays = useCallback(() =>
           isChecked ? moment(end()).diff(start(), 'day') + 1 : 0
         , [start, end, isChecked]);
      

           
          
         
        
           
        
             
                   const setArray=useCallback(() =>{
                    const Length=numDays();
                    const numArray=[]
                    for(let i=0;i<Length;i+=1)
                    {
                        numArray.push(i+1);
                    }
                    setStartDate(sDate);
                    setEndDate(eDate);
                   
                    setNumDaysArray(numArray)

                    // console.log(numbDaysArray);
                },[numDays,sDate,eDate])
        
                useEffect(()=>{
                
                    // setReportData({machines:[]});
                //   setNumDaysArray([])
                    setArray();
                },[setArray])

          
                useEffect(()=>{
                    setReportData({machines:[]});

                },[machineName,startDate,endDate])


           
           const LoadReport=()=>{
            // setReportData({machines:[]});
            console.log("selected devices",machineName);
            const serialNumbers = machineName.map(option => option.SNoutput);
            console.log("Serials",serialNumbers);
            ReportData(serialNumbers,startDate,endDate).then((res)=>{
                console.log("Report Data", res);
                setReportData(res);
            })
           }
           
           


    return (
        <Card >
    <Container maxWidth='xxl' >
     
    
        <div className="row"  >
                
                     {/* Machine selection ui */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-12 my-2 ">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Devices:</h5>
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button type='button' className="btn btn-sm btn-success text-white my-auto"
                                      onClick={selectAllMachines}><i className="fa fa-check"/></button>
                                      <Select
                                            multiple
                                    
                                            value={machineName}
                                            onChange={handleMachineChange}
                                            style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                                            renderValue={(items) => {
                                            if (items.length===machines.length) {
                                                return`All Selected(${items.length})`;
                                            } 
                                            if(items.length===0) {
                                                return 'None Selected';
                                            }
                                            if(items.length===1)
                                            {
                                                return `${items[0].label}`
                                            }
                                            return `${items.length} Selected`
                                        }}
                                        >

                                        
                                                {
                                               machines.map((elem) => (
                                                    <MenuItem value={elem} key={elem.SNoutput}>
                                                    <Checkbox checked={machineName.indexOf(elem) > -1} />
                                                    {elem.SNoutput}
                                                    </MenuItem>
                                                ))
                                                }

                                        
                                        
                                        </Select>
                                    <button type='button' className="btn btn-sm btn-danger text-white my-auto"
                                       onClick={selectNoneMachines} ><i className="fa fa-times"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                 

                </div>

                 {/* date selection ui */}
            
                <div className="row mt-2">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2">
                        <h5>Start Date:</h5>
                        <div className="row">
                            <div className="col-12 d-flex">
                                <input type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} name="startDate" min="2023-07-08" onChange={(e)=>setSdate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2">
                        <h5>End Date:</h5>
                        <div className="row">
                            <div className="col-12 d-flex">
                                <input type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} name="endDate" min="2023-07-08" onChange={(e)=>setEdate(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                 
                    
                </div>
                <div  style={{display:'flex',justifyContent:'flex-end'}}>
                    <div >
                        <p >
                            <button type="button" className="btn btn-success text-white" onClick={LoadReport}>Load
                                Report
                            </button>
                        </p>
                    </div>
                </div>

                
               
           {/* report teble ui */}
           {reportData && reportData.machines.length >0 ? 
  <TableHeader
    data={reportData}
    zones={zones.filter(item => !zoneName.includes(item))}
    wards={wards.filter(item => !wardName.includes(item))}
    beats={beats.filter(item => !beatName.includes(item))}
    numbDaysArray={numbDaysArray}
    startDate={startDate}
    endDate={(endDate)}
    checked={isChecked}
    MachineType={machineType}
  />
:null}
              




                
      
    </Container>
    </Card>
    
    
    )
}