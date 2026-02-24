'use client';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import locale from '../../../_locale/en-US';
import { TSort } from './_schemas';
import SortCriteria from './SortCriteria';
import { SortConfig } from './types';
import { useSort } from './useSort';


interface SortComponentProps {
  sortConfigs: SortConfig[];
  onChange: (sorts: TSort) => void;
  currentSort: TSort;
}

export default function SortComponent({
  sortConfigs,
  onChange,
  currentSort,
}: SortComponentProps) {

  const {
    theme,
    sortInstances,
    handleAddSort,
    handleRemoveSort,
    handleSortChange,
  } = useSort({ onChange, currentSort });

  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Sort List */}
        <Stack spacing={2}>
          {sortInstances.map((instance) => (
            <Box
              key={instance.id}
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                p: 2,
                backgroundColor: theme.palette.background.default,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <SortCriteria
                  sortConfigs={sortConfigs}
                  onChange={(sort) => handleSortChange(instance.id, sort)}
                  currentSortInstance={instance}
                />
              </Box>
              <IconButton
                size="small"
                onClick={() => handleRemoveSort(instance.id)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>

        {/* Add Button */}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddSort}
          fullWidth
        >
          {locale.sort.addSort}
        </Button>
      </Box>
    </Paper>
  );
}
