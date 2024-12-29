import { ITask } from "../../database/models/task.model";

export interface ITaskService {
  createTask(taskData: Partial<ITask>): Promise<ITask>;
  getAllTasks(filter?: "pending" | "completed"): Promise<ITask[]>;
  getTaskById(id: string): Promise<ITask | null>;
  updateTask(id: string, taskData: Partial<ITask>): Promise<ITask | null>;
  deleteTask(id: string): Promise<boolean>;
}
