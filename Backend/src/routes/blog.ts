import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { postBlogInput } from '@junker149/common'
import { updateBlogInput } from '@junker149/common'

// Create a new Hono instance
const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        token: string,
        JWT: string,
        jwtToken: string
    },
    Variables: {
        userId: string
    }
}>()

// Middleware to verify the JWT token
blogRouter.use('/*', async (c, next) => {
    const jwtToken = c.req.header("Authorization");
    const token = jwtToken?.split(' ')[1];
    // @ts-ignore
    const payload = await verify(token, c.env.JWT);
    if (!payload.id) {
        c.status(403);
        return c.json({
            message: 'Forbidden'
        })
    }
    console.log(payload.id);
    // @ts-ignore
    c.set("userId", payload.id);
    await next();
})

// Create a new blog post
blogRouter.post('/blog', async (c) => {
    const Client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();

    const { success } = postBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: 'Bad Request'
        })
    }

    const userId = c.get('userId');
    try {
        const post = await Client.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorID: userId
            }
        })
        c.status(201);
        return c.json({
            message: 'Created',
            id: post.id
        })
    } catch (err) {
        console.log(err);
        c.status(500);
        return c.json({
            message: 'Internal Server Error'
        })
    }
})

// Update a blog post
blogRouter.put('/blog/:id?', async (c) => {
    const Client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: 'Bad Request'
        })
    }
    const postId = c.req.param('id');
    const userId = c.get('userId');
    try {
        const post = await Client.post.update({
            where: {
                id: postId,
                authorID: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        if (!post) {
            c.status(404);
            return c.json({
                message: 'Not Found'
            })
        }
        c.status(200);
        return c.json({
            message: 'Updated',
            id: post.id
        })
    } catch (err) {
        console.log(err);
        c.status(500);
        c.json({
            message: 'Internal Server Error'
        })
    }
})

// Get a blog post by ID
blogRouter.get('/blog/:id?', async (c) => {
    const Client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const postId = c.req.param('id');
    try {
        const post = await Client.post.findFirst({
            where: { id: postId }
        });
        console.log(post);
        if (!post) {
            c.status(404);
            return c.json({
                message: 'Not Found'
            });
        }
        c.status(200);
        return c.json({
            message: 'Fetched',
            post: post
        })
    } catch (err) {
        console.log(err);
        c.status(500);
        return c.json({
            message: 'Internal Server Error'
        });
    }
})

// Get all blog posts
blogRouter.get('/blogs', async (c) => {
    const Client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const posts = await Client.post.findMany();
        c.status(200);
        return c.json({
            message: 'Fetched',
            posts: posts
        });
    } catch (err) {
        console.log(err);
        c.status(500);
        return c.json({
            message: 'Internal Server Error'
        });
    }
})

export default blogRouter