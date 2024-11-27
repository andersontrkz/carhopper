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

function AccordionCardList({ cardList, onClick }: AccordionCardListProps) {
  return (
    <Box>
      {cardList.map(({ id, name, description, vehicle, review, value }) => (
        <Box key={id} boxShadow={2} my={4} borderRadius={2} display="flex" flexDirection="column" height="auto">
          <AccordionCard id={id} name={name} description={description} vehicle={vehicle} value={value} />

          <Button
            startIcon={<ChevronRight sx={{ fontSize: '8px' }} />}
            onClick={() => onClick({ id, name, description, vehicle, review, value })}
            variant='contained'>
              Contratar
          </Button>

          <AccordionItem rating={review.rating} comment={review.comment} />
        </Box>
      ))}
    </Box>
  );
}

export default AccordionCardList;
