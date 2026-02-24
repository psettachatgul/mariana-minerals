'use client';

import {
  Table as MuiTable,
  Paper,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import get from 'lodash/get';
import locale from '../../../_locale/en-US';
import { ColConfig } from './types';

interface TableProps<T> {
  columns: ColConfig<T>[];
  data: T[];
  isLoading?: boolean;
}

const SKELETON_ROWS = 5;

const Table = <T extends object>({
  columns,
  data,
  isLoading = false,
}: TableProps<T>) => {

  const theme = useTheme();

  if (isLoading) {
    return (
      <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.key)} align={col.align || 'left'}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={`${rowIndex}-${String(col.key)}`} align={col.align || 'left'}>
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow sx={{
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5',
          }}
          >
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                align={col.align || 'left'}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                {locale.table.noDataAvailable}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
                  },
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                {columns.map((col) => {
                  const value = get(row, col.key);
                  const content = col.render
                    ? col.render(value, row, rowIndex)
                    : String(value);

                  return (
                    <TableCell
                      key={`${rowIndex}-${String(col.key)}`}
                      align={col.align || 'left'}
                    >
                      {content}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
