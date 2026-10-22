import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';

export function validateBody(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error: 'Invalid request body',
                details: result.error.issues.map(i => ({
                    field: i.path.join('.'),
                    message: i.message,
                })),
            });
        }
        req.body = result.data;   // cleaned data: trimmed, with defaults applied
        next();
    };
}

export function validateParams(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({ error: 'Invalid path parameter' });
        }
        res.locals.params = result.data;   // e.g. { id: 42 } as a number
        next();
    };
}