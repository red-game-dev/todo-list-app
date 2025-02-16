export interface Task {
  id: string;
  title: string;
  createdAt: Date;
}

export type CreateTaskDTO = Pick<Task, 'title'>;
