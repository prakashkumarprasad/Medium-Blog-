import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { getPrismaClient } from '../lib/prisma'

export const userRouter = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    JWT_SECRET : string
  }
}>()

userRouter.post('/signup', async (c) => {
    try {
        const body = await c.req.json()
        
        const email = body.email || body.username;
        const password = body.password;
        const name = body.name;
        
        if (!email || !password) {
          c.status(400)
          return c.json({
            message: "Email and password are required"
          })
        }
        
        const prisma = getPrismaClient(c.env.DATABASE_URL)
        
        const user = await prisma.user.create({
          data : {
            email : email,
            password : password,
            name : name || "Anonymous",
          }
        })
        
        const token = await sign({id: user.id}, c.env.JWT_SECRET)
        
        return c.json({
          jwt: token
        })
    } catch(e) {
      console.error('Signup error:', e)
      c.status(500)
      return c.json({
        message : "Error during signup",
        error: e instanceof Error ? e.message : 'Unknown error'
      })
    }
})

userRouter.post('/signin', async (c) => {
  try {
    const body = await c.req.json()
    
    const email = body.email || body.username;
    const password = body.password;
    
    console.log('Signin attempt for email:', email)
    
    if (!email || !password) {
      c.status(400)
      return c.json({
        message: "Email and password are required"
      })
    }
    
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    
    console.log('Prisma client created, searching for user...')
    
    const user = await prisma.user.findUnique({
      where : {
        email : email,
      }
    })
    
    if(!user) {
      c.status(403)
      return c.json({error: "user not found"})
    }
    
    console.log('User found, generating token...')
    
    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    
    return c.json({
      jwt: token
    })
  } catch(e) {
    console.error('Signin error:', e)
    c.status(500)
    return c.json({
      message : "Error during signin",
      error: e instanceof Error ? e.message : 'Unknown error',
      stack: e instanceof Error ? e.stack : undefined
    })
  }
})