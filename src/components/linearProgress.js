import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel({ value = 0, showPercentaje = false}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      {(showPercentaje) && 
          <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            value,
          )}%`}</Typography>
          </Box>
      }
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
  showPercentaje: PropTypes.bool.isRequired
};

const ProcessingMessageLabel = ({messages}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    let position = 0;
    useEffect(() => {
      if(currentMessage !== "" ){
        position++;
        setTimeout(() => {
          setCurrentMessage(messages[position]);
        }, 4000);
      } else {
        setCurrentMessage(messages[position]);
      }
    }, [currentMessage]);

    return (<>
        <div>{currentMessage}</div>
      </>)
}

const LinearWithValueLabel = ({ processingMessages = [], showPercentaje = false}) => {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', pb: '2rem' }}>
      {(processingMessages.length > 0) ?
        <ProcessingMessageLabel messages={processingMessages}/>
        :
        <div>Cargando...</div> 
      } 
      <LinearProgressWithLabel value={progress} showPercentaje={showPercentaje} />
    </Box>
  );
}

export default LinearWithValueLabel;