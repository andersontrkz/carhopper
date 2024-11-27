import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Loading from '@/components/Loading';
import RideLayoutHeader from './RideLayoutHeader';
import RideLayoutFooter from './RideLayoutFooter';
import useAppSelector from '@/hooks/useAppSelector';

function RideLayout() {
  const isLoading = useAppSelector((state) => state.rides.isLoading);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <RideLayoutHeader />

      <Box sx={{ flexGrow: 1, overflowY: 'auto', marginTop: '64px' }}>
        <Outlet />
      </Box>

      <RideLayoutFooter />

      <Loading isLoading={isLoading} />
    </Box>
  );
};

export default RideLayout;
