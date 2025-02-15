import { v4 as uuidv4 } from 'uuid';
import redisClient from '../config/redis';
import { Task, CreateTaskDTO } from '../types';

export class TaskService {
  private readonly TASKS_KEY = 'tasks';

  async createTask(taskDTO: CreateTaskDTO): Promise<Task> {
    const task: Task = {
      id: uuidv4(),
      title: taskDTO.title,
      createdAt: new Date(),
    };

    await redisClient.hSet(this.TASKS_KEY, task.id, JSON.stringify(task));
    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await redisClient.hGetAll(this.TASKS_KEY);
    return Object.values(tasks).map(task => JSON.parse(task));
  }
}
