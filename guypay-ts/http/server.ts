import express from "express";
import { handleError } from "./middlewares/error";
import { createRoute as createRoutes } from "./routes";

export const app = express();

app.use(express.json())

app.use("/v0", createRoutes())

app.use(handleError)
