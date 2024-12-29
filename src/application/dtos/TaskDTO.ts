export interface TaskDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
}

export interface UpdateTaskDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
}
