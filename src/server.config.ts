import express, { Application } from "express"
import helmet from "helmet"
import morgan from "morgan"

var fs = require('fs')
var path = require('path')

const ExpressConfig = (): Application => {
  const app = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(helmet())

  var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  app.use(morgan("combined",{ stream: accessLogStream }))

  return app
}
export default ExpressConfig