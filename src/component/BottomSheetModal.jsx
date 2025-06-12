import React, { useState } from 'react';
import { Drawer, Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../applicationStore/formSlice';
import FullDataForm from './FullDataForm';

export default function BottomSheetModal() {
//   const [open, setOpen] = useState(false);
  const open = useSelector((state)=>state.mForm.formVisibility);
  const dispatch = useDispatch()
  const toggleDrawer = (newOpen) => () => {
    dispatch(toggleForm());
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer(true)} sx={{marginTop:"30px"}}>
       Edit data
      </Button>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 2,
            minHeight: '30vh',
            maxHeight:"60vh"
          },
        }}
      >
        <Box role="presentation">
          <FullDataForm/>
        </Box>
      </Drawer>
    </div>
  );
}
