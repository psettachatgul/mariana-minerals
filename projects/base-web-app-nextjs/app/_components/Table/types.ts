import { TableCellProps } from '@mui/material';
import { Flatten } from '@patson/utils/types';

export type ColConfig<T, K extends keyof Flatten<T> = keyof Flatten<T>> = {
  key: K | '__custom__';
  label: string;
  align?: TableCellProps['align'];
  render?: (value: Flatten<T>[K], record: T, rowIndex?: number) => React.ReactNode;
};
