import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

import { formatExtendedDateTime } from '@/utils/date';
import type { IRideHistory } from '@/types/interfaces/ride.interface';

type RidesHistoryTableProps = {
  ridesHistory: IRideHistory[];
};

function RidesHistoryTable({ ridesHistory }: RidesHistoryTableProps) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('date');

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...ridesHistory].sort((a, b) => {
    let valA, valB;

    if (orderBy === 'driver') {
      valA = a.driver.name.toLowerCase();
      valB = b.driver.name.toLowerCase();
    } else if (orderBy === 'date') {
      valA = new Date(a.date).getTime();
      valB = new Date(b.date).getTime();
    } else {
      valA = a[orderBy as keyof IRideHistory] || 0;
      valB = b[orderBy as keyof IRideHistory] || 0;
    }

    if (valA < valB) {
      return order === 'asc' ? -1 : 1;
    }
    if (valA > valB) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['driver', 'date', 'origin', 'destination', 'value', 'distance', 'duration'].map((column) => (
              <TableCell key={column}>
                <TableSortLabel
                  active={orderBy === column}
                  direction={orderBy === column ? order : 'asc'}
                  onClick={() => handleRequestSort(column)}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        
        <TableBody>
          {sortedData.map((cardItem) => (
            <TableRow key={cardItem.id}>
              <TableCell>{cardItem.driver.name}</TableCell>
              <TableCell>{formatExtendedDateTime(cardItem.date)}</TableCell>
              <TableCell>{cardItem.origin}</TableCell>
              <TableCell>{cardItem.destination}</TableCell>
              <TableCell>{cardItem.value}</TableCell>
              <TableCell>{cardItem.distance}</TableCell>
              <TableCell>{cardItem.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RidesHistoryTable;
