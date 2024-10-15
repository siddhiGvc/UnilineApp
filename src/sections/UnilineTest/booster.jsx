import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import { Box, Card, Typography, LinearProgress } from '@mui/material';

const VerticalLinearProgress = styled(LinearProgress)(({ theme, value}) => ({
  transform: 'rotate(270deg)',
  width: 300,
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiLinearProgress-bar': {
    backgroundColor: value > 60 ? theme.palette.success.main : theme.palette.primary.main,
  },
}));

const BoosterBar = ({ value, max ,title}) => {
  const normalizedValue = (value / max) * 100;

  return (
    <Card sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '20%',
          height: '60%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginTop: 10
        }}
      >
        {/* Progress Bar Box */}
        <Box sx={{ height: 150, width: 50, position: 'relative' }}>
          {/* Overlay Text */}
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'black',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {`${Math.round(normalizedValue)}%`}
            </Typography>
          </Box>

          {/* Progress Bar */}
          <VerticalLinearProgress variant="determinate" value={normalizedValue} />
        </Box>
      </Box>
    </Card>
  );
};

BoosterBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  title:PropTypes.any
};

export default BoosterBar;


