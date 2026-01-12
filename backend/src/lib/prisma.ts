import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export function getPrismaClient(databaseUrl: string) {
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate())
  
  return prisma
}