import { Request, Response } from 'express';
import { UserService } from './user.service';
import { createUserSchema, updateUserSchema } from './user.validator';
import { APIResponse } from '../../utils/api-response';

export class UserController {
    static async create(req: Request, res: Response, next: any) {
        const parsed = createUserSchema.safeParse(req.body);

        if (!parsed.success) {
            return APIResponse.badRequest(
                res,
                'Validation error',
                parsed.error.flatten()
            );
        }

        try {
            const user = await UserService.create(parsed.data);
            return APIResponse.success(res, user, 'User created', 201);
        } catch (err: any) {
            if (err.code === 11000) {
                return APIResponse.conflict(res, 'Email already exists');
            }
            return next(err);
        }
    }

    static async getById(req: Request, res: Response) {
        const user = await UserService.getById(req.params.id as string);
        if (!user) return APIResponse.notFound(res, 'User not found');

        return APIResponse.success(res, user);
    }

    static async getAll(req: Request, res: Response) {
        const { page, limit } = req.validatedQuery as {
            page: number;
            limit: number;
        };

        const result = await UserService.getAll(page, limit);
        return APIResponse.success(res, result);
    }

    static async update(req: Request, res: Response, next: any) {
        const parsed = updateUserSchema.safeParse(req.body);

        if (!parsed.success) {
            return APIResponse.badRequest(
                res,
                'Validation error',
                parsed.error.flatten()
            );
        }

        try {
            const user = await UserService.update(req.params.id as string, parsed.data);

            if (!user) {
                return APIResponse.notFound(res, 'User not found');
            }

            return APIResponse.success(res, user, 'User updated');
        } catch (err: any) {
            if (err.code === 11000) {
                return APIResponse.conflict(res, 'Email already exists');
            }

            return next(err);
        }
    }

    static async delete(req: Request, res: Response) {
        await UserService.delete(req.params.id as string);
        return res.status(204).send();
    }
}