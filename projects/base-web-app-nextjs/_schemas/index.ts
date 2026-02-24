import {
  ZInteger,
  ZString,
} from '@patson/utils/schemas/primitives';
import z from 'zod';
import { ZFilter, ZFilterConfig } from '../app/_components/Filter/_schemas';
import { ZSort } from '../app/_components/Sort/_schemas';

export const ZBase = z.object({
  _id: ZString,
});

export type TBase = z.infer<typeof ZBase>;

export const ZFindBaseParams = z.object({
  filter: ZFilter,
  filterConfigs: ZFilterConfig.array(),
  sort: ZSort,
  page: ZInteger,
  rowsPerPage: ZInteger,
});

export type TFindBaseParams = z.infer<typeof ZFindBaseParams>;
