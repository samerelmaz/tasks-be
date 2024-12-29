import { TaskService } from "../../services/tasks/task.service";
import Task from "../../database/models/task.model";

jest.mock("../../database/models/task.model");

describe("TaskService", () => {
  let taskService: TaskService;
  const MockTask = Task as jest.MockedClass<typeof Task>;

  beforeEach(() => {
    taskService = new TaskService();
    MockTask.mockClear();
  });

  describe("createTask", () => {
    it("should create a new task", async () => {
      const mockTask = { title: "Test Task" };
      const saveSpy = jest.fn().mockResolvedValue(mockTask);
      MockTask.mockImplementation(() => ({ save: saveSpy } as any));

      const result = await taskService.createTask(mockTask);

      expect(MockTask).toHaveBeenCalledWith(mockTask);
      expect(saveSpy).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });

  describe("getAllTasks", () => {
    it("should return all tasks when no filter is provided", async () => {
      const mockTasks = [{ title: "Task 1" }, { title: "Task 2" }];
      MockTask.find = jest.fn().mockResolvedValue(mockTasks);

      const result = await taskService.getAllTasks();

      expect(MockTask.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockTasks);
    });

    it('should return pending tasks when filter is "pending"', async () => {
      const mockTasks = [{ title: "Task 1", completed: false }];
      MockTask.find = jest.fn().mockResolvedValue(mockTasks);

      const result = await taskService.getAllTasks("pending");

      expect(MockTask.find).toHaveBeenCalledWith({ completed: false });
      expect(result).toEqual(mockTasks);
    });

    it('should return completed tasks when filter is "completed"', async () => {
      const mockTasks = [{ title: "Task 1", completed: true }];
      MockTask.find = jest.fn().mockResolvedValue(mockTasks);

      const result = await taskService.getAllTasks("completed");

      expect(MockTask.find).toHaveBeenCalledWith({ completed: true });
      expect(result).toEqual(mockTasks);
    });
  });

  describe("getTaskById", () => {
    it("should return a task by id", async () => {
      const mockTask = { id: "1", title: "Test Task" };
      MockTask.findById = jest.fn().mockResolvedValue(mockTask);

      const result = await taskService.getTaskById("1");

      expect(MockTask.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockTask);
    });

    it("should return null if task is not found", async () => {
      MockTask.findById = jest.fn().mockResolvedValue(null);

      const result = await taskService.getTaskById("1");

      expect(MockTask.findById).toHaveBeenCalledWith("1");
      expect(result).toBeNull();
    });
  });

  describe("updateTask", () => {
    it("should update and return the task", async () => {
      const mockTask = { id: "1", title: "Updated Task" };
      MockTask.findByIdAndUpdate = jest.fn().mockResolvedValue(mockTask);

      const result = await taskService.updateTask("1", {
        title: "Updated Task",
      });

      expect(MockTask.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { title: "Updated Task" },
        { new: true }
      );
      expect(result).toEqual(mockTask);
    });

    it("should return null if task is not found", async () => {
      MockTask.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const result = await taskService.updateTask("1", {
        title: "Updated Task",
      });

      expect(MockTask.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { title: "Updated Task" },
        { new: true }
      );
      expect(result).toBeNull();
    });
  });

  describe("deleteTask", () => {
    it("should delete the task and return true", async () => {
      MockTask.findByIdAndDelete = jest.fn().mockResolvedValue({ id: "1" });

      const result = await taskService.deleteTask("1");

      expect(MockTask.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toBe(true);
    });

    it("should return false if task is not found", async () => {
      MockTask.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      const result = await taskService.deleteTask("1");

      expect(MockTask.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toBe(false);
    });
  });
});
