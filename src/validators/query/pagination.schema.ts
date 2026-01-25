import { z } from 'zod';

export const paginationQuerySchema = z.object({
    page: z
        .string()
        .optional()
        .transform((v) => (v ? parseInt(v, 10) : 1))
        .refine((v) => v > 0, { message: 'page must be >= 1' }),

    limit: z
        .string()
        .optional()
        .transform((v) => (v ? parseInt(v, 10) : 10))
        .refine((v) => v > 0 && v <= 100, {
            message: 'limit must be between 1 and 100',
        }),
});