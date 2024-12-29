import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import taskRoutes from "./routes/task.route";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";
import "dotenv/config";

const app = express();

const corsOptions = {
  origin: "*",
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api", taskRoutes);

// Swagger documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use(errorHandler);

export default app;
