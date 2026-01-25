import { z } from 'zod';
import { objectIdSchema } from '../primitives/object-id.schema';

export const idParamSchema = z.object({
    id: objectIdSchema,
});