import { Router } from "express";
import { body, query } from "express-validator";
import { TaskController } from "../controllers/tasks/task.controller";
import { TaskService } from "../services/tasks/task.service";

const router = Router();
const taskController = new TaskController(new TaskService());

router.post(
  "/tasks",
  [body("title").notEmpty().withMessage("Title is required")],
  taskController.createTask
);

router.get(
  "/tasks",
  [
    query("status")
      .optional()
      .isIn(["pending", "completed"])
      .withMessage("Invalid status"),
  ],
  taskController.getAllTasks
);

router.get("/tasks/:id", taskController.getTaskById);

router.put(
  "/tasks/:id",
  [
    body("title").optional().notEmpty().withMessage("Title must not be empty"),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean"),
  ],
  taskController.updateTask
);

router.delete("/tasks/:id", taskController.deleteTask);

export default router;
