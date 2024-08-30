import * as z from "zod";

export const taskSchema = z.object({
  task_id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().default("Pending"),
  created_at: z.string(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
