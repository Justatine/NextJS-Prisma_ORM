-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('Pending', 'In_progress', 'Completed');

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" "task_status" DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);
