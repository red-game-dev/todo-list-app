export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
