import zod from 'zod';

export const signupInput = zod.object({
    name: zod.string().min(2),
    email: zod.string().email(),
    password: zod.string().min(8)
});

export const signinInput = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
})

export type SignupInput = zod.infer<typeof signupInput>;
export type SigninInput = zod.infer<typeof signinInput>;