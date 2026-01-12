import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { createBlog, updateBlog } from '@prakash1414/medium-common'
import { getPrismaClient } from '../lib/prisma'

export const blogRouter = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    JWT_SECRET : string
  },
  Variables : {
    userId : string
  }
}>()

blogRouter.use('/*',async (c,next) => {
  const authHeader = c.req.header("authorization") || ""
  const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader
  
  try {
    const user = await verify(token, c.env.JWT_SECRET)
    if(user){
      c.set("userId", String(user.id))
      await next();
    } else {
      c.status(403)
      return c.json({
        message : "you are not logged in"
      })
    }
  } catch(e) {
    c.status(403)
    return c.json({
      message : "you are not logged in"
    })
  }
})

blogRouter.post('/',async (c)=>{
  const prisma = getPrismaClient(c.env.DATABASE_URL)

  const body = await c.req.json()
  const {success} = createBlog.safeParse(body)
  if(!success){
    c.status(411)
    return c.text("Invalid input. Title and content are required.")
  }
  const authorId = c.get("userId");
  const blog = await prisma.posts.create({
    data : {
      title : body.title,
      content : body.content,
      authorId : authorId
    }
  })
  return c.json({
    id : blog.id
  })
})

blogRouter.put('/',async (c)=>{
  const prisma = getPrismaClient(c.env.DATABASE_URL)

  const body = await c.req.json()
  const {success} = updateBlog.safeParse(body)
  if(!success){
    c.status(411)
    return c.text("Invalid input. ID, title and content are required.")
  }
  const blog = await prisma.posts.update({
    where : {
      id : body.id
    },
    data : {
      title : body.title,
      content : body.content,
    }
  })
  return c.json({
    id : blog.id
  })
})

blogRouter.get('/bulk',async (c)=>{
  const prisma = getPrismaClient(c.env.DATABASE_URL)
  
  const blogs = await prisma.posts.findMany({
    select : {
      content: true,
      title: true,
      id: true,
      author: {
        select : {
          name : true
        }
      }
    }
  })
  return c.json({
    blogs
  })
})

blogRouter.get('/:id',async (c)=>{
  const prisma = getPrismaClient(c.env.DATABASE_URL)

  try {
    const id = c.req.param("id")
    const blog = await prisma.posts.findFirst({
      where : {
        id : id
      },
      select : {
        id: true,
        title: true,
        content: true,
        author: {
          select : {
            name : true
          }
        }
      }
    })
    return c.json({
      blog
    })
  } catch(e) {
    c.status(411)
    return c.json({
      message: "error"
    })
  }
})