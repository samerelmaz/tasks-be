import Task, { ITask } from "../../database/models/task.model";
import { ITaskService } from "./task.service.interface";

export class TaskService implements ITaskService {
  async createTask(taskData: Partial<ITask>): Promise<ITask> {
    const task = new Task(taskData);
    return await task.save();
  }

  async getAllTasks(filter?: "pending" | "completed"): Promise<ITask[]> {
    if (filter === "pending") {
      return await Task.find({ completed: false });
    } else if (filter === "completed") {
      return await Task.find({ completed: true });
    }
    return await Task.find();
  }

  async getTaskById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  async updateTask(
    id: string,
    taskData: Partial<ITask>
  ): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, taskData, { new: true });
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await Task.findByIdAndDelete(id);
    return !!result;
  }
}
