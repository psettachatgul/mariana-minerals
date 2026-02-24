'use client';

import SortIcon from '@mui/icons-material/Sort';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import locale from '../../../_locale/en-US';
import SortComponent from '../Sort';
import { TSort } from '../Sort/_schemas';
import { SortConfig } from '../Sort/types';

interface SortDialogProps {
  onClose: () => void;
  onChange: (sorts: TSort) => void;
  sortConfigs: SortConfig[];
  currentSort: TSort;
}

const SortDialog = ({
  onClose,
  onChange,
  sortConfigs,
  currentSort,
}: SortDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{locale.sortDialog.title}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <SortComponent
            sortConfigs={sortConfigs}
            onChange={onChange}
            currentSort={currentSort}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {locale.sortDialog.ok}
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton onClick={() => setOpen(true)}>
        <SortIcon />
      </IconButton>
    </>
  );
};

export default SortDialog;
