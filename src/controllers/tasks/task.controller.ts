import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ITaskService } from "../../services/tasks/task.service.interface";

export class TaskController {
  private taskService: ITaskService;

  constructor(taskService: ITaskService) {
    this.taskService = taskService;
  }

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await this.taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.query;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const tasks = await this.taskService.getAllTasks(
        status as "pending" | "completed"
      );
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.getTaskById(req.params.id);

      if (!task) {
        return res.status(404).json({ errors: ["Task not found"] });
      }

      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await this.taskService.updateTask(req.params.id, req.body);

      if (!task) {
        return res.status(404).json({ errors: ["Task not found"] });
      }

      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.taskService.deleteTask(req.params.id);

      if (!result) {
        return res.status(404).json({ errors: ["Task not found"] });
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
