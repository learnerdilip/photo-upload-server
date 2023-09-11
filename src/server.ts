// import { Request, Response } from "express"
import ExpressConfig from "./server.config"

const app = ExpressConfig()
const PORT = process.env.PORT || 4000

app.use("/", () => {
  // request: Request, response: Response
  console.log("Empty request test....");
  
})

app.listen(PORT, () => console.log("Server Running on Port" + PORT))
