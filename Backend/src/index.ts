import { Hono } from 'hono'
import userRouter from './routes/user';
import blogRouter from './routes/blog';
import { cors } from 'hono/cors';

// Create a new Hono instance
const app = new Hono<{
  Bindings: {
      DATABASE_URL: string,
      token: string
  }
}>();

// Cross-Origin Resource Sharing Middleware
app.use(cors());

// Landing page
app.get('/', (c) => {
  return c.text('Hello Kaze!')
})

// Routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app