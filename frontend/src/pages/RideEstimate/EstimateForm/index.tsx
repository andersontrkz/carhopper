import { useFormikContext } from 'formik';
import { SearchSharp } from '@mui/icons-material';
import { Box, Button, Paper, Stack } from '@mui/material';

import useAppSelector from '@/hooks/useAppSelector';
import type { IRideEstimate, LatitudeLongitude } from '@/types/interfaces/ride.interface';

import EstimateAutocomplete from './EstimateAutocomplete';

type EstimateFormProps = {
  setDestination: React.Dispatch<React.SetStateAction<LatitudeLongitude | null>>,
  setOrigin: React.Dispatch<React.SetStateAction<LatitudeLongitude | null>>,
}

function EstimateForm({ setDestination, setOrigin }: EstimateFormProps) {
  const { isLoading } = useAppSelector((state) => state.rides);
  const { handleSubmit, isValid } = useFormikContext<IRideEstimate>();

  return (
    <Box sx={{ width: '100p%', backfround: 'red' }}>
      <Paper sx={{ p: 2, width: '100%' }}>
        <Stack spacing={1.5}>
          <EstimateAutocomplete setCoordinate={setOrigin} placeholder={'Origem'} field={'origin'} />

          <EstimateAutocomplete setCoordinate={setDestination} placeholder={'Destino'} field={'destination'} />

          <Button
            startIcon={<SearchSharp sx={{ fontSize: '8px' }} />}
            onClick={() => handleSubmit()}
            disabled={isLoading || !isValid}
            variant="contained" fullWidth
          >
              Buscar
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EstimateForm;
