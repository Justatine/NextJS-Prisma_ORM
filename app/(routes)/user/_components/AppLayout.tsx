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
import toast from "react-hot-toast";
import { AlertModal } from "@/components/ui/modals/alert-modal";

interface AppLayoutProps {
  initialData: TaskFormValues[];
}

export const AppLayout: React.FC<AppLayoutProps> = ({ initialData }) => {
  const [todos, setTodos] = useState<TaskFormValues[]>(initialData);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await axios.post('/api/tasks',data)
      setTodos((prevTodos) => [...prevTodos, data]);
      
      const message = response.data.message;
      toast.success(message);

      router.refresh();
      form.reset();
    } catch (error:any) {
      toast.error(error)
      console.error(error);
    } finally{
      setLoading(false);
    }
  };
  
  const handleCheckToggle = async (taskId:string) => {
    try {
      setLoading(true);

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.task_id === taskId
            ? { ...todo, status: todo.status === 'Completed' ? 'Pending' : 'Completed' }
            : todo
        )
      );
  
      const response = await axios.put(`/api/tasks/${taskId}`, { status: 'Completed' }); 
      const message = response.data.message || 'Task updated successfully';
      
      toast.success(message);
      router.refresh();

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClearCompleted = async () => {
    try {
      setLoading(true);
      const response = await axios.delete('api/tasks/')
      const message = response.data.message;
      toast.success(message)
      setTodos((prevTodos) => prevTodos.filter(todo => todo.status !== 'Completed'));
      setOpen(false)
      router.refresh();

    } catch (error:any) {
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }
  const hasCompletedTasks = todos.some((todo) => todo.status === 'Completed');

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow flex justify-between">
        <h1 className="text-2xl font-bold">To-Do App</h1>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </header>

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleClearCompleted}
        loading={loading}
      />
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
                  onCheckedChange={() => handleCheckToggle(todo.task_id)}
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
            {todos.filter((todo) => todo.status !== 'Completed').length} items left
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
            className={`text-muted-foreground ${!hasCompletedTasks ? 'hover:cursor-not-allowed' : 'hover:bg-muted hover:cursor-pointer'}`}
            disabled={!hasCompletedTasks}
          >
            Clear Completed
          </Button>
        </div>
      </footer>
    </div>
  );
};
