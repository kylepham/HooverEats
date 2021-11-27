import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const PreferenceInput = styled(TextField)({
  '& label.Mui-focused': {
    color: "#e4bb4a",
  },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '&.Mui-focused fieldset': {
      borderColor: "#e4bb4a",
    },
  },
});
