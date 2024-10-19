import express from "express";
import { authRoutes } from "./routes/auth-route";
import { TestUserRepository } from "@/tests/mocks/user-repository";
import { AuthService } from "@/application/services/auth-service";
import { EnvConfiguration } from "@/infrastructure/config/env";
import { handleError } from "./middlewares/error";

export const app = express();

const configuration = new EnvConfiguration()

// TODO: TestUserRepository is a mock
const userRepository = new TestUserRepository()
const authService = new AuthService(configuration, userRepository)

app.use(express.json())

app.use("/auth", authRoutes(authService, userRepository))

app.use(handleError)
