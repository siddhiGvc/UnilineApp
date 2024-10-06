import $ from 'jquery';
import moment from "moment";
import PropTypes from 'prop-types';
import React,{ useState} from 'react';
// import SwitchButton from 'bootstrap-switch-button-react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';
// import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
// import Avatar from '@mui/material/Avatar';

import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';

import { SaveFaultReport } from 'src/_mock/faultReportData';
import {sendI,sendGF,sendG1,sendG2,sendG3} from 'src/_mock/macAddress';

import Label from 'src/components/label';
// import { Table } from '@mui/material';
// import { Y } from 'dist/assets/index-8d78d312';



const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function UserTableRow({
  m,
  testMode,
  board,
  sr,
  key,
  handleClick,
  
}) {
  // const [ setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message,setMessage]=useState("");
  const [type,setType]=useState("");
 

  const [G1output,setG1Output]=useState([]);
  const [G2output,setG2Output]=useState([]);
  const [G3output,setG3Output]=useState([]);
  const [Ioutput,setIOutput]=useState([]);
  const [GFoutput,setGFOutput]=useState([]);

  // const [mode,setMode]=useState('');

  

  
 

  const showAlertMessage = () => {
    setShowAlert(true);

    // You can optionally set a timeout to hide the alert after a few seconds
    setTimeout(() => {
    setShowAlert(false);
    }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
};



  // Close popup function of technicaian form
  const handleModalClose = () => {
    setOpenModal(false);
  };

 
 


const G1command=()=>{
  console.log(m.SNoutput);
  sendG1(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{

    setG1Output(res);
    setTimeout(()=>{
         setG1Output([]);
    },5000)
  })
}

const G2command=()=>{
  console.log(m.SNoutput);
  sendG2(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
    console.log(res);
    setG2Output(res);
    setTimeout(()=>{
         setG2Output([]);
    },5000)
  })
}

const G3command=()=>{
  console.log(m.SNoutput);
  sendG3(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
    console.log(res);
    setG3Output(res);
    setTimeout(()=>{
         setG3Output([]);
    },5000)
  })
}
const Icommand=()=>{
  console.log(m.SNoutput);
  sendI(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
    console.log(res);
    setIOutput(res);
    setTimeout(()=>{
         setIOutput([]);
    },5000)
  })
}

const GFcommand=()=>{
  console.log(m.SNoutput);
  sendGF(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
    console.log(res);
    setGFOutput(res);
    setTimeout(()=>{
         setGFOutput([]);
    },5000)
  })
}




  // submit form of technician form 
  const SubmitForm=()=>{
    const obj={
    machineNumber: $('[name="machine"]').val(),
    userName: $('[name="userName"]').val(),
    fault:$('[name="fault"]').val(),
    action:$('[name="action"]').val(),
    status:$('[name="faultStatus"]').val(),
    Lat:sessionStorage.getItem("Lattitude"),
    Long:sessionStorage.getItem("Longitude"),
    }
    SaveFaultReport(obj).then((r)=>{
       showAlertMessage();
       setType('success');
       setMessage("Saved Succesfully");
       handleModalClose();

    })

  }

  const online = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;



  return (
    <>
    {/* Alert popup ui */}
       <Stack spacing={2} sx={{ width: '100%'}}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
      <TableRow hover tabIndex={-1} role="checkbox" sx={{paddingBottom:"200px"}}>
        
     
        
        
     
        <TableCell >
      {/* <button
        type="button"
        className="btn btn-sm btn-outline-success btn-tt heading6"
        onClick={handleOpenMenu}
        
      >
        View
      </button> */}
    </TableCell>
  
      </TableRow >
        <div style={{border:"1px solid grey",width:'100%', overflow: "auto", height: "650px",paddingTop:"10px",paddingLeft:'2px'}}>
       <b style={{fontSize: '1.20em',cursor:'pointer'}} >  SN:{m.SNoutput} MacID:{m.MacID} Socket:{m.SocketNumber}</b>
         <table className="table" style={{fontSize:'14px'}}>

                            <tbody > 
                          
                            <tr ><th style={{color: '#444',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Status <td style={{color: '#444'}} >  <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label></td></th>  <td /> </tr>
                            <tr>
                                  <th style={{display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button  type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>G1command()} >
                                              G1/r/n
                                            </button>
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <td >
                              <Typography>
                                {G1output[0]==='D'? <h5>Device Is Offline</h5>:
                                  <table className='AllTables' style={{display:G1output.length>1 ? 'block':'none'}}>
                                     
                                      <tbody>
                                      <tr>
                                          <th>Command</th>
                                          <td>G1</td>
                                      </tr>
                                      <tr>
                                          <th>Start Byte</th>
                                          <td>{G1output.length>1 && G1output[0].includes('!')? '!':''}</td>
                                      </tr>
                                      <tr>
                                          <th>Battery Voltage</th>
                                          <td>{G1output.length>1 && G1output[0].split('!')[1]}</td>
                                      </tr>
                                      <tr>
                                          <th>Battery Capacity</th>
                                          <td>{G1output[1]}</td>
                                      </tr>
                                      <tr>
                                          <th>Remaining Time</th>
                                          <td>{G1output[2]}</td>
                                       </tr>
                                       <tr>
                                          <th>Battery Mode</th>
                                          <td>{G1output[3]}</td>
                                        </tr>
                                        <tr>
                                          <th>Temperature</th>
                                          <td>{G1output[4]}</td>
                                         </tr>
                                         <tr>
                                          <th>IP Frequency</th>
                                          <td>{G1output[5]}</td>
                                          </tr>
                                          <tr>
                                          <th>Bypass Frequency</th>
                                          <td>{G1output[6]}</td>
                                          </tr>
                                          <tr>
                                          <th>Output Frequency</th>
                                          <td>{G1output[7]}</td>
                                          </tr>
                                          <tr>
                                          <th>Stop Byte</th>
                                          <td>{G1output[8]}</td>
                                          </tr>
                                          {/* <td>{G1output[9]}</td> */}
                                          {/* <td>{G1output[10]}</td> */}
                                          {/* <td>{G1output[11]}</td> */}
                                        
                                  
                                      </tbody>
                                  </table>
                                  }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </tr>  
                              <tr>
                                  <th style={{display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>G2command()} >
                                              G2/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  {G2output[0]==='D' ? <h5>Device Is Offline</h5>:
                                  <table className='AllTables' style={{display:G2output.length>1 ? 'block':'none'}}>
                                     
                                      <tbody>
                                          <tr>
                                              <th>Command</th>
                                              <td>G2</td>
                                          </tr>
                                       
                                          <tr>
                                            <th>Low Battery Shut Down</th>
                                            <td>{G2output.length>1 && G2output[0].includes('!')? '!':''}</td>
                                          </tr>
                                          <tr>
                                            <th>Low Battery</th>
                                            <td>{G2output.length>1 && G2output[0].split('!')[1]}</td>
                                          </tr>
                                          <tr>
                                             <th>Topology</th>
                                             <td>{G2output[1]}</td>
                                          </tr>
                                          <tr>
                                            <th>Backup/AC Normal</th>
                                            <td>{G2output[2]}</td>
                                          </tr>
                                          <tr>
                                            <th>BoostT/Float Chanrging</th>
                                             <td>{G2output[3]}</td>
                                          </tr>
                                          <tr>
                                            <th>Rectifier Operating</th>
                                            <td>{G2output[4]}</td>
                                          </tr>
                                          <tr>
                                             <th>Bypass Frequency Fail</th>
                                             <td>{G2output[5]}</td>
                                          </tr>
                                          <tr>
                                             <th>Manual Bypass Breaker</th>
                                             <td>{G2output[6]}</td>
                                          </tr>
                                          <tr>
                                             <th>Bypass AC</th>
                                             <td>{G2output[7]}</td>
                                          </tr>
                                          <tr>
                                             <th>Static Switch</th>
                                             <td>{G2output[8]}</td>
                                          </tr>
                                         <tr>
                                           <th>Inverter Operating</th>
                                            <td>{G2output[9]}</td>
                                         </tr>
                                         <tr>
                                           <th>Emergency Stop</th>
                                           <td>{G2output[10]}</td>
                                         </tr>
                                         <tr>
                                           <th>High DC Shut Down</th>
                                           <td>{G2output[11]}</td>
                                         </tr>
                                         <tr>
                                           <th>Manual Bypass Breaker Shut Down</th>
                                           <td>{G2output[12]}</td>
                                         </tr>
                                         <tr>
                                           <th>Overload Shutdown</th>
                                           <td>{G2output[13]}</td>
                                         </tr>
                                         <tr>
                                          <th>Shot Circuit Shut Down</th>
                                          <td>{G2output[14]}</td>
                                         </tr>
                                        
                                          
                                         
                                         
                                          
                                        
                                      </tbody>
                                  </table>
                                    }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </tr> 
                              <tr>
                                  <th style={{display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button  type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>G3command()} >
                                              G3/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  { G3output[0]==='D' ?<h5>Device Is Offline</h5>:
                                  <table className='AllTables' style={{display:G3output.length>1 ? 'block':'none'}}>
                                      <thead>
                                        <th />
                                        <th>Phase 1</th>
                                        <th>Phase 2</th>
                                        <th>Phase 3</th>
                                        
                                      </thead>
                                      <tbody>
                                       <tr>
                                          <th>Input</th>
                                          <td>{G3output.length>1 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[0]:''}</td>
                                          <td>{G3output.length>1 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[1]:''}</td>
                                          <td>{G3output.length>1 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[2]:''}</td>
                                        
                                        </tr>
                                        <tr>
                                          <th>Bypass</th>
                                          <td>{G3output.length>1 && G3output[1].split('/')[0]}</td>
                                          <td>{G3output.length>1 && G3output[1].split('/')[1]}</td>
                                          <td>{G3output.length>1 && G3output[1].split('/')[2]}</td>
                                        
                                        </tr>
                                        <tr>
                                          <th>Output</th>
                                          <td>{G3output.length>1 && G3output[2].split('/')[0]}</td>
                                          <td>{G3output.length>1 && G3output[2].split('/')[1]}</td>
                                          <td>{G3output.length>1 && G3output[2].split('/')[2]}</td>
                                        
                                        </tr>
                                        <tr>
                                          <th>Load %</th>
                                          <td>{G3output.length>1 && G3output[3].split('/')[0]}</td>
                                          <td>{G3output.length>1 && G3output[3].split('/')[1]}</td>
                                          <td>{G3output.length>1 && G3output[3].split('/')[2]}</td>
                                        
                                        </tr>
                                      </tbody>
                                  </table>
                                   }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </tr>   
                              <tr>
                                  <th style={{display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-5 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>Icommand()} >
                                              I/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  {Ioutput[0]==='G'? <h5>Device Is Offline</h5>:
                                  <table className='AllTables' style={{display:Ioutput.length>1 ? 'block':'none'}}>
                                     
                                      <tbody>
                                        <tr>
                                          <th>Command</th>
                                          <td>I</td>
                                        </tr>
                                        <tr>
                                          <th>Company</th>
                                          <td>{Ioutput.length>1 && Ioutput[4] }</td>
                                        </tr>
                                        <tr>
                                        <th>Model</th>
                                         <td>{Ioutput.length>1 && Ioutput[10]}</td>
                                        </tr>
                                         <tr>
                                         <th>Version</th>
                                         <td>{Ioutput.length>1 && Ioutput[11]}</td>
                                          </tr>
                                 
                                       
                                         
                                      </tbody>
                                  </table>
                                 }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </tr>   
                              <tr>
                                  <th style={{display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>GFcommand()} >
                                              GF/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  {GFoutput[0]==='D' ? <h5>Device Is Offline</h5>:
                                  <table className='AllTables' style={{display:GFoutput.length>1 ? 'block':'none'}}>
                                  
                                      <tbody>
                                      <tr>
                                          <th>Command</th>
                                          <td>GF</td>
                                        </tr>
                                       <tr>
                                          <th>Rectifier -Phase 2 Neutral</th>
                                          <td>{GFoutput.length>1 && GFoutput[0].split('!')[1].split('/')[0] }</td>
                                       </tr>
                                       <tr>
                                         <th>Rectifier - Phase 2 Phase</th>
                                          <td>{GFoutput.length>1 && GFoutput[0].split('!')[1].split('/')[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>Topology</th>
                                          <td>{GFoutput.length>1 && GFoutput[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>Rectifier Frequency</th>
                                          <td>{GFoutput.length>1 && GFoutput[2] }</td>
                                        </tr>
                                        <tr>
                                          <th>Bypass Phase 2 Neutral</th>
                                          <td>{GFoutput.length>1 && GFoutput[3].split('/')[0] }</td>
                                        </tr>
                                        <tr>
                                          <th>Bypass Phase 2 Phase</th>
                                          <td>{GFoutput.length>1 && GFoutput[3].split('/')[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>Bypass Topology</th>
                                          <td>{GFoutput.length>1 && GFoutput[4] }</td>
                                        </tr>
                                        <tr>
                                           
                                          <th>Bypass frequency</th>
                                          <td>{GFoutput.length>1 && GFoutput[5] }</td>
                                        </tr>
                                        <tr>
                                          
                                          <th>Ouput voltage Phase 2 Neutral</th>
                                          <td>{GFoutput.length>1 && GFoutput[6].split('/')[0] }</td>
                                        </tr>
                                        <tr>
                                          <th>Output Phase 2 Phase</th>
                                          <td>{GFoutput.length>1 && GFoutput[6].split('/')[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>Output Topology</th>
                                          <td>{GFoutput.length>1 && GFoutput[7]}</td>
                                        </tr>
                                        <tr>
                                          <th>Output Frequency</th>
                                          <td>{GFoutput.length>1 && GFoutput[8]}</td>
                                        </tr>
                                        <tr>
                                          <th>Battery Voltage</th>
                                          <td>{GFoutput.length>1 && GFoutput[9]}</td>
                                        </tr>
                                        <tr>
                                          <th>Power Rating</th>
                                          <td>{GFoutput.length>1 && GFoutput[10] }</td>
                                        </tr>
                                         
    
                                       
                                         
                                      </tbody>
                                  </table>
                                    }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </tr>   
                           
                                                                                                            
                            </tbody>
                        </table>
       </div>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        
           <Box sx={{ ...style, width: 500 }}>
           <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">FAUALT REPORT</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Machine No.:</h6>
                            <input readOnly type="text" className="form-control" name="machine" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>User Name:</h6>
                            <input readOnly type="text" className="form-control" name="userName" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                     <div className="col-md-12">
                        <div className="form-group my-2">
                            <h6>Fault Reported:</h6>
                            <input type="text" className="form-control" name="fault" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                     <div className="col-md-12">
                        <div className="form-group my-2">
                            <h6>Action Taken:</h6>
                            <input type="text" className="form-control" name="action" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                      <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Status:</h6>
                            <select className="form-control" name="faultStatus">
                                <option value="Completed" selected>Completed</option>
                                <option value="Pending">Pending</option>
                              

                            </select>
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={SubmitForm}>Save Report</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose}>Close</button>
            </div>
        </div>
    </div>
            </Box>
            </Modal>
    </>
  );
}

UserTableRow.propTypes = {
 
  m:PropTypes.any,
  key: PropTypes.any,
  sr:PropTypes.any,
  testMode:PropTypes.any,
  board:PropTypes.any,
   handleClick: PropTypes.func

};