import React from 'react';
import PropTypes from 'prop-types';

import { Info, Cancel, CheckCircle } from '@mui/icons-material'; // Material-UI icons
import Card from '@mui/material/Card';

const StatusLabel = ({ label, color }) => {
  const renderIcon = () => {
    switch (color) {
      case 'green':
        return <CheckCircle style={{ color, marginRight: '8px' }} />;
      case 'red':
        return <Cancel style={{ color, marginRight: '8px' }} />;
      default:
        return <Info style={{ color, marginRight: '8px' }} />;
    }
  };

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
        {renderIcon()}
        <span>{label}</span>
      </div>
    </Card>
  );
};

StatusLabel.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string, // More specific type for color
};

export default StatusLabel;
