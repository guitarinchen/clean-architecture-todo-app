import type { PrismaClient } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { Task } from "../../../domain/entities/Task";
import { DatabaseError } from "../../../domain/errors/DatabaseError";
import { UnknownError } from "../../../domain/errors/UnknownError";
import { ValidationError } from "../../../domain/errors/ValidationError";
import type { TaskRepository } from "../../../domain/repositories/TaskRepository";

export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly client: PrismaClient) {}

  private handlePrismaError(e: unknown): Error {
    // エラー内容をログに残す
    console.error(e);
    if (e instanceof PrismaClientValidationError)
      return new ValidationError(e.message);
    if (e instanceof PrismaClientKnownRequestError)
      return new DatabaseError(e.message);
    if (
      e instanceof PrismaClientUnknownRequestError ||
      e instanceof PrismaClientRustPanicError
    )
      return new UnknownError(
        "An unknown error occurred while trying to fetch tasks",
      );

    return new UnknownError(
      "An unknown error occurred while trying to fetch tasks",
    );
  }

  async findAll() {
    try {
      const tasks = await this.client.task.findMany();
      return tasks.map((task) => new Task(task));
    } catch (e) {
      throw this.handlePrismaError(e);
    }
  }

  async findById(id: number) {
    try {
      const task = await this.client.task.findUnique({
        where: { id },
      });
      return task ? new Task(task) : null;
    } catch (e) {
      throw this.handlePrismaError(e);
    }
  }

  async create(task: Task) {
    try {
      await this.client.task.create({
        data: {
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.dueDate,
        },
      });
    } catch (e) {
      throw this.handlePrismaError(e);
    }
  }

  async update(task: Task) {
    try {
      await this.client.task.update({
        where: { id: task.id },
        data: {
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.dueDate,
        },
      });
    } catch (e) {
      throw this.handlePrismaError(e);
    }
  }

  async delete(id: number) {
    try {
      await this.client.task.delete({
        where: { id },
      });
    } catch (e) {
      throw this.handlePrismaError(e);
    }
  }
}
