import * as React from 'react';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const muiTheme = createTheme({
  components:{
    MuiSlider: {
      styleOverrides:{
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
          color: "white",
          '&.MuiSlider-markLabelActive': { //@mui problems, see https://github.com/mui-org/material-ui/issues/24033
            color: "#e4bb4a",
          },
        },
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