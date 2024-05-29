import $ from 'jquery';
import moment from "moment";
import PropTypes from 'prop-types';
import React,{ useState,useEffect } from 'react';
import SwitchButton from 'bootstrap-switch-button-react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
// import Avatar from '@mui/material/Avatar';

import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';

import { SaveFaultReport } from 'src/_mock/faultReportData';
import {sendV,askCA,sendCA,sendCC,sendTV,sendFW,sendTC,askUrl,sendHBT,sendSIP,sendPWD,sendSSID,sendFota,sendPWD1,modeNone,sendSSID1,sendLight,sendReset,modeTest1,modeTest2,sendFotaUrl} from 'src/_mock/macAddress';

import Label from 'src/components/label';



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
  sr,
  key,
  handleClick,
  
}) {
  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message,setMessage]=useState("");
  const [type,setType]=useState("");
  const [url,setUrl]=useState("");

  const [light,setLight]=useState("");
  const [position,setPosition]=useState("");

  const [pin,setPin]=useState("");
  const [pulse,setPulse]=useState("");
  const [HBTvalue,setHBTvalue]=useState("");

  const [IPaddress,setIPaddress]=useState("");
  const [port,setPort]=useState("");

  const [SSID,setSSID]=useState("");
  const [PWD,setPWD]=useState("");

  const [SSID1,setSSID1]=useState("");
  const [PWD1,setPWD1]=useState("");

  const [NumValue,setNumValue]=useState("");
  const [Polarity,setPolarity]=useState("");

  const [mode,setMode]=useState('');

  const [disable,setDisable]=useState(false);

  useEffect(()=>{
     if(mode==="")
      {
        setDisable(false);
        modeNone(m.MacID,m.SocketNumber,sessionStorage.getItem("name"));
      }
      else if(mode!=="") {
        setDisable(true);
        if(mode==="tm1")
        {
          modeTest1(m.MacID,m.SocketNumber,sessionStorage.getItem("name"));
        }
        else{
          modeTest2(m.MacID,m.SocketNumber,sessionStorage.getItem("name"));
        }
      }
  },[mode, m.MacID, m.SocketNumber])


  const showAlertMessage = () => {
    setShowAlert(true);

    // You can optionally set a timeout to hide the alert after a few seconds
    setTimeout(() => {
    setShowAlert(false);
    }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
};

// view mwnu open function
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  // view menu clsoe function
  const handleCloseMenu = () => {
    setOpen(null);
  };


  // Close popup function of technicaian form
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const [isChecked, setIsChecked] = useState(m.INHoutput===1);
  // const [isFota, setIsFota] = useState(true);
 

const handleChange = () => {
  const obj={
    MacId:m.MacID,
    outPutValue:!isChecked,
    socketNumber:m.SocketNumber,
    UserName:sessionStorage.getItem("name")

  }
  fetch(`http://165.232.180.111:8080/kwikpay/saveINHoutput`,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(obj)
  })
  setIsChecked(!isChecked);
};




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
       <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
      <TableRow hover tabIndex={-1} role="checkbox">
        
      <TableCell>{sr}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
           
            <Typography variant="subtitle2" noWrap tabIndex={0}>
           <span>{m.UID}</span>
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
           <Typography>

           <span>{m.MacID}</span>
           </Typography>
           
        </TableCell>
        <TableCell>
           <Typography>

           {m.SocketNumber}
           </Typography>
           
        </TableCell>
        <TableCell>
           <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label>
        </TableCell>
      
        
        
     
        <TableCell>
      <button
        type="button"
        className="btn btn-sm btn-outline-success btn-tt heading6"
        onClick={handleOpenMenu}
        
      >
        View
      </button>
    </TableCell>
  
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 600 ,padding:3},
        }}
      >
           <b style={{fontSize: '1.20em',cursor:'pointer'}} >{m.MacID} {m.SocketNumber}</b>
         <table className="table" style={{fontSize:'14px'}}>

                            <tbody > 
                            <tr>
                              <div className="row">
                                          <p>Test Mode</p>
                                            <div className="col-12 sw-parent">
                                                 <select onChange={(e)=>setMode(e.target.value)}>
                                                    <option value=''>None</option>
                                                    <option value='tm1'>Test Mode 1</option>
                                                    <option value='tm2'>Test Mode 2</option>
                                                 </select>
                                            
                                            </div>
                                        </div>
     
                            </tr>
                            <tr ><th style={{color: '#444'}}>Status</th><td style={{color: '#444'}} >  <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label></td></tr>
                            <tr>
                                  <th>   
                                    <div className="col-xl-4 col-lg-6 col-md-7 col-12 col-12 my-2 mx-3">
                                      
                                        <div className="row">
                                          <p>INH Output</p>
                                            <div className="col-12 sw-parent"   disabled={disable}>
                                              
                                                    <SwitchButton
                                                  
                                                    checked={isChecked}
                                                    onChange={handleChange}
                                                    onlabel="1"
                                                    offlabel="0"
                                                    onstyle='danger'
                                                    offstyle='success'
                                                    width={20}
                                                />
                                            </div>
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p>INH Input</p>
                              {m.INHinput===0 ?<p style={{color:'green'}}>{m.INHinput}</p>:<p style={{color:'red'}}>{m.INHinput}</p>}
                              </Typography>
                                </td>
        
                              </tr>   
                              <tr>
                                  <th>   
                                    <div className="col-xl-4 col-lg-6 col-md-7 col-12 col-12 my-2 mx-3">
                                      
                                        <div className="row">
                                          <p>OLD FOTA</p>
                                            <div className="col-12 sw-parent">
                                              
                                            <button disabled={disable} type="button" className="btn btn-primary text-white"  onClick={()=>sendFota(m.MacID,true,m.SocketNumber,sessionStorage.getItem("name"),"old")} >
                                              Fota
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-7 col-12 col-12 my-2 mx-3">
                                      
                                      <div className="row">
                                        <p>NEW FOTA</p>
                                          <div className="col-12 sw-parent">
                                            
                                          <button disabled={disable} type="button" className="btn btn-primary text-white"  onClick={()=>sendFota(m.MacID,true,m.SocketNumber,sessionStorage.getItem("name"),"new")} >
                                            Fota
                                        </button>
                                          </div>
                                      </div>
                                  </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p>Fota Message</p>
                              {m.FotaMessage}
                              </Typography>
                                </td>
        
                              </tr>  
                              <tr>
                                  <th>   
                                    <div className="col-xl-4 col-lg-6 col-md-7 col-12 col-12 my-2 mx-3">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button disabled={disable} type="button" className="btn btn-warning text-white"  onClick={()=>sendReset(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              RESET
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.RstMessage}
                              </Typography>
                                </td>
        
                              </tr>
                              <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          <h5>V</h5>
                                             <div>
                                              <input type='number' style={{width:'100px'}} placeholder='Pin' onChange={(e)=>setPin(e.target.value)}/>
                                              <input type='number' style={{width:'100px'}} placeholder='Pulse' onChange={(e)=>setPulse(e.target.value)}/>
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendV(m.MacID,pin,pulse,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.Voutput}
                              </Typography>
                                </td>
        
                              </tr> 
                              <tr>
                                  <th>   
                                    <div className="col-xl-4 col-lg-6 col-md-7 col-12 col-12 my-2 mx-3">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button disabled={disable} type="button" className="btn btn-secondary text-white"  onClick={()=>sendTC(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              *TC?#
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.TCoutput}
                              </Typography>
                                </td>
        
                              </tr>  
                              <tr>
                                  <th>   
                                    <div className="col-xl-4 col-lg-7 col-md-7 col-12 col-12 my-2 mx-3">
                                    <div className="row">
                                            <div className="col-12 sw-parent">
                                              <button disabled={disable} type="button" className="btn btn-secondary text-white "  onClick={()=>sendCC(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                               *CC#
                                              </button>
                                            </div>
                                        </div>
                                    </div>
                                  </th>
                                  <td>
                                  <Typography>
                                  <p> Message</p>
                                  {m.Coutput}
                                  </Typography>
                                    </td>
                                </tr>
                              
                              <tr>
                                  <th>   
                                    <div className="col-xl-4 col-lg-7 col-md-7 col-12 col-12 my-2 mx-3">
                                         <div className="row">
                                            <div className="col-12 sw-parent">
                                              <button disabled={disable} type="button" className="btn btn-secondary text-white "  onClick={()=>sendFW(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                               *Fw?#
                                              </button>
                                            </div>
                                        </div>
                                    </div>
                                  </th>
                                  <td>
                                  <Typography>
                                  <p> Message</p>
                                  {m.FWoutput}
                                  </Typography>
                                    </td>
                                </tr>
                                <tr>
                                  <th>   
                                    <div className="col-xl-4 col-lg-7 col-md-7 col-12 col-12 my-2 mx-3">
                                         <div className="row">
                                            <div className="col-12 sw-parent">
                                              <button disabled={disable} type="button" className="btn btn-secondary text-white "  onClick={()=>sendTV(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                               *TV?#
                                              </button>
                                            </div>
                                        </div>
                                    </div>
                                  </th>
                                  <td>
                                  <Typography>
                                  <p> Message</p>
                                  {m.TVoutput}
                                  </Typography>
                                    </td>
                                </tr> 
                                 <tr>
                                   <th>
                                    <div className="col-xl-4 col-lg-9 col-md-7 col-12 col-12 my-2 mx-3">
                                         <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          
                                              <h6 style={{fontSize:"12px"}}>FOTA</h6>
                                             <div >
                                              <input type='text' style={{width:'200px'}} placeholder='Url' onChange={(e)=>setUrl(e.target.value)}/>
                                             
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendFotaUrl(m.MacID,url,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>

                                    </th>
                                    <td>
                                  <Typography>
                                  <p> Message</p>
                                  {m.FotaURLoutput}
                                  </Typography>
                                    </td>
                                
                                
                                </tr>  
                               <tr>
                                  <th>   
                                    <div className="col-xl-4 col-lg-7 col-md-7 col-12 col-12 my-2 mx-3">
                                    <div className="row">
                                            <div className="col-12 sw-parent">
                                              <button disabled={disable} type="button" className="btn btn-secondary text-white "  onClick={()=>askUrl(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                               *URL?#
                                              </button>
                                            </div>
                                        </div>
                                    </div>
                                  </th>
                                  <td>
                                  <Typography>
                                  <p> Message</p>
                                  {m.URLoutput}
                                  </Typography>
                                    </td>
                                </tr>
                                <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          <h5>SL</h5>
                                             <div>
                                              <input type='number' style={{width:'100px'}} placeholder='light' onChange={(e)=>setLight(e.target.value)}/>
                                              <input type='number' style={{width:'100px'}} placeholder='position' onChange={(e)=>setPosition(e.target.value)}/>
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendLight(m.MacID,light,position,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.Soutput}
                              </Typography>
                                </td>
        
                              </tr> 
                              <tr>
                                  <th>   
                                    <div className="col-xl-4 col-lg-7 col-md-7 col-12 col-12 my-2 mx-3">
                                    <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          <h5>HBT</h5>
                                             <div>
                                              <input type='number' min={30} max={300} style={{width:'100px'}} placeholder='value' onChange={(e)=>setHBTvalue(e.target.value)}/>
                                            
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendHBT(m.MacID,HBTvalue,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                                  </th>
                                  <td>
                                  <Typography>
                                  <p> Message</p>
                                  {m.HBToutput}
                                  </Typography>
                                    </td>
                                </tr> 
                                <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          <h5>SIP</h5>
                                             <div>
                                              <input type='text' style={{width:'100px'}} placeholder='ipAddress' onChange={(e)=>setIPaddress(e.target.value)}/>
                                              <input type='number' style={{width:'100px'}} placeholder='port' onChange={(e)=>setPort(e.target.value)}/>
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendSIP(m.MacID,IPaddress,port,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.SIPoutput}
                              </Typography>
                                </td>
        
                              </tr> 
                              <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          <h5>SS</h5>
                                             <div>
                                              <input type='text' style={{width:'100px'}} placeholder='ssid' onChange={(e)=>setSSID(e.target.value)}/>
                                        
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendSSID(m.MacID,SSID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.SSIDoutput}
                              </Typography>
                                </td>
        
                              </tr>  
                              <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          <h5>PW</h5>
                                             <div>
                                              <input type='text' style={{width:'100px'}} placeholder='pwd' onChange={(e)=>setPWD(e.target.value)}/>
                                              
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendPWD(m.MacID,PWD,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.PWDoutput}
                              </Typography>
                                </td>
        
                              </tr>
                               
                              <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          <h5>SS1</h5>
                                             <div>
                                              <input type='text' style={{width:'100px'}} placeholder='ssid1' onChange={(e)=>setSSID1(e.target.value)}/>
                                        
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendSSID1(m.MacID,SSID1,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.SSID1output}
                              </Typography>
                                </td>
        
                              </tr>  
                              <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          <h5>PW1</h5>
                                             <div>
                                              <input type='text' style={{width:'100px'}} placeholder='pwd1' onChange={(e)=>setPWD1(e.target.value)}/>
                                              
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendPWD1(m.MacID,PWD1,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.PWD1output}
                              </Typography>
                                </td>
        
                              </tr> 
                              <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                          <h5>CA</h5>
                                             <div>
                                              <input type='text' style={{width:'100px'}} placeholder='numeric value' onChange={(e)=>setNumValue(e.target.value)}/>
                                              <input type='text' style={{width:'100px'}} placeholder='polarity' onChange={(e)=>setPolarity(e.target.value)}/>
                                              </div>
                                              <button disabled={disable} type="button" className="btn btn-info text-white " style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendCA(m.MacID,NumValue,Polarity,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.CAmessage}
                              </Typography>
                                </td>
        
                              </tr>  
                              <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                    <div className="row">
                                            <div className="col-12 sw-parent">
                                              <button disabled={disable} type="button" className="btn btn-secondary text-white "  onClick={()=>askCA(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                               *CA?#
                                              </button>
                                            </div>
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.CAoutput}
                              </Typography>
                                </td>
        
                              </tr> 
                                                                                                            
                            </tbody>
                        </table>
      </Popover>
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
   handleClick: PropTypes.func

};
