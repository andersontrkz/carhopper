import { useState, useEffect, type ReactNode } from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Grid2 as Grid, Paper, Typography } from '@mui/material';

import type { LatitudeLongitude } from '@/types/interfaces/ride.interface';
import CONFIG from '@/config';
import EstimateForm from './EstimateForm';

const generateMapCenter = (origin: LatitudeLongitude, destination: LatitudeLongitude) => {
  const lat = (origin.lat + destination.lat) / 2;
  const lng = (origin.lng + destination.lng) / 2;
  return { lat, lng };
};

const DEFAULT_COORDINATES = { lat: 0, lng: 0 };
const BRASIL_COORDINATES = { lat: -23.55052, lng: -46.633308 };

type EstimateMapProps = {
  children: ReactNode,
}

function EstimateMap({ children }: EstimateMapProps) {
  const [directions, setDirections] = useState<any>(null);
  const [origin, setOrigin] = useState<LatitudeLongitude | null>(null);
  const [destination, setDestination] = useState<LatitudeLongitude | null>(null);
  const [center, setCenter] = useState(BRASIL_COORDINATES);

  const handleDirectionsCallback = (e: any) => {
    if (!directions) {
      setDirections(e);
    }
  };

  useEffect(() => {
    if (directions) {
      if (origin && destination) {
        setCenter(generateMapCenter(origin, destination));
      } else {
        setCenter(origin || destination || BRASIL_COORDINATES);
      }

      setDirections(null);
    }
  }, [center, destination, origin]);

  return (
    <LoadScript googleMapsApiKey={CONFIG.GOOGLE_API_KEY} libraries={['places']}>
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
           Contrate uma viagem
          </Typography>
          <Typography noWrap>
            Encontre os motoristas disponíveis para o seu percurso. 
            Digite a localização para buscar motoristas próximos e contratar o serviço.
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          <Grid size={8}>
            <GoogleMap
              mapContainerStyle={{ height: '820px', width: '100%' }}
              center={center}
              zoom={12}
            >
              <Marker position={origin || DEFAULT_COORDINATES} label="Origem" />
              <Marker position={destination || DEFAULT_COORDINATES} label="Destino" />

              {directions && (
                <DirectionsRenderer directions={directions} />
              )}

              <DirectionsService
                options={{
                  origin: origin || DEFAULT_COORDINATES,
                  destination: destination || DEFAULT_COORDINATES,
                  travelMode: 'DRIVING' as any,
                }}
                callback={handleDirectionsCallback}
              />
            </GoogleMap>
          </Grid>

          <Grid size={4}>
            <EstimateForm setDestination={setDestination} setOrigin={setOrigin} />

            {children}
          </Grid>
        </Grid>
      </Paper>
    </LoadScript>
  );
};

export default EstimateMap;
