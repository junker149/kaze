import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput } from '@junker149/common'
import { signinInput } from '@junker149/common'

// Create a new Hono instance
const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        token: string,
        JWT: string,
        jwt: string
    },
    Variables: {
        userId: string
    }
}>()

// Create a new user
userRouter.post('/signup', async (c) => {
    const Client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const body = await c.req.json();
        const { success } = signupInput.safeParse(body)
        if (!success) {
            c.status(400);
            return c.json({
                message: 'Bad Request'
            })
        }
        const user = await Client.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT);
        c.status(201);
        return c.json({
            message: 'Created',
            token: token
        })
    } catch (err) {
        console.log(err);
        c.status(500);
        return c.json({
            message: 'Internal Server Error'
        })
    }
})

// Sign in a user
userRouter.post('/signin', async (c) => {
    const Client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { success } = signinInput.safeParse(body)
        if (!success) {
            c.status(400);
            return c.json({
                message: 'Bad Request'
            })
        }
        const user = await Client.user.findUnique({
            where: { email: body.email }
        })

        // User not found
        if (!user) {
            c.status(403);
            return c.json({
                message: 'Forbidden'
            });
        }

        const token = await sign({ id: user.id }, c.env.JWT);

        c.status(200);
        return c.json({
            message: 'OK',
            token: token
        })
    } catch (err) {
        console.log(err);
        c.status(500);
        return c.json({
            message: "Internal Server Error"
        })
    }
})



export default userRouter