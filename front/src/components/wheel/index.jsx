import React, { useState } from 'react';
import './wheel.module.css';
import { Wheel } from 'react-custom-roulette';
import { taskCategories } from '../../utils/constants';
import { Box, Button } from '@mui/material';

const data = taskCategories.map((item) => ({
  option: item.label
}));

const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50'];
const textColors = ['#0b3351'];
const outerBorderColor = '#eeeeee';
const outerBorderWidth = 10;
const innerBorderColor = '#30261a';
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = '#eeeeee';
const radiusLineWidth = 8;
const fontFamily = 'Nunito';
const fontWeight = 'bold';
const fontSize = 20;
const fontStyle = 'normal';
const textDistance = 60;
const spinDuration = 1.0;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        p: 2,
        gap: 6,
        flexDirection: 'column',

      }}
    >
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={backgroundColors}
        textColors={textColors}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        outerBorderColor={outerBorderColor}
        outerBorderWidth={outerBorderWidth}
        innerRadius={innerRadius}
        innerBorderColor={innerBorderColor}
        innerBorderWidth={innerBorderWidth}
        radiusLineColor={radiusLineColor}
        radiusLineWidth={radiusLineWidth}
        spinDuration={spinDuration}
        startingOptionIndex={2}
        // perpendicularText
        textDistance={textDistance}
        onStopSpinning={() => {
          setMustSpin(false);
          alert(`You won: ${data[prizeNumber].option}`);
        }}
        customPointer={(
          <Box
            sx={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: '20px solid green',
              zIndex: 10
            }}
            dir='bottom'
          />
        )}
      />
      <Button variant='contained' onClick={handleSpinClick}>
        SPIN
      </Button>
    </Box>
  );
};

export default App;