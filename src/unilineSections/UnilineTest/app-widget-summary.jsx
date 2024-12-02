import React from 'react';
import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';

import { Card, Stack, CardHeader } from '@mui/material';

export default function AppWidgetSummary({ title, text, subheader, value, sx, ...other }) {
  const minRange = 0;
  const maxRange = 500;
  const percent = (value - minRange) / (maxRange - minRange); // Calculate percentage based on the range

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="column"
      sx={{
        px: 3,
        py: 1,
        borderRadius: 2,
      
        ...sx,
      }}
      {...other}
    >
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1, fontSize:5,marging:0}} />

      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={100}
        arcsLength={[0.3, 0.5, 0.2]} // Different arc colors
        colors={['#00FF00', '#FFC371', '#FF5F6D']}
        percent={percent} // Pass percentage to position the needle correctly
        arcPadding={0.02}
        needleColor="#345243" // Color of the needle
        needleBaseColor="#888" // Color of the needle base
        textColor="#000" // Color of the text
        formatTextValue={() => `${value} ${text}`} // Display the exact value in volts (not percentage)
        needleScale={0.43}
        animate={false}
        style={{
          width: 250,  // Set your custom width
          height: 110  // Set your custom height
        }}
      />
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  value: PropTypes.number.isRequired, // Ensure value is required
  sx: PropTypes.object,
  text: PropTypes.any,
};
