import type { TaskService } from "../../domain/services/TaskService";
import type { TaskDTO } from "../dtos/TaskDTO";

export class FindAllTasks {
  constructor(private readonly taskService: TaskService) {}

  async execute(): Promise<TaskDTO[]> {
    const tasks = await this.taskService.findAll();
    return tasks.map((task) => ({
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      id: task.id!,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    }));
  }
}
