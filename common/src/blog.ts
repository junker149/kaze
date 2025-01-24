import zod from 'zod';

export const postBlogInput = zod.object({
    title: zod.string().min(2),
    content: zod.string().min(2),
    id: zod.number()
});

export const updateBlogInput = zod.object({
    title: zod.string().min(2).optional(),
    content: zod.string().min(2).optional()
});

export type PostBlogInput = zod.infer<typeof postBlogInput>;
export type UpdateBlogInput = zod.infer<typeof updateBlogInput>;