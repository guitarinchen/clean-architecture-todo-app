import { Task } from "../../domain/entities/Task";
import type { TaskService } from "../../domain/services/TaskService";
import type { UpdateTaskDTO } from "../dtos/TaskDTO";

export class UpdateTask {
  constructor(private readonly taskSerice: TaskService) {}

  async execute(task: UpdateTaskDTO) {
    return await this.taskSerice.update(new Task(task));
  }
}
