import { Box, Typography } from '@mui/material';

function RideLayoutFooter() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        padding: 4,
        zIndex: 1,
      }}
    >
      <Typography variant="body2">© 2024 CARHOPPER. Todos os direitos reservados.</Typography>
    </Box>
  );
};

export default RideLayoutFooter;
