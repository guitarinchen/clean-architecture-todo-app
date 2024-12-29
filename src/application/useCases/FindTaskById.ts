import type { TaskService } from "../../domain/services/TaskService";
import type { TaskDTO } from "../dtos/TaskDTO";

export class FindTaskById {
  constructor(private readonly taskSerice: TaskService) {}

  async execute(id: number): Promise<TaskDTO | null> {
    const task = await this.taskSerice.findById(id);
    return task
      ? {
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          id: task.id!,
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.dueDate,
        }
      : null;
  }
}
