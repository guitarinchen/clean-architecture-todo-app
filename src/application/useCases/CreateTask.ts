import { Task } from "../../domain/entities/Task";
import type { TaskService } from "../../domain/services/TaskService";
import type { CreateTaskDTO } from "../dtos/TaskDTO";

export class CreateTask {
  constructor(private readonly taskSerice: TaskService) {}

  async execute(task: CreateTaskDTO) {
    return await this.taskSerice.create(new Task(task));
  }
}
