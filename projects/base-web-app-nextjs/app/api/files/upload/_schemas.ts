import { ZString } from '@/projects/utils/schemas/primitives';
import z from 'zod';

export const ZUploadFileParams = z.object({
  fileName: ZString,
});

export type TUploadFileParams = z.infer<typeof ZUploadFileParams>;
