# clean-architecture-todo-app

クリーンアーキテクチャのアプローチを採用した TypeScript 実装の簡単なタスク管理アプリです。サンプルのため必要最低限の実装にとどめています。

## 使用技術

- [TypeScript](https://www.typescriptlang.org/) (言語)
- [Hono](https://hono-ja.pages.dev/) (Web フレームワーク)
- [Prisma](https://www.prisma.io/) (ORM)
- [Biome](https://biomejs.dev/) (linter, formatter)

## 

## ディレクトリ構成

```
./src
├── application
│   ├── dtos
│   │   └── TaskDTO.ts
│   └── useCases
│       ├── CreateTask.ts
│       ├── DeleteTask.ts
│       ├── FindAllTasks.ts
│       ├── FindTaskById.ts
│       └── UpdateTask.ts
├── domain
│   ├── entities
│   │   └── Task.ts
│   ├── errors
│   │   ├── DatabaseError.ts
│   │   ├── UnknownError.ts
│   │   └── ValidationError.ts
│   ├── repositories
│   │   └── TaskRepository.ts
│   └── services
│       └── TaskService.ts
├── index.ts
├── infrastructure
│   └── repositories
│       └── Prisma
│           └── PrismaTaskRepository.ts
└── presentation
    ├── controllers
    │   ├── BaseController.ts
    │   └── TaskController.ts
    └── routes
        └── taskRoutes.ts
```
