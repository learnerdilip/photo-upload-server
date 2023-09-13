import express, { Application } from "express"
import helmet from "helmet"
import morgan from "morgan"

import fs from 'fs'
import path from 'path'

const ExpressConfig = (): Application => {
  const app = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(helmet())

  var accessLogStream = fs.createWriteStream(path.join(path.resolve(), 'access.log'), { flags: 'a' })
  app.use(morgan("combined",{ stream: accessLogStream }))

  return app
}

export default ExpressConfig