export interface Task {
  id: string;
  title: string;
  completed?: boolean;
  createdAt: Date;
}

export type CreateTaskDTO = Pick<Task, 'title'>;
