import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const muiTheme = createTheme({
  overrides:{
    MuiSlider: {
      root: {
        blockSize: 20
      },
      colorPrimary:{
        color:  "#e4bb4a",
      },
      track: {
        height: 4,
        borderRadius: 0
      },
      rail: {
        height: 4,
        borderRadius: 0,
      },
      thumb: {
        height: 12,
        width: 12,
      },
      mark: {
        height: 4
      },
      markLabel: {
        color: "white"
      },
      markLabelActive: {
        color: "#e4bb4a"
      }
    }
  }
});

const priorities = [
  {
    value: 1,
    label: "Normal",
  },
  {
    value: 2,
    label: "Good",
  },
  {
    value: 3,
    label: "Important",
  },
];

export default function PrioritySlider({onChange, value}) {
  return (
    <ThemeProvider theme={muiTheme}>
      <Slider
        min={1}
        max={3}
        key={value}
        value={value}
        step={1}
        marks={priorities}
        size='medium'
        onChange={onChange}
      />
    </ThemeProvider>
  );
}