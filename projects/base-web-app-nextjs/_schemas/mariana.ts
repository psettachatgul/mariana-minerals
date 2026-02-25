import { ZDate } from '@patson/utils/schemas/primitives';
import { z } from 'zod';

export const ZProject = z
  .object({
    id: z.number().int(),
    name: z.string(),
    taskCount: z.number().int(),
    earliestStartDate: ZDate.nullish(),
    latestEndDate: ZDate.nullish(),
    durationDays: z.number().int().nullish(),
  })
  .loose();

export type TProject = z.infer<typeof ZProject>;

export const Error = z.object({ error: z.string() }).partial().passthrough();

export const ZTask = z
  .object({
    id: z.number().int(),
    projectId: z.number().int(),
    name: z.string(),
    status: z.enum(['planned', 'in progress', 'completed', 'cancelled']),
    parentTaskId: z.number().int().nullish(),
    dependsOn: z.array(z.number().int()),
    startDate: ZDate.nullish(),
    dueDate: ZDate.nullish(),
  })
  .loose();

export type TTask = z.infer<typeof ZTask>;
