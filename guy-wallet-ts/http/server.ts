import express from "express"
import morgan from "morgan"
import cors from "cors"
import { handleError } from "./middlewares/error"
import { createRoutes } from "./routes"

export const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))

app.use("/api/v0", createRoutes())

app.use(handleError)
