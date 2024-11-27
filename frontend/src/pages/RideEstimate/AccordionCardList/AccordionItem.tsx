import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Rating } from '@mui/material';

import type { IReview } from '@/types/interfaces/ride.interface';

type AccordionItemProps = IReview

function AccordionItem({ rating, comment }: AccordionItemProps) {
  return (
    <Accordion
      sx={{
        ':hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
        transition: ' 0.6s ease'
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary" mt='3px'>Avaliação</Typography>
          <Rating value={rating} readOnly precision={0.5} />
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 0 }}>
        <Typography>{comment}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionItem;
