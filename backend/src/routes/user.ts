import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from "@tanishrathore/medium-common";

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>();

// Signup
userRouter.post('/signup',async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            Message: "Input incorrect"
        })
    }
    const prisma = new PrismaClient({
      // iss command se just niche wali line ka ts error ignore ho jaega
      // @ts-ignore ------> NO NEED AS WE DECLARED ABOVE
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
  
    // Zod and hashed password 
    try {
      const user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password,
          name: body.name
        }
      })
  
      const token = await sign({id:user.id}, c.env.JWT_SECRET);
      
      return c.json({
        jwt: token
      })
  
    } catch (error) {
      c.status(411)
      return c.text('Invalid')
    }
  
    
  })
  
  // Signin
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            Message: "Input incorrect"
        })
    }
    
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password
        }
      });
    
      if (!user) {
        c.status(403); // Unauthorized
        return c.json({ error: "Incorrect creds" });
      }
    
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  
      return c.json({ jwt , msg: "Signup Successful" });
  
    } catch (e) {
      c.status(411)
      return c.text('Invalid')
    }
      
  })