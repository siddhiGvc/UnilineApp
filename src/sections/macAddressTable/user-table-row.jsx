import $ from 'jquery';
import moment from "moment";
import PropTypes from 'prop-types';
import React,{ useState } from 'react';
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

import Label from 'src/components/label';
// import { Alerts } from 'src/components/Alerts';

// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
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
  handleClick
}) {
  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message,setMessage]=useState("");
  const [type,setType]=useState("");

  const showAlertMessage = () => {
    setShowAlert(true);

    // You can optionally set a timeout to hide the alert after a few seconds
    setTimeout(() => {
    setShowAlert(false);
    }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
};

// view mwnu open function
  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // view menu clsoe function
  const handleCloseMenu = () => {
    setOpen(null);
  };


  // Open  Popup function of technician form
  // const handleModalOpen = () => {
   
 
  //   setOpenModal(true);
  //   setTimeout(()=>{
  //     $('[name="machine"]').val(machineId);
  //     $('[name="userName"]').val(sessionStorage.getItem("name"));
  //   },200)
  // };

  // Close popup function of technicaian form
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const [isChecked, setIsChecked] = useState(m.INHoutput===1);
 

const handleChange = () => {
  const obj={
    MacId:m.MacID,
    outPutValue:!isChecked,
    socketNumber:m.SocketNumber

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


  // address of machine table 
  // const address = a => (
  //   <small>
  //     <a
  //       className="text-muted elp"
  //       target="_blank"
  //       rel="noreferrer"
  //       href={`https://www.google.com/maps?q=${a.lat},${a.lon}`}
  //     >
  //       {a.address}
  //     </a>
  //   </small>
  // );


  // display stock dtatus function of table row
 

// const filterOnline = q => moment().diff(moment.utc((q.lastHeartbeatTime || q.lastOnTime).replace('Z', '')), 'minute') < 5;
  

// converting integer to text amount function





// const sum = (a, b) => a + b;


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
           <Typography>

           {m.INHinput===0 ?<span color='red'>{m.INHinput}</span>:<span color='green'>{m.INHinput}</span>}
           </Typography>
           
        </TableCell>
        <TableCell>
        <div className="col-xl-3 col-lg-5 col-md-6 col-12 col-12 my-2">
                      
                        <div className="row">
                            <div className="col-12 sw-parent">
                               
                                     <SwitchButton
                                
                                    checked={isChecked}
                                    onChange={handleChange}
                                    onlabel="1"
                                    offlabel="0"
                                    onstyle='success'
                                    offstyle='danger'
                                    width={20}
                                />
                            </div>
                        </div>
                    </div>
           
        </TableCell>
        
     
        {/* <TableCell>
      <button
        type="button"
        className="btn btn-sm btn-outline-success btn-tt heading6"
        onClick={handleOpenMenu}
        
      >
        View
      </button>
    </TableCell> */}
  
      

       
      

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 340 ,padding:2},
        }}
      >
           <b style={{fontSize: '1.20em',cursor:'pointer'}} >{m.uid} {m.serial}</b>
         <table className="table" style={{fontSize:'14px'}}>
                            <tbody /> 
                              
                            {/* </tbody> */}
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
