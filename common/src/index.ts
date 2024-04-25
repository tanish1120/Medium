import z, { string } from 'zod';

// Signup
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

// Signin
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

// Creating a Blog
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

// Updating a Blog
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})


// Type inference in zod
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>