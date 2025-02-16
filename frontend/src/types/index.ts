export interface Task {
  id: string;
  title: string;
  createdAt: Date;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  lastCacheKey: string;
  sortedTasksCache: Task[];
}
