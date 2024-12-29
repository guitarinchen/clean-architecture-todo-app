import type { Task } from "../entities/Task";
import type { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async findById(id: number): Promise<Task | null> {
    return await this.taskRepository.findById(id);
  }

  async create(task: Task): Promise<void> {
    await this.taskRepository.create(task);
  }

  async update(task: Task): Promise<void> {
    await this.taskRepository.update(task);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
