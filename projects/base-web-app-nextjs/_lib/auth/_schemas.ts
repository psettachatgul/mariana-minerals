import z from 'zod';
import { ZBase } from '../../_schemas';

export const ZAuthUser = ZBase
  .extend({
    email: z.email(),
  });

export type TAuthUser = z.infer<typeof ZAuthUser>;
