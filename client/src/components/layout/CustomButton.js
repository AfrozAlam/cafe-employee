import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CustomButton = ({btnText, setIsAdd}) => {
  return (
    <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => setIsAdd(true)}>
      {btnText}
    </Button>
  )
}

export default CustomButton