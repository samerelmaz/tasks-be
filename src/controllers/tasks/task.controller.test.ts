import { Request, Response } from "express";
import { TaskController } from "./task.controller";
import { ITask } from "../../database/models/task.model";
import { ITaskService } from "../../services/tasks/task.service.interface";

describe("TaskController", () => {
  let taskController: TaskController;
  let mockTaskService: jest.Mocked<ITaskService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockTaskService = {
      createTask: jest.fn(),
      getAllTasks: jest.fn(),
      getTaskById: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    };
    taskController = new TaskController(mockTaskService);
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("createTask", () => {
    it("should create a task and return 201 status", async () => {
      const mockTask = { id: "1", title: "Test Task" } as ITask;
      mockTaskService.createTask.mockResolvedValue(mockTask);
      mockRequest.body = { title: "Test Task" };

      await taskController.createTask(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockTaskService.createTask).toHaveBeenCalledWith({
        title: "Test Task",
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });
  });

  describe("getAllTasks", () => {
    it("should return all tasks", async () => {
      const mockTasks = [
        { id: "1", title: "Task 1" },
        { id: "2", title: "Task 2" },
      ];
      mockTaskService.getAllTasks.mockResolvedValue(mockTasks as ITask[]);
      mockRequest.query = {};

      await taskController.getAllTasks(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockTaskService.getAllTasks).toHaveBeenCalledWith(undefined);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTasks);
    });

    it("should return filtered tasks", async () => {
      const mockTasks = [{ id: "1", title: "Task 1", completed: false }];
      mockTaskService.getAllTasks.mockResolvedValue(mockTasks as ITask[]);
      mockRequest.query = { status: "pending" };

      await taskController.getAllTasks(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockTaskService.getAllTasks).toHaveBeenCalledWith("pending");
      expect(mockResponse.json).toHaveBeenCalledWith(mockTasks);
    });
  });

  describe("getTaskById", () => {
    it("should return a task by id", async () => {
      const mockTask = { id: "1", title: "Test Task" };
      mockTaskService.getTaskById.mockResolvedValue(mockTask as ITask);
      mockRequest.params = { id: "1" };

      await taskController.getTaskById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockTaskService.getTaskById).toHaveBeenCalledWith("1");
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });

    it("should return 404 if task not found", async () => {
      mockTaskService.getTaskById.mockResolvedValue(null);
      mockRequest.params = { id: "1" };

      await taskController.getTaskById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Task not found",
      });
    });
  });

  describe("updateTask", () => {
    it("should update a task and return it", async () => {
      const mockTask = { id: "1", title: "Updated Task" };
      mockTaskService.updateTask.mockResolvedValue(mockTask as ITask);
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "Updated Task" };

      await taskController.updateTask(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockTaskService.updateTask).toHaveBeenCalledWith("1", {
        title: "Updated Task",
      });
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });

    it("should return 404 if task not found", async () => {
      mockTaskService.updateTask.mockResolvedValue(null);
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "Updated Task" };

      await taskController.updateTask(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Task not found",
      });
    });
  });

  describe("deleteTask", () => {
    it("should delete a task and return 204 status", async () => {
      mockTaskService.deleteTask.mockResolvedValue(true);
      mockRequest.params = { id: "1" };

      await taskController.deleteTask(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockTaskService.deleteTask).toHaveBeenCalledWith("1");
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it("should return 404 if task not found", async () => {
      mockTaskService.deleteTask.mockResolvedValue(false);
      mockRequest.params = { id: "1" };

      await taskController.deleteTask(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Task not found",
      });
    });
  });
});
