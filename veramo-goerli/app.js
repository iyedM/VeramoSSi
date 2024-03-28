import express, { json, urlencoded } from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"

import initializeVeramo from "./veramo/veramoSetup"
import indexRouter from "./routes/index"
import veramoRouter from "./routes/veramo"

const app = express()
const agent = initializeVeramo()

app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/", indexRouter)
app.use("/veramo", veramoRouter)

export default app
