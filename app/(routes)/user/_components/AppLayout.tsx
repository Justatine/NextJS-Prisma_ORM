"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { SignedIn, UserButton } from "@clerk/nextjs"

export default function AppLayout() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Finish project proposal", completed: false },
    { id: 2, text: "Schedule meeting with client", completed: false },
    { id: 3, text: "Buy groceries", completed: true },
  ])
  const [newTodo, setNewTodo] = useState("")
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }
  const handleToggleTodo = (id:any) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow flex justify-between">
        <h1 className="text-2xl font-bold">To-Do App</h1>
          <SignedIn>
              <UserButton showName />
          </SignedIn>
      </header>
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 w-full sm:w-3/4 md:w-1/2 mx-auto bg-slate-100">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo()
              }
            }}
            className="w-full rounded-md border-input bg-background px-4 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between rounded-md bg-card px-4 py-2 shadow-sm">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleTodo(todo.id)}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-foreground ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {todo.text}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className="bg-card py-4 px-6 sm:px-8 md:px-10 shadow w-full sm:w-3/4 md:w-1/2 mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-muted-foreground mb-2 sm:mb-0">{todos.filter((todo) => !todo.completed).length} items left</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearCompleted}
            className="text-muted-foreground hover:bg-muted"
          >
            Clear Completed
          </Button>
        </div>
      </footer>

    </div>
  )
}