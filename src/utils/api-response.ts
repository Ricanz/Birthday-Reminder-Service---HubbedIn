import { Response } from 'express';

export class APIResponse {
    static success<T>(
        res: Response,
        data?: T,
        message = 'Success',
        code = 200
    ) {
        return res.status(code).json({
            code,
            success: true,
            message,
            data,
        });
    }

    static badRequest(
        res: Response,
        message = 'Bad request',
        errors?: any
    ) {
        return res.status(400).json({
            code: 400,
            success: false,
            message,
            errors,
        });
    }

    static notFound(res: Response, message = 'Not found') {
        return res.status(404).json({
            code: 404,
            success: false,
            message,
        });
    }

    static conflict(res: Response, message = 'Conflict') {
        return res.status(409).json({
            code: 409,
            success: false,
            message,
        });
    }

    static internalError(res: Response, message = 'Internal server error') {
        return res.status(500).json({
            code: 500,
            success: false,
            message,
        });
    }
}