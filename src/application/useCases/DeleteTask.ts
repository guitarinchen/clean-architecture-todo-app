import type { TaskService } from "../../domain/services/TaskService";

export class DeleteTask {
  constructor(private readonly taskSerice: TaskService) {}

  async execute(id: number) {
    return await this.taskSerice.delete(id);
  }
}
