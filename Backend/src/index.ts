import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
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


app.use('/api/v1/blog/*', async (c, next) => {
  const jwt = c.req.header("authorization");
  const token = jwt?.split(' ')[1];
  console.log(token);
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


app.get('/', (c) => {
  return c.text('Hello Kaze!')
})

app.post('/api/v1/user/signup', async (c) => {
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

app.post('/api/v1/user/signin', async (c) => {
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

app.post('/api/v1/blog', async (c) => {
  const Client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();
  const userId = c.get('userId');
  try{
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
    })
  }catch(err){
    console.log(err);
    c.status(500);
    return c.json({
      message: 'Internal Server Error'
    })
  }
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Kaze! Update Blog')
})

app.get('/api/v1/blog/:id?', (c) => {
  return c.text('Hello Kaze! Get single Blog')
})

app.get('/api/v1/blogs', (c) => {
  return c.text('Hello Kaze! Get all Blog')
})

export default app
