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

export interface ErrorState {
  notifications: ErrorNotification[];
}

export interface ErrorNotification {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: number;
  context?: string;
}

export type RootState = {
  tasks: TaskState;
  errors: ErrorState;
};
