import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { ERoutes } from '@/types/enums/router.enum';

function RideLayoutHeader() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            CARHOPPER
        </Typography>
        <Button color="inherit" onClick={() => navigate(ERoutes.RIDE_HISTORY)}>
            HISTÓRICO
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default RideLayoutHeader;
