import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import type { CreateTaskDTO, Task } from '../types';
import { validateCreateTaskDTO } from '../validators/taskValidator';

export class TaskController {
  private static instance: TaskController;
  private taskService: TaskService;
  private requestCache: Map<string, { data: Task[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5000;

  constructor() {
    this.taskService = new TaskService();
  }

  static getInstance(): TaskController {
    if (!TaskController.instance) {
      TaskController.instance = new TaskController();
    }
    return TaskController.instance;
  }

  private generateCacheKey(method: string, params: object = {}): string {
    return `${method}-${JSON.stringify(params)}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const taskDTO: CreateTaskDTO = req.body;

      const validationError = validateCreateTaskDTO(taskDTO);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      const task = await this.taskService.createTask(taskDTO);

      const getTasksCacheKey = this.generateCacheKey('getTasks');
      this.requestCache.delete(getTasksCacheKey);

      res.status(201).json(task);
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  async getTasks(_req: Request, res: Response): Promise<void> {
    try {
      const cacheKey = this.generateCacheKey('getTasks');
      const cachedResponse = this.requestCache.get(cacheKey);

      if (cachedResponse && this.isCacheValid(cachedResponse.timestamp)) {
        res.json(cachedResponse.data);
        return;
      }

      const tasks = await this.taskService.getAllTasks();

      this.requestCache.set(cacheKey, {
        data: tasks,
        timestamp: Date.now(),
      });

      res.json(tasks);
    } catch (error) {
      console.error('Get tasks error:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }
}
