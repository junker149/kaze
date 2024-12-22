import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

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

userRouter.post('/signup', async (c) => {
    const Client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();

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

userRouter.post('/signin', async (c) => {
    const Client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
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