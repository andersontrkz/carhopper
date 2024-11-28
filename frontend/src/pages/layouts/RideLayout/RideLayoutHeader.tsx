import { AppBar, Toolbar, Typography } from '@mui/material';

function RideLayoutHeader() {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            CARHOPPER
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default RideLayoutHeader;
