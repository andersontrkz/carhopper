import { useFormikContext } from 'formik';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import type { IAddresses, LatitudeLongitude } from '@/types/interfaces/ride.interface';
import CONFIG from '@/config';

type EstimateAutocompleteProps = {
    setCoordinate: React.Dispatch<React.SetStateAction<LatitudeLongitude | null>>,
    placeholder: string,
    field: keyof IAddresses,
}

function EstimateAutocomplete({ setCoordinate, placeholder, field }: EstimateAutocompleteProps) {
  const { setFieldValue, values } = useFormikContext<IAddresses>();

  const getCoordinates = async (address: string) => {
    const results = await geocodeByAddress(address);
    const { lat, lng } = await getLatLng(results[0]);

    return { lat, lng };
  };

  const handleSelect = async (address: string, setCallback: (coordinates: LatitudeLongitude) => void) => {
    const { lat, lng } = await getCoordinates(address);

    setCallback({ lat, lng });
  };

  return (
    <PlacesAutocomplete
      apiKey={CONFIG.GOOGLE_API_KEY}
      selectProps={{
        loadingMessage: () => 'Carregando...',
        noOptionsMessage: () => 'Digite para encontrar um endereço',
        placeholder,
        value: values[field] ? { value: values[field], label: values[field] } : undefined,
        onChange: (e: any) => {
          if (e) {
            setFieldValue(field, e.label);
            handleSelect(e.label, setCoordinate);
          }
        },
      }}
    />

  );
};

export default EstimateAutocomplete;
