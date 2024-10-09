import React from 'react';
import PropTypes from 'prop-types';

import { Cancel, CheckCircle} from '@mui/icons-material'; // Material-UI icons
import Card from '@mui/material/Card';


const StatusLabel = ({ label, isOn }) => 
   <Card>
    <div style={{ display: 'flex', alignItems: 'center',padding:10 }}>
      {isOn ? (
        <CheckCircle style={{ color: 'green', marginRight: '8px' }} />
      ) : (
        <Cancel style={{ color: 'red', marginRight: '8px' }} />
      )}
      <span>{label}</span>
    </div>
  </Card>
  


StatusLabel.propTypes = {
  label: PropTypes.string.isRequired,
  isOn: PropTypes.any,
};

export default StatusLabel;
