import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';

import { ERoutes } from '@/types/enums/router.enum';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { openModal } from '@/redux/slices/modal.slice';
import { rideConfirm } from '@/redux/slices/ride.slice';
import type { IAddresses } from '@/types/interfaces/ride.interface';

import AccordionCardList from './AccordionCardList';

function EstimateResult() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { driverOptions, ride } = useAppSelector((state) => state.rides);

  const { values } = useFormikContext<IAddresses>();

  const submitRideConfirm = async ({id, name, value}: { id: number, name: string, value: number }) => {
    try {
      const onConfirm = async () => {
        await dispatch(rideConfirm({ ...values, ...ride, value, driver: {id, name} })).unwrap();;
        navigate(ERoutes.RIDE_HISTORY);
      };
      const message = 'Você tem certeza que deseja contratar este motorista?';
      dispatch(openModal({ message, onConfirm }));
    } catch (error) {
      console.error('Falha ao confirmar a viagem:', error);
    }
  };
  
  return <AccordionCardList cardList={driverOptions} onClick={submitRideConfirm} />;
};

export default EstimateResult;
