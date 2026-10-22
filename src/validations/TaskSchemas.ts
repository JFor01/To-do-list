
import { z } from 'zod';

export const createTaskSchema = z.object({
    description: z.string().trim().min(1, 'Description is required').max(500),
    done: z.boolean().default(false),
});

export const setDoneSchema = z.object({
    done: z.boolean(),
});

export const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;