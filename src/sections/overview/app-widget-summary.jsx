import React from 'react';
import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';

import { Card,Stack, CardHeader} from '@mui/material';


export default function AppWidgetSummary({ title,text, subheader, value, sx, ...other }) {
  // const minRange = 0;
  // const maxRange = 500;
  // const percent = (value - minRange) / (maxRange - minRange); // Calculate percentage

  // Function to render the voltage text
  const voltageTextRenderer = () => `${value} V`; // Display voltage with "V"

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
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />
      
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={20}
        arcsLength={[0.3, 0.5, 0.2]} // Different arc colors
        colors={['#FF5F6D', '#FFC371', '#00FF00']}
        percent={value} // Pass as a number
        arcPadding={0.02}
        needleColor="#345243" // Color of the needle
        needleBaseColor="#888" // Color of the needle base
        textColor="#000" // Color of the text
        textRenderer={voltageTextRenderer} // Custom text renderer for voltage
        formatTextValue={()=>`${value}${text}`}
      />
     
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  value: PropTypes.number.isRequired, // Ensure value is required
  sx: PropTypes.object,
  text:PropTypes.any
};
