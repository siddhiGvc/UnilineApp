import moment from "moment";
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LockLogRow({
  sr,
  selected,
  name,
  email,
  city,
  zone,
  role,
  beat,
  ward,
  row,
  
}) {
  const [open, setOpen] = useState(null);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClick=(loginLat,loginLong)=>{
    window.open(`https://maps.google.com?q=${loginLat},${loginLong}`);
  }

 

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} >
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
        <TableCell align="center">
           {sr}
        </TableCell>

        <TableCell component="th" scope="row" padding="none" align="center">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src="" /> */}
            <Typography variant="subtitle2" noWrap>
              {row.userName}
            </Typography>
          </Stack>
        </TableCell>

     
       <TableCell align="center">{row.machineID}</TableCell>
       <TableCell onClick={()=>handleClick(row.currentLat,row.currentLong)} sx={{textAlign:'center'}}>
       <i className="fa-solid fa-globe" style={{color: 'blue',cursor: 'pointer'}} /> {row.currentLat}  {row.currentLong }
       </TableCell>
       <TableCell align="center">{row.doorStatus}</TableCell>
     
      
       <TableCell align="center">{moment(row.createdAt).format('DD-MMM-YYYY:HH-mm')}</TableCell>
       
      

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        <TableCell align="right">
          {/* <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

LockLogRow.propTypes = {
  sr:PropTypes.any,
  city: PropTypes.any,
  zone: PropTypes.any,
  email: PropTypes.any,

  name: PropTypes.any,
  ward: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  beat: PropTypes.string,
  row:PropTypes.any,
}