import React, { useState } from 'react';
import { Drawer, Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../applicationStore/formSlice';

export default function BottomSheetModal() {
//   const [open, setOpen] = useState(false);
  const open = useSelector((state)=>state.mForm.formVisibility);
  const dispatch = useDispatch()
  const toggleDrawer = (newOpen) => () => {
    dispatch(toggleForm());
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Open Bottom Sheet
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
          },
        }}
      >
        <Box role="presentation">
          <Typography variant="h6">Bottom Sheet Content</Typography>
          <Typography variant="body1">
            You can place any content here, like forms, lists, or actions.
          </Typography>
        </Box>
      </Drawer>
    </div>
  );
}
