import { z } from "zod";
import type { CreateTask } from "../../application/useCases/CreateTask";
import type { DeleteTask } from "../../application/useCases/DeleteTask";
import type { FindAllTasks } from "../../application/useCases/FindAllTasks";
import type { FindTaskById } from "../../application/useCases/FindTaskById";
import type { UpdateTask } from "../../application/useCases/UpdateTask";
import { DatabaseError } from "../../domain/errors/DatabaseError";
import { UnknownError } from "../../domain/errors/UnknownError";
import { ValidationError } from "../../domain/errors/ValidationError";
import { BaseController } from "./BaseController";

export class TaskController extends BaseController {
  constructor(
    private readonly findAllTasks: FindAllTasks,
    private readonly findTaskById: FindTaskById,
    private readonly createTask: CreateTask,
    private readonly updateTask: UpdateTask,
    private readonly deleteTask: DeleteTask,
  ) {
    super();
  }

  private readonly taskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    dueDate: z.string().date(),
  });

  private handleError(e: unknown) {
    if (e instanceof ValidationError)
      return this.createErrorResponse(400, `Validation Error: ${e.message}`);
    if (e instanceof DatabaseError)
      return this.createErrorResponse(500, `Database Error: ${e.message}`);
    if (e instanceof UnknownError)
      return this.createErrorResponse(500, `Unknown Error: ${e.message}`);

    return this.createErrorResponse(500, "An unknown error occurred");
  }

  async handleFindAllTasks() {
    try {
      const tasks = await this.findAllTasks.execute();
      return this.createSuccessResponse(200, tasks);
    } catch (e) {
      return this.handleError(e);
    }
  }

  async handleFindTaskById(request: Request) {
    try {
      const id = this.getPathParams(request, "tasks");
      if (!id) {
        return this.createErrorResponse(400, "ID is required");
      }
      const task = await this.findTaskById.execute(Number(id));
      if (!task) {
        return this.createErrorResponse(404, "Task not found");
      }
      return this.createSuccessResponse(200, task);
    } catch (e) {
      return this.handleError(e);
    }
  }

  async handleCreateTask(request: Request) {
    try {
      const result = this.taskSchema.safeParse(await request.json());
      if (!result.success) {
        return this.createErrorResponse(400, "Invalid input");
      }
      await this.createTask.execute({
        ...result.data,
        dueDate: new Date(result.data.dueDate),
      });
      return this.createSuccessResponse(201);
    } catch (e) {
      return this.handleError(e);
    }
  }

  async handleUpdateTask(request: Request) {
    try {
      const id = this.getPathParams(request, "tasks");
      if (!id) {
        return this.createErrorResponse(400, "ID is required");
      }
      const result = this.taskSchema.safeParse(await request.json());
      if (!result.success) {
        return this.createErrorResponse(400, "Invalid input");
      }
      await this.updateTask.execute({
        ...result.data,
        id: Number(id),
        dueDate: new Date(result.data.dueDate),
      });
      return this.createSuccessResponse(204);
    } catch (e) {
      return this.handleError(e);
    }
  }

  async handleDeleteTask(request: Request) {
    try {
      const id = this.getPathParams(request, "tasks");
      if (!id) {
        return this.createErrorResponse(400, "ID is required");
      }
      await this.deleteTask.execute(Number(id));
      return this.createSuccessResponse(204);
    } catch (e) {
      return this.handleError(e);
    }
  }
}
