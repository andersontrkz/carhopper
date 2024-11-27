
import { useEffect } from 'react';
import { Paper, Typography } from '@mui/material';

import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { ridesHistory } from '@/redux/slices/ride.slice';

import RidesHistoryTable from './RidesHistoryTable';

function RideHistory() {
  const dispatch = useAppDispatch();
  const { ridesHistory: rides } = useAppSelector((state) => state.rides);

  useEffect(() => {
    dispatch(ridesHistory());
  }, []);

  return (
  
    <Paper sx={{ p: 4, width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: 'primary.main',
          marginBottom: '16px',
          color: '#fff'
        }}>
        <Typography variant="h4" component="h1" fontWeight={500} >
           Histórico de viagens
        </Typography>
        <Typography >
            Visualiza o histórico de corridas que você contratou.
        </Typography>
      </Paper>
      
      <RidesHistoryTable ridesHistory={rides} />
    </Paper>

  );
};

export default RideHistory;
