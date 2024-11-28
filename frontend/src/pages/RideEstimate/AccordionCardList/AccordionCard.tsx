import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { formatCurrency } from '@/utils/converters';

type AccordionCardProps = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  value: number;
}

function stringAvatar(name: string) {
  const splitName = name.split(' ');
  const initials = splitName.length > 1
    ? `${splitName[0][0]}${splitName[1][0]}`
    : `${splitName[0][0]}`;

  return {
    children: initials,
    sx: {
      bgcolor: 'text.primary',
      width: 40,
      height: 40,
      fontSize: 16,
    },
  };
}

function AccordionCard({ name, description, vehicle, value }: AccordionCardProps) {
  return (

    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar {...stringAvatar(name)} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Box display="flex" flexDirection="column">
            <Typography fontWeight={600} component="span" variant="body2" sx={{ color: 'text.primary' }}>
              {formatCurrency(value)} - {vehicle}
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.primary' }}>
              {description}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
}

export default AccordionCard;
