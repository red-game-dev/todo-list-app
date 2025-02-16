import redisClient from '../config/redis';
import type { Task, CreateTaskDTO } from '../types';
import { createHash } from 'crypto';

export class TaskService {
  private readonly TASKS_KEY = 'tasks';
  private readonly TASKS_COUNT_KEY = 'tasks:count';
  private readonly CACHE_TTL = 300;
  private taskCache: Map<string, Task> = new Map();
  private lastCacheUpdate = 0;

  private generateTaskId(title: string, timestamp: number): string {
    const hash = createHash('sha256');
    hash.update(`${title}-${timestamp}`);
    return hash.digest('hex').substring(0, 8);
  }

  private async incrementTaskCount(): Promise<number> {
    const multi = redisClient.multi();
    multi.incr(this.TASKS_COUNT_KEY);
    const results = await multi.exec();
    return (results?.[0] as number) || 0;
  }

  async createTask(taskDTO: CreateTaskDTO): Promise<Task> {
    const timestamp = Date.now();
    const taskId = this.generateTaskId(taskDTO.title, timestamp);

    const task: Task = {
      id: taskId,
      title: taskDTO.title.trim(),
      createdAt: new Date(timestamp),
    };

    const multi = redisClient.multi();
    multi.hSet(this.TASKS_KEY, task.id, JSON.stringify(task));
    multi.expire(this.TASKS_KEY, this.CACHE_TTL);
    await multi.exec();

    this.taskCache.set(task.id, task);
    this.lastCacheUpdate = Date.now();

    await this.incrementTaskCount();
    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    const currentTime = Date.now();

    if (this.taskCache.size > 0 && currentTime - this.lastCacheUpdate < this.CACHE_TTL * 1000) {
      return Array.from(this.taskCache.values());
    }

    const tasks = await redisClient.hGetAll(this.TASKS_KEY);
    this.taskCache.clear();

    const parsedTasks = Object.values(tasks)
      .map(taskStr => {
        try {
          const task = JSON.parse(taskStr);
          this.taskCache.set(task.id, task);
          return task;
        } catch (error) {
          console.error('Error parsing task:', error);
          return null;
        }
      })
      .filter(Boolean) as Task[];

    this.lastCacheUpdate = currentTime;
    return parsedTasks;
  }

  clearCache(): void {
    this.taskCache.clear();
    this.lastCacheUpdate = 0;
  }
}
