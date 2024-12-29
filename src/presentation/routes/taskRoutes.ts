import { Hono } from "hono";
import type { CreateTask } from "../../application/useCases/CreateTask";
import type { DeleteTask } from "../../application/useCases/DeleteTask";
import type { FindAllTasks } from "../../application/useCases/FindAllTasks";
import type { FindTaskById } from "../../application/useCases/FindTaskById";
import type { UpdateTask } from "../../application/useCases/UpdateTask";
import { TaskController } from "../controllers/TaskController";

const taskRoutes = (
  findAllTasks: FindAllTasks,
  findTaskById: FindTaskById,
  createTask: CreateTask,
  updateTask: UpdateTask,
  deleteTask: DeleteTask,
) => {
  const app = new Hono();
  const taskController = new TaskController(
    findAllTasks,
    findTaskById,
    createTask,
    updateTask,
    deleteTask,
  );

  app
    // 全タスクの取得
    .get("/", () => taskController.handleFindAllTasks())
    // タスクの取得
    .get("/:id", (ctx) => taskController.handleFindTaskById(ctx.req.raw))
    // タスクの作成
    .post("/", (ctx) => taskController.handleCreateTask(ctx.req.raw))
    // タスクの更新
    .put("/:id", (ctx) => taskController.handleUpdateTask(ctx.req.raw))
    // タスクの削除
    .delete("/:id", (ctx) => taskController.handleDeleteTask(ctx.req.raw));

  return app;
};

export default taskRoutes;
