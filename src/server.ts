import {  Response } from "express"
import multer from "multer"
import ExpressConfig from "./server.config.js"
import s3Service from "./aws/s3.service.js"
import { PrismaService } from "../prisma/index.js"

const app = ExpressConfig()
const PORT = process.env.PORT || 4000
const PAGE_SIZE = parseInt(process.env.PAGE_SIZE as string)

const upload = multer({})

app.get("/",(_, response: Response) => {
  response.status(200).send({message: "This is the home page!", port: process.env.PORT, PAGESIZE: process.env.PAGE_SIZE, DATABASE_URL: process.env.DATABASE_URL})
})

app.post("/image", upload.single('file'),async (request: any, response: Response) => {  
  try {   
    const {buffer, ...fileMetaData} = request.file

    const uploadedFileUrl = await (new s3Service()).uploadFile(request.file)

    const fileData = {fileUrl: uploadedFileUrl, ...fileMetaData} 
    const savedFile = await new PrismaService().save(fileData)
  
    response.send(savedFile)
  } catch (error) {
    throw new Error("server error, could not upload the image")
  }
})

app.get("/images",async (request: any, response: Response) => {
  try {    
    const { page }= request.query
    const fileList = await  new PrismaService().getPaginatedItems(page, PAGE_SIZE)  
    
    response.send(fileList)
  } catch (error) {
    throw new Error("server error, could not get Images")
  }
})

app.listen(PORT, () => console.log("Server Running on Port" + PORT))
