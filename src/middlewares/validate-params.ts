import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { APIResponse } from '../utils/api-response';

export const validateParams =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            const parsed = schema.safeParse(req.params);

            if (!parsed.success) {
                return APIResponse.badRequest(
                    res,
                    'Invalid request parameters',
                    parsed.error.flatten()
                );
            }

            next();
        };