import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

// Ye use kro toh c.env wala error chle jaega
const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()
// const app = new Hono()

app.use('/*',cors());
app.route("api/v1/user", userRouter)
app.route("api/v1/blog", blogRouter)

export default app