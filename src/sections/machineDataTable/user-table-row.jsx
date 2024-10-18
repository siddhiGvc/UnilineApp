import $ from 'jquery';
import moment from "moment";
import PropTypes from 'prop-types';
import React,{ useState } from 'react';

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
  machineId,
  G1output,
  G2output,
  G3output,
  MachineType
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
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  // view menu clsoe function
  const handleCloseMenu = () => {
    setOpen(null);
  };


  // Open  Popup function of technician form
  const handleModalOpen = () => {
   
 
    setOpenModal(true);
    setTimeout(()=>{
      $('[name="machine"]').val(machineId);
      $('[name="userName"]').val(sessionStorage.getItem("name"));
    },200)
  };

  // Close popup function of technicaian form
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleKeyDown = (event) => {
    // Check if the Enter key is pressed (key code 13)
    if (event.key === 'Enter') {
      handleModalOpen();
    }
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
  const address = a => (
    <small>
      <a
        className="text-muted elp"
        target="_blank"
        rel="noreferrer"
        href={`https://www.google.com/maps?q=${a.lat},${a.lon}`}
      >
        {a.adress}
      </a>
    </small>
  );


  // display stock dtatus function of table row
//   function stockStatus(i, visible) {
    
//     if (!visible) return '';
//     switch (i) {
    
//         case 0: return  <Label color='error'>Empty</Label>
//         case 1: return  <Label color='warning'>Low</Label>
//         case 3: return   <Label color='success'>Ok</Label>
//         default: return <span className="badge w-7 py-1 px-3 text-white badge-pill badge-info">?</span>
//     }
// }

// display burnStatus function of table row
// function burnStatus(i, visible) {
//     if (!visible) return '';
//     switch (i) {

//         case 1: return <i className="fa fa-fire fa-2x text-warning i-burn" title="Burning On"/>
//         case 2: return <i className="fa fa-exclamation-triangle fa-2x text-danger" title="Burning Error"/>
//         default: return ''
//     }
// }

// display lockStatus function of table row.
//  function lockStatus(i,ser) {
    
       
//     switch (i) {
//         case 0: return <i className="fa-solid fa-lock fa-2x" title="Door Close" style={{cursor:'pointer'}} />
//         case 1: return <i className="fa-solid fa-lock-open  fa-2x text-success" title="Door Open"/>
//          case 2: return <i className="fa-solid fa-lock-open fa-2x text-danger " title="Door Forced Open"/>
//         default: return ''
//     }
 
    
// }

// const filterOnline = q => moment().diff(moment.utc((q.lastHeartbeatTime || q.lastOnTime).replace('Z', '')), 'minute') < 5;
  

// converting integer to text amount function
// const amountText = amt => {
//   amt = amt || 0;

//   if(amt>=10000000) {
//       const cr = parseInt(amt / 100000, 10) / 100;
//       const Cr = parseFloat(cr.toFixed(2));
//       return `${Cr} Cr`;
//   } 
//   if(amt>=1000000) {
//       const l = parseInt(amt / 1000 ,10) / 100;
//       const L = parseFloat(l.toFixed(6));
//       return  `${L} L`;
//   } 
//   if(amt>=1000) {
//       const k = parseInt(amt / 10 ,10) / 100;
//       const K = parseFloat(k.toFixed(2));
//       return  `${K} K`;
//   }

//   // Remove the unnecessary else statement
//   return amt;
// }




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
           
            <Typography variant="subtitle2" noWrap onKeyDown={handleKeyDown} onClick={handleModalOpen} role="button"  tabIndex={0}>
           <span> <span ><b>{m.MacID}</b> [S/N: {m.SNoutput}]</span><br/><small className="text-muted">zone: {m.Zone} / ward: {m.Ward} / beat: {m.Beat}</small><br/>{address(m)}</span>
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
           <Label color={(m.device_status==="Online"  && 'success') || 'error'}>{m.device_status}</Label>
        </TableCell>

       
         <TableCell>
         {G1output.length>2 ? G1output[4]:''}
         </TableCell>
          <TableCell>
          {G2output.length>2 && G2output[0]===1 ? <Label color='success'>BOOST</Label>:<Label color='error'>FLOAT</Label>}
          </TableCell>
          <TableCell>
         {G2output.length>2 && G2output[0].split('')[6] === 0 ? <Label color='success'>Online</Label>: <Label color='error'>Offline</Label>}
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
          sx: { width: 340 ,padding:2},
        }}
      >
           <b style={{fontSize: '1.20em',cursor:'pointer'}} >{m.uid} {m.serial}</b>
         <table className="table" style={{fontSize:'14px'}}>
                            <tbody> 
                                  <tr><th style={{color: '#444'}}>Status</th><td style={{color: '#444'}} >  <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label></td></tr>
                                <tr><th style={{color: '#444'}}>IP Voltage 1</th><td style={{color: '#444'}}>{G3output.length>2 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[0]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>IP Voltage 2</th><td style={{color: '#444'}}>{G3output.length>2 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[1]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>IP Voltage 3</th><td style={{color: '#444'}}>{G3output.length>2 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[2]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>OP Voltage 1</th><td style={{color: '#444'}}>{G3output.length>2 && G3output[2].includes('/')?G3output[2].split('/')[0]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>OP Voltage 2</th><td style={{color: '#444'}}>{G3output.length>2 && G3output[2].includes('/')?G3output[2].split('/')[1]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>OP Voltage 3</th><td style={{color: '#444'}}>{G3output.length>2 && G3output[2].includes('/')?G3output[2].split('/')[2]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>IP Frequency</th><td style={{color: '#444'}}>{G1output.length>2 ? G1output[5]:''}</td></tr>
                             
                        
                                <tr><th style={{color: '#444'}}>On Since</th><td style={{color: '#444'}}>{moment.utc((m.lastOnTime || m.lastHeartBeatTime)).local().format('DD-MMM-YYYY hh:mm a')}</td></tr>
                               <tr ><th style={{color: '#444'}}>Last Online At</th><td style={{color: '#444'}}>{m.lastHeartbeatTime ? moment.utc(m.lastHeartBeatTime).local().format('DD-MMM-YYYY hh:mm a') : 'NA'}</td></tr>
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
  MachineType:PropTypes.any,
  m:PropTypes.any,
  key: PropTypes.any,
  sr:PropTypes.any,
  machineId: PropTypes.any,
  G1output:PropTypes.any,
  G2output:PropTypes.any,
  G3output:PropTypes.any
 
};
