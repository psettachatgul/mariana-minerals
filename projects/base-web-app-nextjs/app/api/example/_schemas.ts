import { ZNumber } from '@/projects/utils/schemas/primitives';
import z from 'zod';

export const ZExampleParams = z.object({
  param1: ZNumber,
});

export type TExampleParams = z.infer<typeof ZExampleParams>;
