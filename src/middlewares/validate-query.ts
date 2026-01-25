import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { APIResponse } from '../utils/api-response';

export const validateQuery =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            const parsed = schema.safeParse(req.query);

            if (!parsed.success) {
                return APIResponse.badRequest(
                    res,
                    'Invalid query parameters',
                    parsed.error.flatten()
                );
            }

            req.validatedQuery = parsed.data;
            next();
        };