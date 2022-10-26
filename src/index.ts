import express from "express";
import swaggerUI from 'swagger-ui-express'

import swaggerFile from './swagger.json'
import { usersRoutes } from "./routes/users.routes";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

export { app };
