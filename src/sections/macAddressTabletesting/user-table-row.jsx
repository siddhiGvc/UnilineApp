import $ from 'jquery';
// import moment from "moment";
import PropTypes from 'prop-types';
import React,{ useRef,useState,useEffect } from 'react';
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
import {sendV,askSIP,sendTV,sendFW,sendTC,askUrl,askSSID,modeNone,modeTest1,modeTest2,modeTest3} from 'src/_mock/macAddress';

// import Label from 'src/components/label';
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
 
  const [pin,setPin]=useState("");
  const [pulse,setPulse]=useState("");
 

  const [disable,setDisable]=useState(false);

  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(()=>{
    
     if(!testMode && m.id>=0)
      {
        setDisable(false);
        modeNone(m.MacID,m.SocketNumber,sessionStorage.getItem("name"));
      }
      else if(testMode && board===1 && m.id>=0) {
        setDisable(true);
     
          modeTest1(m.MacID,m.SocketNumber,sessionStorage.getItem("name"));
      
      }
      else if(testMode && board===2 && m.id>=0)
        {
          setDisable(true);
     
          modeTest2(m.MacID,m.SocketNumber,sessionStorage.getItem("name"));
        }
        else if(testMode && board===3 && m.id>=0)
          {
            setDisable(true);
       
            modeTest3(m.MacID,m.SocketNumber,sessionStorage.getItem("name"));
          }
  },[testMode,m.MacID, m.SocketNumber,m.id,board])


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

  useEffect(() => {
 
    if(m.Voutput)
    {
      setShowVideo(true);
    }
   
  }, [m.Voutput]);

  const handleVideoEnd = () => {
    setShowVideo(false);
   
  };

  // const online = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;



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
        <div style={{border:"1px solid grey", overflow: "auto", height: "325px",paddingTop:"5px",paddingLeft:'2px',marginTop:"-20px"}}>
         {/* {m.Voutput? <video width="100%" height="100%" controls autoPlay>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          <track
            src="path-to-your-captions.vtt"
            kind="captions"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>:null} */}
        {showVideo && (
        <video ref={videoRef} width="100%" height="100%" controls autoPlay  onEnded={handleVideoEnd}>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          <track src="path-to-your-captions.vtt" kind="captions" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </video>
      )}
           <b style={{fontSize: '1.20em',cursor:'pointer'}} >{m.MacID} {m.SocketNumber}</b>
         <table className="table" style={{fontSize:'14px'}}>

                            <tbody > 
                         
                            {/* <tr ><th style={{color: '#444',display:'flex',justifyContent:'space-between'}}>Status <td style={{color: '#444'}} >  <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label></td></th>  <td /> </tr> */}
                            <tr>
                                  <th style={{display:'flex',justifyContent:'space-between'}}>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3 ">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'3px'}}>
                                         
                                          <h5>V</h5>
                                             <div>
                                              <input type='number' style={{width:'100px'}} placeholder='Pin' onChange={(e)=>setPin(e.target.value)}/>
                                              <input type='number' style={{width:'100px'}} placeholder='Pulse' onChange={(e)=>setPulse(e.target.value)}/>
                                              </div>
                                            
                                              <button disabled={disable} type="button"   className={`btn btn-${board===1?m.Color:''} btn-info text-white `}  style={{height:"30px",width:'60px',fontSize:'12px'}}  onClick={()=>sendV(m.MacID,pin,pulse,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              SEND
                                          </button>
                                            
                                        </div>
                                    </div>
                                    <Typography>
                              <p> Message</p>
                              {(board===2 || board===3) && testMode? m.RPoutput:m.Voutput}
                              </Typography>
                          
                              </th>
                              <td /> 
                              <tr>
                                  <th style={{display:'flex',justifyContent:'space-between'}}>   
                                    <div className="col-xl-4 col-lg-6 col-md-7 col-12 col-12 my-2 mx-3">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button disabled={disable} type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-secondary text-white`}  onClick={()=>sendTC(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              *SN?#
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                              <p> Message</p>
                              {m.TCoutput}
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </tr>  
        
                              </tr> 
                              <tr>
                                  <th style={{display:'flex',justifyContent:'space-between'}}>   
                                    <div className="col-xl-4 col-lg-6 col-md-7 col-12 col-12 my-2 mx-3">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button disabled={disable} type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-secondary text-white`}  onClick={()=>sendTC(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                              *TC?#
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                              <p> Message</p>
                              {m.TCoutput}
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </tr>  
                            
                              
                             
                                <tr>
                                  <th style={{display:'flex',justifyContent:'space-between'}}>   
                                    <div className="col-xl-4 col-lg-7 col-md-7 col-12 col-12 my-2 mx-3">
                                         <div className="row">
                                            <div className="col-12 sw-parent">
                                              <button disabled={disable} type="button" className="btn btn-secondary text-white "  onClick={()=>sendTV(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                               *TV?#
                                              </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                                  <Typography>
                                  <p> Message</p>
                                  {m.TVoutput}
                                  </Typography>
                                    </td>
                                  </th>
                                  <td /> 
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
                                              <button disabled={disable} type="button" className="btn btn-secondary text-white "  onClick={()=>askUrl(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                               *URL?#
                                              </button>
                                            </div>
                                        </div>
                                    </div>
                                  </th>
                                  <td>
                                  <Typography>
                                  <p style={{width:'200px',height:'50px'}}> Message</p>
                                  {m.URLoutput}
                                  </Typography>
                                    </td>
                                </tr>
                            
                              
                              <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                        <div  style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                        <button disabled={disable} type="button" className="btn btn-secondary text-white "  onClick={()=>askSIP(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                               *SIP?#
                                              </button>
                                            
                                        </div>
                                    </div>
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.SIPmessage}
                              </Typography>
                                </td>
        
                              </tr> 
                             
                              <tr>
                                  <th>   
                                    <div className="col-xl-5 col-lg-7 col-md-8 col-12 col-12 my-2 mx-3">
                                      
                                    <div className="row">
                                            <div className="col-12 sw-parent">
                                              <button disabled={disable} type="button" className="btn btn-secondary text-white "  onClick={()=>askSSID(m.MacID,m.SocketNumber,sessionStorage.getItem("name"))} >
                                               *SSID?#
                                              </button>
                                            </div>
                                        </div>
                                      
                                    </div>
                                    
                          
                              </th>
                                <td>
                              <Typography>
                              <p> Message</p>
                              {m.SSIDmessage}
                              </Typography>
                                </td>
        
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
