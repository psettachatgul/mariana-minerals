import { ZString } from '@patson/utils/schemas/primitives';
import z from 'zod';

export const ZFilterConfigOption = z.object({
  label: ZString,
  value: z.union([
    z.string(),
    z.number(),
    z.undefined(),
  ]),
});

export type TFilterConfigOption = z.infer<typeof ZFilterConfigOption>;

export const ZFilterConfig = z.object({
  key: ZString,
  label: z.string().optional(),
  filterType: z.union([
    z.literal('string'),
    z.literal('select'),
    z.literal('date'),
    z.literal('number'),
  ]),
  options: ZFilterConfigOption.array().optional(),
});

export type TFilterConfig = z.infer<typeof ZFilterConfig>;

export const ZFilter = z.object({
  all: z.boolean().default(true),
  criteria: z.tuple([ZString, z.unknown(), z.boolean().default(false)]).array(),
});

export type TFilter = z.infer<typeof ZFilter>;
