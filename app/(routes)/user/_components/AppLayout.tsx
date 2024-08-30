"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormValues, taskSchema } from "@/lib/validation/task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; 
import axios from 'axios';

interface AppLayoutProps {
  initialData: TaskFormValues[];
}

export const AppLayout: React.FC<AppLayoutProps> = ({ initialData }) => {
  const [todos, setTodos] = useState<TaskFormValues[]>(initialData);
  const router = useRouter();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task_id: "",
      title: "",
      description: "",
      status: "Pending",
      created_at: "",
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      const response = await axios.post('/api/tasks',data)
      console.log('res: ',response)
      setTodos((prevTodos) => [...prevTodos, data]);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow flex justify-between">
        <h1 className="text-2xl font-bold">To-Do App</h1>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </header>
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 w-full sm:w-3/4 md:w-1/2 mx-auto bg-slate-100">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="mb-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add a new todo..."
                        {...field}
                        className="w-full rounded-md border-input bg-background px-4 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description..."
                        rows={4}
                        {...field}
                        className="w-full rounded-md border-input bg-background px-4 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" disabled={form.formState.isSubmitting} >
                Add Task
              </Button>
            </div>
          </form>
        </Form>
        <ul className="space-y-2 mt-6">
          {todos.map((todo) => (
            <li key={todo.task_id} className="flex items-center justify-between rounded-md bg-card px-4 py-2 shadow-sm">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`todo-${todo.task_id}`}
                  checked={todo.status === "Completed"}
                />
                <label
                  htmlFor={`todo-${todo.task_id}`}
                  className={`text-foreground ${todo.status === "Completed" ? "line-through text-muted-foreground" : ""}`}
                >
                  {todo.title} - <small>{todo.description}</small>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className="bg-card py-4 px-6 sm:px-8 md:px-10 shadow w-full sm:w-3/4 md:w-1/2 mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-muted-foreground mb-2 sm:mb-0">
            {/* {todos.filter((todo) => !todo.completed).length}  */}
            items left
          </p>
          <Button
            variant="ghost"
            size="sm"
            // onClick={handleClearCompleted}
            className="text-muted-foreground hover:bg-muted"
          >
            Clear Completed
          </Button>
        </div>
      </footer>
    </div>
  );
};
