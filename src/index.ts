import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { CreateTask } from "./application/useCases/CreateTask";
import { DeleteTask } from "./application/useCases/DeleteTask";
import { FindAllTasks } from "./application/useCases/FindAllTasks";
import { FindTaskById } from "./application/useCases/FindTaskById";
import { UpdateTask } from "./application/useCases/UpdateTask";
import { TaskService } from "./domain/services/TaskService";
import { PrismaTaskRepository } from "./infrastructure/repositories/Prisma/PrismaTaskRepository";
import taskRoutes from "./presentation/routes/taskRoutes";

const app = new Hono();

// クライアント、リポジトリ、サービス、ユースケースを初期化
const client = new PrismaClient();
const taskRepository = new PrismaTaskRepository(client);
const taskService = new TaskService(taskRepository);

const findAllTasks = new FindAllTasks(taskService);
const findTaskById = new FindTaskById(taskService);
const createTask = new CreateTask(taskService);
const updateTask = new UpdateTask(taskService);
const deleteTask = new DeleteTask(taskService);

// ロガーを使用
app.use(logger());

// ルーティングにユースケースを渡す
app.route(
  "/tasks",
  taskRoutes(findAllTasks, findTaskById, createTask, updateTask, deleteTask),
);

export default app;
