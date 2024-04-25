import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@tanishrathore/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables:{
        userId: string
    }
}>();


// Middleware
blogRouter.use('/*', async (c, next) => {
    // Extract userid and pass it down to route handler

    // Get the header
    // Verify the header
    // If the header is correct, we can proceed
    // If not, we return the user a 403 status code
    const authHeader = c.req.header("authorization") || "";
    // const token = authHeader.split(" ")[1] || ""
  
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
  
        if(user){
            c.set("userId",user.id);
            await next();
        }else{
            c.status(403)
            return c.json({error: "Unauthorized"})
        }
    } catch (e) {
        c.status(403)
        return c.json({error: "Unauthorized"})
    }
})

// Post a blog
blogRouter.post('/',async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            Message: "Input incorrect"
        })
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    
    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId 
        }
    })

    return c.json({
        id: blog.id
    })
})

// Update a blog
blogRouter.put('/',async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            Message: "Input incorrect"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    
    const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })
})

// Get all blogs
// Todo: Add Pagination
blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id: true,
            author:{
                select:{
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

// Get specific blog with id
blogRouter.get('/:id',async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    
    try{
        const blog = await prisma.post.findFirst({
            where:{
                id: id
            },
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            blog
        })
    }catch(e){
        c.status(411)
        return c.json({
            Message: "Error while fetching blog post"
        }) 
    }
})