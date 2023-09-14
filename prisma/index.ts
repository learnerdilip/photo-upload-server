import { Image, PrismaClient } from '@prisma/client'

export class PrismaService {
  private prisma = new PrismaClient()

  constructor() {}

  async save(params: Omit<Image, "id">) {
   try {
     const fileData = await this.prisma.image.create({data: params}) 
     return fileData    
   } catch (error) {
     console.error(error)
     return false
   }
  }
  
  async getPaginatedItems(page: number = 0, pageSize : number = 9) {
   try {
     const fileData = await this.prisma.image.findMany({skip: pageSize * page, take: pageSize}) 
     return fileData
   } catch (error) {
     console.error(error)
     return false
   }
  }
}

