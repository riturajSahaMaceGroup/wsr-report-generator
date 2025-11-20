import React, { useState } from 'react';
import { Drawer, Button, Box, Typography, FormControlLabel, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../applicationStore/formSlice';
import FullDataForm from './FullDataForm';
import { WSR_VIEW } from '../assets/Constants';
import { toggleView } from '../applicationStore/viewControllerSlice';

export default function BottomSheetModal() {
  //   const [open, setOpen] = useState(false);
  const open = useSelector((state) => state.mForm.formVisibility);
  const dispatch = useDispatch()
  const toggleDrawer = (newOpen) => () => {
    dispatch(toggleForm());
  };
  const showView = useSelector((state) => state.viewController.show)

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer(true)} sx={{ marginTop: "10px" }}>
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
            maxHeight: "60vh"
          },
        }}
      >
        <Box role="presentation">
          <FullDataForm />
          {/* <div> */}
            <FormControlLabel control={<Switch />} label={showView} onChange={() => {
              dispatch(toggleView());
            }} sx={{
              position:"absolute",
              top:"10px",
              right:"50px"
            }} />
          {/* </div> */}
        </Box>
      </Drawer>
    </div>
  );
}
