import { Box, Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import AccordionItem from './AccordionItem';
import AccordionCard from './AccordionCard';

type AccordionCardItemProps = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: { rating: number, comment: string };
  value: number;
}

type AccordionCardListProps = {
  cardList: AccordionCardItemProps[]
  onClick: ({ id, name }: AccordionCardItemProps) => Promise<void>;
}

const sx = {
  overflow: 'auto',
  mt: 2,
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '10px',
    transition: 'background-color 0.3s',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
  },
};

function AccordionCardList({ cardList, onClick }: AccordionCardListProps) {
  return (
    <Box maxHeight="620px" sx={sx}>
      {cardList.map(({ id, name, description, vehicle, review, value }) => (
        <Box key={id} boxShadow={2} my={4} borderRadius={2} display="flex" flexDirection="column" height="auto">
          <AccordionCard id={id} name={name} description={description} vehicle={vehicle} value={value} />

          <Button
            startIcon={<ChevronRight sx={{ fontSize: '8px' }} />}
            onClick={() => onClick({ id, name, description, vehicle, review, value })}
            variant='contained'>
              Escolher
          </Button>

          <AccordionItem rating={review?.rating} comment={review?.comment} />
        </Box>
      ))}
    </Box>
  );
}

export default AccordionCardList;
