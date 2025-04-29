'use client'

import { createClient } from '@/utils/supabase/client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Task {
  id: number
  title: string
  description: string
  created_at: string
}

interface TaskContextType {
  tasks: Task[]
  addTask: (title: string, description: string) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  refreshTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (error) {
      console.error('Error fetching tasks:', error)
      return
    }
    
    if (data) {
      setTasks(data)
    }
  }

  const addTask = async (title: string, description: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("tasks")
      .insert([{ title, description }])
    
    if (error) {
      console.error('Error adding task:', error)
      return
    }
    
    // Refresh the tasks list
    await fetchTasks()
  }

  const deleteTask = async (id: number) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
    
    if (error) {
      console.error('Error deleting task:', error)
      return
    }
    
    // Refresh the tasks list
    await fetchTasks()
  }

  // Initial fetch
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, refreshTasks: fetchTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
} 